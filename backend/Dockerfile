    # Seleciona a Imagem a ser carregada do Banco Docker
    FROM php:8.3-fpm

    # Instala as principais dependecias
    RUN docker-php-ext-install pdo pdo_mysql

    # Instala o composer
    RUN curl -sS https://getcomposer.org/installer | php && \
        mv composer.phar /usr/local/bin/composer
        
    # Define o diretorio de trabalho
    WORKDIR /var/www/html/

    # Copia os arquivos do contexto
    COPY . .

    # Define as permissões do rietorio de trabalho
    RUN chown -R www-data:www-data /var/www/html

    # Expõe a porta padrão (9000) do fpm-php
    EXPOSE 9000

    # Comando Padrão
    CMD ["php-fpm"]