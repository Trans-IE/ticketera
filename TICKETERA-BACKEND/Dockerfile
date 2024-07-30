FROM node:18-alpine

WORKDIR /app

# Clona el repositorio público
RUN git clone https://github.com/Trans-IE/ticketera.git . && \
    cd TICKETERA-BACKEND && \
    npm install

WORKDIR /app/TICKETERA-BACKEND

# Expon el puerto de la aplicación
EXPOSE 8080

# Comando para iniciar la aplicación
CMD ["npm", "start"]
