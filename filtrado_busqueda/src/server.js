const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
//fix 1
const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
});

server.listen({ port: 4000 }).then(({ url }) => {
    console.log(`🚀 Servidor corriendo en ${url}`);
});
