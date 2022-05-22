FROM node:14-buster-slim

WORKDIR /app
COPY package.json ./

RUN yarn

RUN yarn add -D @next/swc-linux-x64-gnu

COPY . .

ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED 1

EXPOSE 3000

ENV PORT 3000

CMD ["yarn", "dev"]
