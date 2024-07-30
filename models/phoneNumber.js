import mongoose from "mongoose";

const phoneNumberSchema = new mongoose.Schema({
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  countryCode: { type: String, required: true },
  numberWithoutCountryCode: { type: String, required: true },
  country: { type: String, required: true },
});

const PhoneNumber = mongoose.model("PhoneNumber", phoneNumberSchema);

export default PhoneNumber;
