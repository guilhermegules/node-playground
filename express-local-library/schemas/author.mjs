import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

authorSchema.virtual("name").get((document) => {
  // To avoid errors in cases where an author does not have either a family name or first name
  // We want to make sure we handle the exception by returning an empty string for that case
  if (document.first_name && document.family_name) {
    return `${document.family_name}, ${document.first_name}`;
  }

  return "";
});

authorSchema.virtual("lifespan").get((document) => {
  let lifetime_string = "";
  if (document.date_of_birth) {
    lifetime_string = document.date_of_birth.getYear().toString();
  }

  lifetime_string += " - ";

  if (document.date_of_death) {
    lifetime_string += document.date_of_death.getYear();
  }

  return lifetime_string;
});

authorSchema
  .virtual("url")
  .get((document) => `/catalog/author/${document._id}`);

export default mongoose.model("Author", authorSchema);
