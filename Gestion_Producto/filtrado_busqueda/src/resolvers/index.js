const { connectToDatabase } = require('../database');

const resolvers = {
    Query: {
        searchProducts: async (_, { name, category, tags }) => {
            const db = await connectToDatabase();
            const collection = db.collection('products');

            const filter = {};
            if (name) filter.name = { $regex: name, $options: 'i' };
            if (category) filter.category = category;
            if (tags) filter.tags = { $all: tags };

            return collection.find(filter).toArray();
        },
    },
};
//fix 1
module.exports = resolvers;
