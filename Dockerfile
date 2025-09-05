 FROM node:20-alpine AS build
# TODO: Try to build with docker check primeng lib import version of @angular/animations@20.2.3
WORKDIR /src
RUN npm install -g @angular/cli

COPY package*.json ./
RUN npm ci

COPY . ./
RUN ng build --configuration=production

FROM nginx:stable AS final
EXPOSE 80
COPY --from=build /src/dist/access-hub/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
 