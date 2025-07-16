# Dockerfile
# 1) Build stage
FROM node:18-alpine AS builder

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# 2) Production image
FROM node:18-alpine

WORKDIR /usr/src/app

# only prod deps
COPY package*.json ./
RUN npm ci --only=production

# copy built dist
COPY --from=builder /usr/src/app/dist ./dist

# copy any needed assets (e.g. views, public)
# COPY --from=builder /usr/src/app/public ./public

EXPOSE 3000
CMD ["node", "dist/main.js"]
