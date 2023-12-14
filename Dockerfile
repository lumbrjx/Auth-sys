# ensure using a well known stable image
ARG NODE_VERSION
FROM node:${NODE_VERSION} as builder
RUN apk update && apk add --no-cache dumb-init python3 make g++
# create a dir with user priviliege
WORKDIR /usr/src/app
# Defaults to production, docker-compose overrides this to development on build and run.
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV
COPY package.json package-lock.json* tsconfig.json ./
COPY . .
RUN --mount=type=cache,target=/usr/src/app/.npm \
    npm set cache /usr/src/app/.npm && npm ci --include=dev && npm run build && npx prisma generate && npm cache clean --force

FROM node:${NODE_VERSION} as runner
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV
# fastify need python3 and gcc to compile libsoduim.
WORKDIR /usr/src/app
RUN chown node:node ./
# switch user to node for security

WORKDIR /usr/src/app
COPY --chown=node:node --from=builder /usr/src/app/dist ./dist
# COPY --chown=node:node --from=builder /usr/src/app/.env .env
COPY --chown=node:node --from=builder /usr/src/app/package.json .
COPY --chown=node:node --from=builder /usr/src/app/prisma .
COPY --chown=node:node --from=builder /usr/src/app/package-lock.json .
COPY --chown=node:node --from=builder /usr/src/app/node_modules/.prisma/client ./node_modules/.prisma/client
RUN --mount=type=cache,target=/usr/src/app/.npm \ 
apk update && apk add --no-cache dumb-init libsodium && npm set cache /usr/src/app/.npm && npm ci --omit=dev

USER node

EXPOSE 3000

CMD ["dumb-init", "npm" ,"run", "start"]