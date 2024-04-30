FROM python:3.11

# Set working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the project files to the container
COPY . .

# Make entrypoint.sh executable
COPY entrypoint.sh entrypoint.sh
RUN chmod +x entrypoint.sh

# Expose the port the app runs on
EXPOSE 8000

# Run entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]
