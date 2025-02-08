# Usa una imagen base de PHP con Apache
FROM php:8.2-apache

# Instala las extensiones necesarias para MySQL y Slim
RUN apt-get update && apt-get install -y \
    unzip \
    libpq-dev \
    libonig-dev \
    && docker-php-ext-install pdo pdo_mysql

# Habilitar módulos de Apache
RUN a2enmod rewrite

# Establecer el directorio de trabajo
WORKDIR /var/www/html

# Copiar los archivos del proyecto
COPY . .

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Instalar dependencias de Composer
RUN composer install --no-dev --optimize-autoloader

# Configurar permisos
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Exponer el puerto 80
EXPOSE 80

# Comando para iniciar Apache
CMD ["apache2-foreground"]
