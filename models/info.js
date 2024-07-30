import mongoose from "mongoose";

const infoSchema = new mongoose.Schema({
  contact: {
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
  },
  socialMedia: {
    facebook: { type: String, required: true },
    twitter: { type: String, required: true },
    youtube: { type: String, required: true },
    pinterest: { type: String, required: true },
    instagram: { type: String, required: true },
  },
  newsletter: {
    title: { type: String, required: true },
    placeholder: { type: String, required: true },
    buttonText: { type: String, required: true },
  },
});

const Info = mongoose.model("Info", infoSchema);

export default Info;
