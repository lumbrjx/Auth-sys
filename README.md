# Auth-sys

A full auth system made with Fastify plugins only, typescript and redis for session storage.

## Used stack

- Fastify (Typescript)
- Drizzle
- Redis
- Postgres

## getting started

first clone the repo and run

```bash
>> cd Auth-sys
pnpm install
```

make sure to define the your secret keys in a .env file in the root dir before starting the .env file should look like this:

```ts
// Google config for Google OAuth
GOOGLE_CLIENT_ID = "set your own client id from google console";
GOOGLE_CLIENT_SECRET = "set your own client secret from google console";

// Docker compose database URL
PG_DATABASE =
  "postgres://root:LdsfgjpmLDSFg8941sdfgsdfc@localhost:5432/pgs_database";

// OAuth URL to gather user info from Google
OAUTH_USERINFO_URL = "https://www.googleapis.com/oauth2/v2/userinfo";

// Session secrets
SECRET = "qsdqfghhsdfghhgdsgsdfgsfdg87sdqf7qd";
SALT = "qsfqhfjkqsdfqjsk";
```

after setting .env file run the docker compose containers :

_make sure you have docker already installed on your machine_

```bash
docker compose up -d
```

## API endpoints

### `/`

The home route.

### `/register`

_credentials method_ to register a new user in the databse, it requires: **username, email, password, preference** for the JSON body.

### `/login`

_credentials method_ to login a new user, it require: **email, password** for the JSON body. If a user is found, it returns a **200 response with a session**. If not, it returns a **403 response**.

### `/logout`

Destroys the session in the client and redis.

### `/login/google`

_OAuth method_ to register/login a user using Google provider. it saves a new user in the db if it doesn't exists and returns a session to the client, save it in redis.

### `/api/auth/callback/google`

The callback uri for Google OAuth.

### `/dashboard`

A protected route that can be accessible only if the user is logged in, if not a **403 response** is thrown

### `/getAllRecords` _dev route_

returns all the sessions in redis, if no sessions are found it will return an error.
ITS A DEV ROUTE DON4T USE IT FOR PROD.

## Note

**this repo is for education purposes only, don't use it for prod projects as your auth soultion.**

## Todo

- create CI/CD pipes
- edit docker + docker secrets
- edit session refresh functionality
- update global error handler
- edit the returned values from the controllers
- simplify the controllers
