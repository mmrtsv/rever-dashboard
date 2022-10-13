FROM node:18 

# not required
# RUN apk add ca-certificates

WORKDIR /app
ARG NPM_TOKEN
COPY .npmrc.docker .npmrc
COPY . .

RUN yarn

RUN rm -f .npmrc
RUN yarn build

EXPOSE 3000

ENTRYPOINT ["./entrypoint.sh"]

CMD ["yarn", "serve_static"]