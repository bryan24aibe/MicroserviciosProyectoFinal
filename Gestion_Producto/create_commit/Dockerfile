# Use a Python base image
FROM python:3.9-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements file and install it
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Set the environment variables passed as arguments
ARG MONGODB_URI
ARG MONGODB_DB
ARG PORT

# Export the environment variables to make them available in the application
ENV MONGODB_URI=$MONGODB_URI
ENV MONGODB_DB=$MONGODB_DB
ENV PORT=$PORT

# Expose the configured port (default 3001)
EXPOSE $PORT

# Command to run the application
CMD ["python", "app.py"]
