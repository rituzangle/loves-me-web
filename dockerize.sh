
#create dockerfile in project root folder - same level as the /dist dir
# run following commands

docker build -t loves-me-app .
docker run -d -p 8080:80 loves-me-app


## visit
# http://localhost:8080
## or from another device on the same Wi-Fi:
# http://<your-mac-IP>:8080

## dockerfile (no extension)  contents
## Use a lightweight nginx image
# FROM nginx:alpine

## Copy the static site output from Expo's web export
# COPY dist/ /usr/share/nginx/html

## Expose port 80 for web access
# EXPOSE 80

## Start nginx in the foreground
# CMD ["nginx", "-g", "daemon off;"]


