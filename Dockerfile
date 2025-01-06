FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Construir la aplicación
RUN npm run build

# Exponer el puerto en el que la app va a correr
EXPOSE 3000

# Definir el comando para correr la aplicación en producción
CMD ["npm", "run", "start:prod"]