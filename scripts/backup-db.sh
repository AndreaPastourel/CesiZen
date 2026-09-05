
set -eu

: "${MYSQL_HOST:?La variable MYSQL_HOST est obligatoire}"
: "${MYSQL_DATABASE:?La variable MYSQL_DATABASE est obligatoire}"
: "${MYSQL_USER:?La variable MYSQL_USER est obligatoire}"
: "${MYSQL_PASSWORD:?La variable MYSQL_PASSWORD est obligatoire}"

BACKUP_INTERVAL_SECONDS="${BACKUP_INTERVAL_SECONDS:-86400}"


BACKUP_RETENTION_DAYS="${BACKUP_RETENTION_DAYS:-7}"


case "$BACKUP_INTERVAL_SECONDS" in
    ''|*[!0-9]*)
        echo "BACKUP_INTERVAL_SECONDS doit être un nombre."
        exit 1
        ;;
esac

case "$BACKUP_RETENTION_DAYS" in
    ''|*[!0-9]*)
        echo "BACKUP_RETENTION_DAYS doit être un nombre."
        exit 1
        ;;
esac

echo "Attente de la base MySQL..."

until MYSQL_PWD="$MYSQL_PASSWORD" mysqladmin ping \
    --host="$MYSQL_HOST" \
    --user="$MYSQL_USER" \
    --silent
do
    echo "MySQL n'est pas encore disponible. Nouvelle tentative dans 5 secondes."
    sleep 5
done

echo "MySQL est disponible."

create_backup()
{
    
    timestamp="$(date -u '+%Y-%m-%dT%H-%M-%SZ')"

    temporary_file="/backups/.cesizen_${timestamp}.sql"
    final_file="/backups/cesizen_${timestamp}.sql.gz"

    echo "Création de la sauvegarde ${final_file}..."

    if MYSQL_PWD="$MYSQL_PASSWORD" mysqldump \
        --host="$MYSQL_HOST" \
        --user="$MYSQL_USER" \
        --single-transaction \
        --quick \
        --no-tablespaces \
        --routines \
        --events \
        --triggers \
        --hex-blob \
        --default-character-set=utf8mb4 \
        "$MYSQL_DATABASE" > "$temporary_file"
    then
        if gzip -9 "$temporary_file"
        then
            mv "${temporary_file}.gz" "$final_file"

            touch /backups/.last-success

            find /backups \
                -type f \
                -name 'cesizen_*.sql.gz' \
                -mtime +"$BACKUP_RETENTION_DAYS" \
                -delete

            echo "Sauvegarde terminée : ${final_file}"
        else
            echo "Échec de la compression de la sauvegarde."
            rm -f "$temporary_file" "${temporary_file}.gz"
            return 1
        fi
    else
        echo "Échec de la sauvegarde MySQL."
        rm -f "$temporary_file" "${temporary_file}.gz"
        return 1
    fi
}


while true
do
    if ! create_backup
    then
        echo "La sauvegarde a échoué. Une nouvelle tentative aura lieu au prochain cycle."
    fi

    echo "Prochaine sauvegarde dans ${BACKUP_INTERVAL_SECONDS} secondes."
    sleep "$BACKUP_INTERVAL_SECONDS"
done