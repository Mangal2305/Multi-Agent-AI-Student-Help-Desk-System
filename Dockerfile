# Sahayak — AI Student Help Desk
# Static site (index.html + styles.css + app.js) served by nginx.

FROM nginx:1.27-alpine

# Remove nginx's default sample page
RUN rm -rf /usr/share/nginx/html/*

# Copy the site
COPY index.html /usr/share/nginx/html/index.html
COPY styles.css /usr/share/nginx/html/styles.css
COPY app.js     /usr/share/nginx/html/app.js

# Custom nginx config: gzip, sane caching, health check endpoint
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost/healthz || exit 1

CMD ["nginx", "-g", "daemon off;"]
