# Usa una imagen base de Python
FROM python:3.9-slim

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el archivo de requisitos e instalarlos
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el resto del código de la aplicación
COPY . .

# Configurar las variables de entorno pasadas como argumentos
ARG MONGODB_URI
ARG MONGODB_DB
ARG PORT

# Exportar las variables de entorno para que estén disponibles en la aplicación
ENV MONGODB_URI=$MONGODB_URI
ENV MONGODB_DB=$MONGODB_DB
ENV PORT=$PORT

# Exponer el puerto configurado (por defecto 3001)
EXPOSE $PORT

# Comando para ejecutar la aplicación
CMD ["python", "app.py"]
