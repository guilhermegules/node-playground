import mongoose from "mongoose";
import BookInstanceStatus from "../models/book-instance-status.mjs";

const bookInstanceSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  imprint: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: [
      BookInstanceStatus.AVAILABLE,
      BookInstanceStatus.MAINTENANCE,
      BookInstanceStatus.LOANED,
      BookInstanceStatus.RESERVED,
    ],
    default: BookInstanceStatus.MAINTENANCE,
  },
  due_back: { type: Date, default: Date.now },
});

bookInstanceSchema
  .virtual("url")
  .get((document) => `/catalog/bookinstance/${document._id}`);

export default mongoose.model("BookInstance", bookInstanceSchema);
