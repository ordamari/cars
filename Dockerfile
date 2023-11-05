FROM node:18.16.0 as build

#Setup project

WORKDIR /usr/local/app

RUN npm install -g pnpm@7.9.0

COPY ./tsconfig.json        ./
COPY ./tsconfig.app.json    ./
COPY ./tsconfig.spec.json   ./
COPY ./angular.json          ./
COPY ./package.json         ./
COPY ./pnpm-lock.yaml       ./
COPY ./src                  ./src

RUN pnpm install --ignore-scripts --frozen-lockfile
RUN pnpm build

# run app with nginx server
FROM nginx:latest

COPY --from=build /usr/local/app/dist/cars /usr/share/nginx/html

EXPOSE 80