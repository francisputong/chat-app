import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlparser: true,
            useUnifiedTopology: true,
        });
    } catch (error) {
        console, log(error);
        process.exit();
    }
};

export default connectDb;
