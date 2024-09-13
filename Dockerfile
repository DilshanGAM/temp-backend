# Use the official Node.js image from the Docker Hub
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install app dependencies
RUN npm install --force

# Copy the rest of the application code
COPY . .

# Expose the port that your app will run on
EXPOSE 5000

# Define environment variables
ENV ATLAS_URI=mongodb+srv://malithdilshan27:QUf5tAWjqs4P6uJV@cluster0.gd8du1k.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0
ENV PORT=5000

# Run the application
CMD [ "node", "server.js" ]
