# Use an official python runtime as a parent image (v2 vs v3 bleh)
FROM python:2.7-slim

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages; 
# We have dependency listings at home! Dependency listing at home: requirements.txt
RUN pip install --trusted-host pypi.python.org -r requirements.txt

# Make port 80 available to the world outside this container
EXPOSE 80

# Define an environment variable
ENV NAME World

# Run app.py when the container launches
CMD ["python", "app.py"]
