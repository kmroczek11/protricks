# Stage 1: Build NestJS app
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Run compiled app
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/init.sql ./dist/init.sql

EXPOSE 3000

CMD ["sh", "-c", "node dist/scripts/seed.js && node dist/main"]