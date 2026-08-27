# Stage 1 : installation des dépendances PHP
FROM composer:2 AS dependencies

WORKDIR /app

COPY composer.json composer.lock symfony.lock ./


RUN composer install \
    --no-interaction \
    --no-progress \
    --prefer-dist \
    --no-dev \
    --no-scripts


# Stage 2 : image finale de l'application
FROM php:8.4-cli AS runner


WORKDIR /app

RUN apt-get update && apt-get install -y \
    git \
    unzip \
    curl \
    libicu-dev \
    libzip-dev \
    && docker-php-ext-install \
    intl \
    pdo \
    pdo_mysql \
    zip \
    && rm -rf /var/lib/apt/lists/*


COPY --from=ghcr.io/symfony-cli/symfony-cli:latest \
    /usr/local/bin/symfony /usr/local/bin/symfony


COPY --from=dependencies /app/vendor ./vendor


COPY assets ./assets
COPY bin ./bin
COPY config ./config
COPY migrations ./migrations
COPY public ./public
COPY src ./src
COPY templates ./templates
COPY translations ./translations

COPY composer.json composer.lock symfony.lock ./


RUN mkdir -p var/cache var/log \
    && chown -R www-data:www-data /app


ENV HOME=/app

# L'application ne tourne pas avec l'utilisateur root
USER www-data


EXPOSE 8000


HEALTHCHECK --interval=10s --timeout=5s --start-period=30s --retries=5 \
    CMD curl -fsS http://127.0.0.1:8000/monitor/health/run || exit 1
# Démarrage du serveur Symfony
CMD ["symfony", "server:start", "--allow-http", "--no-tls", "--listen-ip=0.0.0.0"]