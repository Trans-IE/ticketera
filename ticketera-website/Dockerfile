# Usa una imagen base más reciente de Node.js
FROM node:22.4.1-alpine AS build

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias
RUN npm install --legacy-peer-deps

# Copia el resto del código de la aplicación al directorio de trabajo
COPY . .

# Construye la aplicación en modo producción
RUN npm run bprod

# Usa una imagen base de nginx para servir la aplicación
FROM nginx:stable-alpine

# Copia los archivos estáticos generados desde la etapa de build al directorio de nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto que usará la aplicación
EXPOSE 80

# Comando por defecto para ejecutar nginx
CMD ["nginx", "-g", "daemon off;"]
