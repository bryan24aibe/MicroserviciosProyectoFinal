# Imagen base de Python
FROM python:3.9-slim

# Configuración de entorno
ENV PYTHONUNBUFFERED=1
ENV PORT=3002

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de requisitos
COPY delete_producto/requirements.txt /app/requirements.txt

# Instalar las dependencias desde requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el código fuente completo del proyecto
COPY delete_producto/ /app/

# Exponer el puerto en el que la aplicación escuchará
EXPOSE ${PORT}

# Comando para ejecutar la aplicación
CMD ["python", "app.py"]
