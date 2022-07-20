import mongoose from "mongoose";

const DB_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@sandbox.ije6e.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(DB_URL);

const database = mongoose.connection;

database.on("error", console.error.bind(console, "MongoDB connection error:"));
