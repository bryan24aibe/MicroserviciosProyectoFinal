# Use a base image of Python
FROM python:3.9-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements file and install the dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Configure the environment variables passed as arguments
ARG MONGODB_URI
ARG MONGODB_DB
ARG PORT

# Export the environment variables so they're available to the application
ENV MONGODB_URI=$MONGODB_URI
ENV MONGODB_DB=$MONGODB_DB
ENV PORT=$PORT

# Expose the configured port (default is 3001)
EXPOSE $PORT

# Command to run the application
CMD ["python", "app.py"]
