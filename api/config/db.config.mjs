import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.DB_CONNECTION_STRING)
        console.log('MongoDB connection successful')
    } catch (err) {
        console.log('Error occured while coonecting to db', err);
        process.exit(1);
    }
}

export default connectDB