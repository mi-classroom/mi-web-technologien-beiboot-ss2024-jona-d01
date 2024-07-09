FROM node:latest as frontend-build

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

COPY frontend frontend

WORKDIR /usr/src/app/frontend

COPY tsconfig.json .

RUN npm install

RUN npm install axios --save

RUN npm run build-only


FROM node:latest as backend-start

WORKDIR /usr/src/app

COPY package.json .

COPY backend backend
COPY --from=frontend-build /usr/src/app/frontend/dist frontend/dist
COPY --from=frontend-build /usr/src/app/frontend/index.html frontend/index.html

RUN npm install

CMD ["npm", "run", "backend-dev"]

EXPOSE 8000
