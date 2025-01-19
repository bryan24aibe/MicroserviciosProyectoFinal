require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'nombre_bd';

let db;

const connectToDatabase = async () => {
    if (!db) {
        try {
            const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
            await client.connect();
            console.log('🚀 Conectado a MongoDB');
            db = client.db(dbName);
        } catch (error) {
            console.error('❌ Error conectando a MongoDB:', error);
            process.exit(1);
        }
    }
    return db;
};

module.exports = { connectToDatabase };
