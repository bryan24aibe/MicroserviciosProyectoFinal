# Usa una imagen base ligera de Python
FROM python:3.9-slim

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia el archivo requirements.txt e instala las dependencias
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copia el resto de los archivos del proyecto al contenedor
COPY . .

# Define argumentos de compilación para variables de entorno
ARG MONGODB_URI
ARG MONGODB_DB
ARG PORT

# Configura las variables de entorno dentro del contenedor
ENV MONGODB_URI=$MONGODB_URI
ENV MONGODB_DB=$MONGODB_DB
ENV PORT=$PORT

# Expone el puerto interno definido en la variable de entorno
EXPOSE $PORT

# Comando por defecto para ejecutar la aplicación
CMD ["python", "app.py"]
