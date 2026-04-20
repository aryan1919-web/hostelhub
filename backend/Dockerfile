# Backend Dockerfile
FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package.json ./
RUN npm install

# Copy source
COPY . .

# Seed database
RUN npx tsx db/seed.ts

EXPOSE 3001

CMD ["npx", "tsx", "server.ts"]
