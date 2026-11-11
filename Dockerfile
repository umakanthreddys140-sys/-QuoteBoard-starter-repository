# Stage 1: Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Copy package manifests first to leverage Docker layer caching
COPY package.json package-lock.json ./

# Install dependencies cleanly
RUN npm ci

# Copy application source code
COPY . .

# Build the Vite production bundle (outputs to /app/dist)
RUN npm run build

# Stage 2: Serve stage
FROM nginx:alpine

# Copy custom Nginx configuration to support client-side routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled static assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Document container port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

