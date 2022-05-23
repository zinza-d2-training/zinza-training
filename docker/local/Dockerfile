FROM node:14-alpine

WORKDIR /app
COPY package.json yarn.lock ./

COPY . .
RUN chmod +x /docker-entrypoint.sh

ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED 1

EXPOSE 3000

ENV PORT 3000
