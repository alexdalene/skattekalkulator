# ---- Stage 1: build ----
FROM node:24-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

ENTRYPOINT [ "npm", "run", "start", "--" ]

# ---- Stage 2: runtime ----
FROM node:24-alpine
WORKDIR /app

COPY --from=build /app/dist ./dist

ENTRYPOINT [ "node", "dist/index.js" ]