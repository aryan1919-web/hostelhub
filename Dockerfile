# Build stage
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

COPY --from=build /app/build ./build
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./

# HF Spaces expects port 7860
ENV PORT=7860
EXPOSE 7860

CMD ["npx", "react-router-serve", "./build/server/index.js", "--port", "7860"]
