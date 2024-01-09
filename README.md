# node-data-storage

A package for handleing data storage and retreval with node, express.js and knex.js

it uses express to retrieve the data and postgresql to store it.

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




