FROM node:alpine AS builder

WORKDIR /home/node

COPY action.yml package.json tsconfig.json ./
COPY src ./src

RUN npm install
RUN npm run build
RUN npm prune --production

FROM node:alpine

WORKDIR /home/node

COPY --from=builder /home/node/action.yml /home/node/package.json ./
COPY --from=builder /home/node/lib ./lib
COPY --from=builder /home/node/node_modules ./node_modules

ENTRYPOINT ["node", "lib/main.js"]
