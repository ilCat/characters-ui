# Stage 1: Build the React/Vite application
FROM node:20-alpine AS build

WORKDIR /app

# Copy package descriptors and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy application source code
COPY . .

# Environment variable for Vite API URL (can be passed via build arg)
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Build application bundle
RUN npm run build

# Stage 2: Serve application with Nginx
FROM nginx:1.25-alpine AS production

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built static assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
