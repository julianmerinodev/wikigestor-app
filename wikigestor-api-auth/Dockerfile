# Usa una imagen base de Node
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de configuración
COPY package*.json ./

RUN npm install

# Copia el resto del proyecto
COPY . .

# Expone el puerto de la API
EXPOSE 4000

# Comando para correr la app
CMD ["npm", "start"]
