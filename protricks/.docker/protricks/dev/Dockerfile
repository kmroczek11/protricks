# Stage 1: Build the React app
FROM node:20-alpine AS build

ARG REACT_APP_HOST

ENV REACT_APP_HOST=$REACT_APP_HOST

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Serve the app using nginx
FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html

COPY .docker/protricks/dev/default.conf /etc/nginx/conf.d/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]