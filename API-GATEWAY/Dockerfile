# Usa una imagen base más reciente de Node.js
FROM node:22.4.1-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

COPY .env ./

# Instala las dependencias
RUN npm install --legacy-peer-deps

# Copia el resto del código de la aplicación al directorio de trabajo
COPY . .

# Exponer el puerto que usará la aplicación
EXPOSE 5101

# Script de inicio para registrar información adicional
CMD ["npm", "start"]

# Establece una variable de entorno opcionalmente
ENV NODE_VERSION 18.0.0
