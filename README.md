# to install dependencies
npm install

# Building your image
docker build -t ranjith_graphql/gql_server-app . 

# Run the image
docker run -p 49160:8080 -d ranjith_graphql/gql_server-app --no-cache
