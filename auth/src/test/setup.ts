import { MongoMemoryServer } from "mongodb-memory-server"
import mongoose from "mongoose"
import { app } from "../app.js"

let mongo: MongoMemoryServer

beforeAll(async () => {
    // mongo = new MongoMemoryServer();
    mongo = await MongoMemoryServer.create()
    // const mongoUri = await mongo.getUri();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri)
});

beforeEach(async () => {
    if (mongoose.connection.db) {
        const collections = await mongoose.connection.db.collections();

        for (let collection of collections) {
            await collection.deleteMany({});
        }
    }
});

afterAll(async () => {
    if (mongo) {
        await mongo.stop();
    }
    await mongoose.connection.close();
});
