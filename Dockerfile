# Use official Python image as base
FROM python:3.10

# Set working directory in the container
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy dependencies files
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install psycopg

# Copy Django project files
COPY . .

# Set environment variables
ENV PYTHONUNBUFFERED=1

# Run database migrations and collect static files
RUN python manage.py migrate
RUN python manage.py collectstatic --noinput

# Expose port 8000
EXPOSE 8000

# Start Django application
CMD ["gunicorn", "myproject.wsgi:application", "--bind", "0.0.0.0:8000"]
