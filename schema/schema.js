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
