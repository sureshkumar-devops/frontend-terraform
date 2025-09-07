FROM node:18-bullseye-slim

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install && npm audit fix

# Copy application code
COPY . .

# Set environment variables
ENV PORT=8080
ENV NODE_ENV=production

# Expose the correct port
EXPOSE 8080

# Start the application
CMD ["node", "app.js"]
