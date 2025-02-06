# Usa una imagen base de Node.js
FROM node:18-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json y package-lock.json e instalar dependencias
COPY package.json package-lock.json ./
RUN npm install --omit=dev

# Copiar el resto del código de la aplicación
COPY . .

# Configurar variables de entorno pasadas como argumentos
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG AWS_REGION
ARG DYNAMODB_TABLE
ARG PORT

# Exportar las variables de entorno para la aplicación
ENV AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
ENV AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
ENV AWS_REGION=$AWS_REGION
ENV DYNAMODB_TABLE=$DYNAMODB_TABLE
ENV PORT=$PORT

# Exponer el puerto configurado (por defecto 3001)
EXPOSE $PORT

# Comando para ejecutar la aplicación
CMD ["node", "src/app.js"]
