# node-data-storage

A package for handleing data storage and retreval with node, express.js, knex.js, and pino for logging


## the state of it
Originally this was supposed to take a json and turn it into the rotue, controller, and db model but I didn't know enough about knexjs to do it.
Currently it will use tmi to get twitch chat send it to localhost:${EXPRESS_PORT}/chat_messages which will put it into a postgres database.

## whats to come
Now that this is working I'm going to set up another use case, and use that to try and abstract everything so it's easier to set up.


## how to use
install the dependancies by running:
```npm install```

create a .env file in the root directory
``` 
# express.js port
EXPRESS_PORT=<port for express to run on>


# postgres db 
PG_USER=<user name>
PG_DATABASE=<database name>
PG_PASSWORD=<users password>
PG_HOST=<database ip>
PG_PORT=<port the database is running on>

```

compile the typescript into javascript:
 ```npm run build```

then you can run it with:
```npm start```
