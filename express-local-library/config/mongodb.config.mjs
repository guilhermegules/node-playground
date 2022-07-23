import mongoose from "mongoose";

export function databaseConnectionInit() {
  mongoose.connect(
    process.env.DATABASE_DEV_URI ?? process.env.DATABASE_PROD_URI
  );

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "MongoDB connection error:"));
}
