# Step 1: Use a lightweight node image to build the app
FROM node:18 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Vite.js app
RUN npm run build

RUN ls -al /app

# Step 2: Use a lightweight web server to serve the app
FROM nginx:stable-alpine

# Copy the built files to the nginx html directory
COPY --from=builder /app/out /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
