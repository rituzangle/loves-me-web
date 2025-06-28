# Use a lightweight nginx image
FROM nginx:alpine

# Copy the static site output from Expo's web export
COPY dist/ /usr/share/nginx/html

# Expose port 80 for web access
EXPOSE 80

# Start nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]

