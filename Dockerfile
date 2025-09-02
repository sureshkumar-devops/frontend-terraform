FROM node:18-bullseye-slim
WORKDIR /app
COPY package*.json ./
RUN npm install && npm audit fix
COPY . .
EXPOSE 80
CMD ["node", "app.js"]
