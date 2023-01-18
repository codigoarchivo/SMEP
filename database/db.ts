import mongoose from 'mongoose';

const mongoConnection = {
    isConnected: 0
}

export const connect = async () => {
    /* Checking if the connection is already connected. */
    if (mongoConnection.isConnected) {
        console.log('We were already connected');
        return;
    }
    /* Checking if there is a connection already established. If there is, it will return. */
    if (mongoose.connections.length > 0) {
        mongoConnection.isConnected = mongoose.connections[0].readyState;
        if (mongoConnection.isConnected === 1) {
            console.log('Using previous connection');
            return;
        }
        await mongoose.disconnect();
    }
    /* Connecting to the MongoDB database. */
    await mongoose.connect(process.env.MONGO_URL || '');
    /* Setting the value of `isConnected` to 1. */
    mongoConnection.isConnected = 1;
    /* Logging the connection to the MongoDB database. */
    console.log('Connected to MongoDB:', process.env.MONGO_URL);
}

export const disconnect = async () => {
    /* Checking if the environment is development. If it is, it will return. */
    if (process.env.NODE_ENV === 'development') return;
    /* Checking if the connection is already connected. If it is, it will return. */
    if (mongoConnection.isConnected === 0) return;
    /* Disconnecting from the MongoDB database. */
    await mongoose.disconnect();
    /* Setting the value of `isConnected` to 0. */
    mongoConnection.isConnected = 0;
   /* Logging the disconnection from the MongoDB database. */
    console.log('Disconnected from MongoDB');
}