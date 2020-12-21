const express = require('express'); //import express library
const graphqlHTTP = require('express-graphql'); //import graphql
const schema = require('./schema/schema'); //import schema created
const cors = require('cors');

const app = express(); //setup express method as 'app'

app.use(cors());

/* Setup a middleware of graphql that act as endpoint */
app.use('/graphql', graphqlHTTP({
    /* get imported schema */
    schema,
    graphiql: true
}));

/* listening to a port of its own */
app.listen('8080', ()=>{console.log("Now listening to port 8080")});