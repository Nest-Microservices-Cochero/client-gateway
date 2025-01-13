# Usa una imagen base
FROM node:21-alpine3.19

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json
COPY package.json ./
COPY package-lock.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Cambia los permisos de los archivos
RUN chmod -R 755 /usr/src/app/src

# Cambia el propietario de los archivos (opcional)
RUN chown -R node:node /usr/src/app/src

# Expone el puerto 3000
EXPOSE 3000

# Comando por defecto
CMD ["npm", "run", "start:dev"]