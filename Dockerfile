FROM python:3.12.3-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Install Python dependencies
COPY requirements.txt /app/
RUN pip install --upgrade pip && \
    pip install -r requirements.txt

# Copy project files
COPY . /app/

# Collect static files (optional, uncomment if you have static files configured)
RUN python manage.py collectstatic --noinput

# Expose port
EXPOSE 8000

CMD python manage.py migrate && \
    python manage.py runserver 0.0.0.0:8000