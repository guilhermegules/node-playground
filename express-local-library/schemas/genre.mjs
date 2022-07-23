import mongoose from "mongoose";

const genreSchema = new mongoose.Schema({
  name: { type: String, required: true, maxLength: 100, minLength: 3 },
});

genreSchema.virtual("url").get((document) => `/catalog/genre/${document._id}`);

export default mongoose.model("Genre", genreSchema);
