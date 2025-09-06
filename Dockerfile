FROM node:18-bullseye-slim

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install && npm audit fix

# Copy application code
COPY . .

# Set environment variables
ENV PORT=3000
ENV NODE_ENV=production

# Expose the correct port
EXPOSE 3000

# Start the application
CMD ["node", "app.js"]
