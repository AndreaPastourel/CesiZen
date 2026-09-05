param(
    [Parameter(Mandatory = $true)]
    [string]$BackupFile
)

$ErrorActionPreference = "Stop"
$temporaryPath = "/tmp/cesizen-restore.sql.gz"
$servicesStopped = $false

function Test-DockerCommand {
    param([string]$ErrorMessage)

    if ($LASTEXITCODE -ne 0) {
        throw $ErrorMessage
    }
}

# Vérifie que la sauvegarde existe.
if (-not (Test-Path -LiteralPath $BackupFile -PathType Leaf)) {
    throw "La sauvegarde '$BackupFile' est introuvable."
}

$resolvedBackup = (Resolve-Path -LiteralPath $BackupFile).Path

if (-not $resolvedBackup.EndsWith(".sql.gz")) {
    throw "La sauvegarde doit être une archive .sql.gz."
}

# Récupère dynamiquement l'identifiant du service db.
$dbContainer = docker compose ps -q db

if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrWhiteSpace($dbContainer)) {
    throw "Le service Docker 'db' n'est pas démarré."
}

$dbContainer = $dbContainer.Trim()

Write-Host ""
Write-Host "ATTENTION : la base CesiZen actuelle va être remplacée."
Write-Host "Sauvegarde utilisée : $resolvedBackup"
Write-Host ""

$confirmation = Read-Host "Tape RESTAURER pour continuer"

if ($confirmation -cne "RESTAURER") {
    Write-Host "Restauration annulée."
    exit 1
}

try {
    # Empêche l'application de modifier la base pendant la restauration.
    docker compose stop back front
    Test-DockerCommand "Impossible d'arrêter l'application."

    $servicesStopped = $true

    # Copie temporairement l'archive dans le conteneur MySQL.
    docker cp $resolvedBackup "${dbContainer}:${temporaryPath}"
    Test-DockerCommand "Impossible de copier la sauvegarde."

    # Vérifie que l'archive n'est pas corrompue.
    docker exec $dbContainer gzip -t $temporaryPath
    Test-DockerCommand "L'archive de sauvegarde est corrompue."

    # Recrée entièrement la base.
    docker exec $dbContainer sh -c `
        'MYSQL_PWD="$MYSQL_ROOT_PASSWORD" mysql --user=root --execute="DROP DATABASE IF EXISTS \`$MYSQL_DATABASE\`; CREATE DATABASE \`$MYSQL_DATABASE\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"'

    Test-DockerCommand "Impossible de recréer la base de données."

    # Décompresse et importe la sauvegarde.
    docker exec $dbContainer sh -c `
        'gzip -dc /tmp/cesizen-restore.sql.gz | MYSQL_PWD="$MYSQL_ROOT_PASSWORD" mysql --user=root --database="$MYSQL_DATABASE"'

    Test-DockerCommand "La restauration de la base a échoué."

    Write-Host ""
    Write-Host "Restauration terminée avec succès." -ForegroundColor Green
}
finally {
    # Efface la copie temporaire contenant les données personnelles.
    docker exec $dbContainer rm -f $temporaryPath 2>$null

    if ($servicesStopped) {
        docker compose up -d back front
    }
}