import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
  summary: { type: String, required: true },
  isbn: { type: String, required: true },
  genre: [{ type: mongoose.Schema.Types.ObjectId, ref: "Genre" }],
});

bookSchema.virtual("url").get((document) => `/catalog/book/${document._id}`);

export default mongoose.model("Book", bookSchema);
