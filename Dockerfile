# Dockerfile for Next.js

# Use the official Node.js image as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and pnpm-lock.yaml to /app
COPY package.json ./

# Install pnpm globally
#RUN npm install -g pnpm

# Install dependencies
RUN npm i

# Copy the rest of the application code to the working directory
COPY . .

# Build the Next.js application
RUN npm run build

# Expose port 3000 for the application
EXPOSE 3001

CMD ["npm", "start"]