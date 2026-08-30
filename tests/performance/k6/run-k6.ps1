
param(
  
    [ValidateSet("smoke", "load")]
    [string]$Scenario = "smoke"
)

$ErrorActionPreference = "Stop"

$K6Command = Get-Command k6 -ErrorAction SilentlyContinue


if (-not $K6Command) {
    throw "k6 est introuvable. Installe-le puis rouvre PowerShell."
}


$BaseUrl = Read-Host "Adresse de CesiZen [http://localhost:8000]"

if ([string]::IsNullOrWhiteSpace($BaseUrl)) {
    $BaseUrl = "http://localhost:8000"
}

$BaseUrl = $BaseUrl.TrimEnd("/")

$Email = Read-Host "E-mail du compte de test"

if ([string]::IsNullOrWhiteSpace($Email)) {
    throw "L’adresse e-mail du compte de test est obligatoire."
}

$SecurePassword = Read-Host "Mot de passe du compte de test" -AsSecureString

$Credential = [System.Management.Automation.PSCredential]::new(
    "cesizen-test",
    $SecurePassword
)

$PlainPassword = $Credential.GetNetworkCredential().Password

$TestFile = Join-Path $PSScriptRoot "cesizen-api.js"

if (-not (Test-Path $TestFile)) {
    throw "Le fichier cesizen-api.js est introuvable."
}


Write-Host "Scénario sélectionné : $Scenario"

Write-Host "Adresse testée : $BaseUrl"


try {
   
    $env:CESIZEN_BASE_URL = $BaseUrl
    $env:CESIZEN_TEST_EMAIL = $Email
    $env:CESIZEN_TEST_PASSWORD = $PlainPassword
    $env:CESIZEN_PROFILE = $Scenario

    & k6 run $TestFile

    if ($LASTEXITCODE -ne 0) {
          throw "Le test k6 s’est terminé en échec."
    }
}
finally {
    Remove-Item Env:\CESIZEN_BASE_URL -ErrorAction SilentlyContinue
    Remove-Item Env:\CESIZEN_TEST_EMAIL -ErrorAction SilentlyContinue
    Remove-Item Env:\CESIZEN_TEST_PASSWORD -ErrorAction SilentlyContinue
    Remove-Item Env:\CESIZEN_PROFILE -ErrorAction SilentlyContinue

    $PlainPassword = $null
    $Credential = $null
    $SecurePassword = $null
}