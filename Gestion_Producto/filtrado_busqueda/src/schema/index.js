const { gql } = require('apollo-server');

const typeDefs = gql`
    type Product {
        id: ID
        name: String
        category: String
        price: Float
        tags: [String]
    }

    type Query {
        searchProducts(name: String, category: String, tags: [String]): [Product]
    }
`;

module.exports = typeDefs;
