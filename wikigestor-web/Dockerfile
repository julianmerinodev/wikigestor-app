# Etapa 1: build
FROM node:18-alpine AS builder

WORKDIR /app

# Copia package.json y package-lock.json (o yarn.lock)
COPY package.json package-lock.json* ./

RUN npm install

COPY . .

RUN npm run build && ls -la /app

# Etapa 2: producción
FROM node:18-alpine

WORKDIR /app

RUN npm install -g serve

# Copia la carpeta 'dist' generada por Vite
COPY --from=builder /app/dist ./

EXPOSE 3000

CMD ["serve", "-s", ".", "-l", "3000"]
