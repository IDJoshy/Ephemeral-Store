import mongoose from "mongoose"

export const connectToDatabase = async (url, dbName) =>
{
    try
    {
        await mongoose.connect(url, {dbName: dbName});
        console.log("Connected to Cluster");
    }
    catch(error)
    {
        console.log(`Error connecting to MongoDB Atlas Cluster: ${error.message}`);
        process.exit(1);
    }
}

export default connectToDatabase;