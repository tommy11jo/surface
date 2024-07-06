FROM oven/bun:1

WORKDIR /usr/src/app

COPY package*.json ./
RUN bun install

COPY tsconfig.json ./
COPY src ./src

EXPOSE 8000