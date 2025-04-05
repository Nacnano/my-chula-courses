# Use Node v4 as the base image.
FROM node:17-alpine

# Add everything in the current directory to our image, in the 'app' folder.
WORKDIR /app

COPY . .

# Install dependencies
RUN npm install

# Expose our server port.
EXPOSE 80

# Run our app.
CMD ["node", "/app/index.js"]
