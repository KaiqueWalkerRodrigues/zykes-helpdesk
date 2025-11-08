# Seleciona a Imagem Base
FROM php:8.3-fpm

# Atualiza e instala dependências do sistema
RUN apt-get update && apt-get install -y --no-install-recommends \
    unzip \
    p7zip-full \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Instala extensões PHP necessárias
RUN docker-php-ext-install pdo pdo_mysql

# Instala o Composer
RUN curl -sS https://getcomposer.org/installer | php && \
    mv composer.phar /usr/local/bin/composer

# Define o diretório de trabalho
WORKDIR /var/www/html/

# Copia o código do projeto para dentro do container
COPY . .

# Instala automaticamente a biblioteca Firebase JWT
RUN composer require firebase/php-jwt --no-interaction --no-progress

# Define permissões do diretório
RUN chown -R www-data:www-data /var/www/html

# Expõe a porta padrão do PHP-FPM
EXPOSE 9000

# Comando padrão
CMD ["php-fpm"]
