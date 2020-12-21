const graphql = require('graphql'); //import the graphql
const fetch = require("node-fetch");

/* Grabbing special data-structures from GraphQL */
const {
    GraphQLObjectType,
    GraphQLID, 
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLSchema
} = graphql;

const BASE_URL = "https://api.spacexdata.com/v4/";

function fetchResponseByURL(relativeURL, method="GET", body="") {
    const arg = {method};
    if(method!=='GET'){
        arg.body = JSON.stringify(body);
        arg.headers = {'Content-Type': 'application/json'}
    }
    return fetch(`${BASE_URL}${relativeURL}`, arg)
    .then(function(res) {
         return res.json();
      }).then(function(json) {
        return json;
      })
      .catch(function(error) {
        console.log('Error: ', error);
      });
}

function fetchLaunchPads(relativeURL){
    return fetchResponseByURL(relativeURL).then(json => json.map(launchpad=>{  return launchpad; }));
}
function fetchLaunchPadsByID(relativeURL){
    return fetchResponseByURL(relativeURL).then(json =>  json );
}
function fetchFailedLaunchesByID(relativeURL, method, body){
    return fetchResponseByURL('launches/query',method , body)
    .then(json => json.docs.map(launchpad=>{  return launchpad; }));
}

const QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      allLaunchPads: {
        type: new GraphQLList(LaunchPadType),
        resolve: ()=>fetchLaunchPads('launchpads') // Fetch allLaunchPads,
      },
      launchPadFailures: {
        type: LaunchPadType,
        args: {
            id: { type: GraphQLString },
        },
        resolve: (parent, args)=>fetchLaunchPadsByID(`launchpads/${args.id}`) // Fetch LaunchPad by id
      }
    }),
});

const LaunchPadType = new GraphQLObjectType({
    name: 'LaunchPad',
    fields: ()=>({
        id: { 
            type: GraphQLID, 
        },
        launchpad: { 
            type: GraphQLString,
            resolve: function(LaunchPad) {
                return LaunchPad.name;
            }
        },
        all_failures: {
            type: new GraphQLList(FailedLaunches),
            resolve: (parent, args)=>{
                const launchQuery = {
                    query:{
                        success: false,
                        launchpad: parent.id
                    }
                };
                return fetchFailedLaunchesByID(`launches/query`, "POST", launchQuery) 
            }
        }
    })
});


const FailedLaunches = new GraphQLObjectType({
    name: 'FailedLaunches',
    fields: ()=>({
        name: { 
            type: GraphQLString,
        },
        failures:{
            type: GraphQLString,
            resolve: function(FailedLaunches) {
                return FailedLaunches.failures[0].reason;
            }
        }
    })
});

/* Export the schema */
module.exports = new GraphQLSchema({
    query: QueryType
});





/* 


const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: ()=>({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: { 
            type: AuthorType,
            resolve(parent, args){
                //return _.find(authors, {id: parent.authorid});
                return Author.findById(parent.authorid);
            } 
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: ()=>({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                //return _.filter(books, {authorid: parent.id});
                return Book.find({authorid: parent.id});
            }
        }
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: {type: GraphQLID }},
            resolve(parent, args){
                //code to get data from DB/main source
                //return _.find(books, {id: args.id});
                return Book.findById(args.id);
            }
        },
        author: {
            type: AuthorType,
            args: { id: {type: GraphQLID }},
            resolve(parent, args){
                //code to get data from DB/main source
                return Author.findById(args.id);
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                //code to get data from DB/main source
                //return books;
                return Book.find({});
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                //code to get data from DB/main source
                //return authors;
                return Author.find({});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: QueryType
}); */