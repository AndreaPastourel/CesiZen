# Stage 1 : build de l'application React
FROM node:22-alpine AS builder

WORKDIR /app 


COPY package.json package-lock.json ./

RUN npm ci


COPY . .


RUN npm run build


# Stage 2 : image finale légère avec Nginx

FROM nginxinc/nginx-unprivileged:alpine AS runner

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

USER nginx

EXPOSE 8080

HEALTHCHECK --interval=10s --timeout=5s --start-period=15s --retries=5 \
    CMD wget -qO- http://127.0.0.1:8080/ > /dev/null || exit 1
    
CMD ["nginx", "-g", "daemon off;"]
