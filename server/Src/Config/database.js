import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("Database Connection Error:", error.message);
        process.exit(1);
    }
};

// E12qLNHNP6lnfGfK

// agadaunogwu04_db_user

// Connection event listeners
mongoose.connection.on("disconnected", () => {
    console.log("MongoDB Disconnected");
});

mongoose.connection.on("error", (error) => {
    console.error("MongoDB Error:", error);
});

export default connectDB;
