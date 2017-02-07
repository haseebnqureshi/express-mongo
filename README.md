
## Quick Start
Simply ```npm install && npm start``` to start your mongo database and launch your node application.

## MongoDB
Once you have MongoDB installed, you should be able to start this app using the scripts provided in package.json. Just in case you need to re-create the data, here's what you do (assuming you have mongo installed already):

1. Assuming you have mongo already installed, go ahead and start your mongo server. Either use the command ```npm run mongo``` in this project, or run ```mongod --dbpath data```.
2. In another terminal tab/window, enter the collowing commands one-by-one:

```
mongo
use api
db.createCollection('items')
...
show collections
show dbs
(ctrl + c to exit)
```
