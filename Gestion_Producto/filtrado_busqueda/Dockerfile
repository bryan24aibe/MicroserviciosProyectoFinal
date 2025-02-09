# Usa una imagen base de Node.js
FROM node:18-slim

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json y package-lock.json para instalar dependencias primero
COPY package.json ./

# Instalar las dependencias del proyecto
RUN npm install --omit=dev

# Copiar el resto del código del microservicio
COPY . .

# Configurar variables de entorno pasadas como argumentos
ARG MONGO_URI
ARG DB_NAME
ARG PORT

# Exportar las variables de entorno para que estén disponibles en la aplicación
ENV MONGO_URI=$MONGO_URI
ENV DB_NAME=$DB_NAME
ENV PORT=$PORT

# Exponer el puerto 4000 para GraphQL
EXPOSE 4000

# Comando para ejecutar el servidor
CMD ["npm", "start"]
