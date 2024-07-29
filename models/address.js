import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
    email: { type: String, required: true },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    city: { type: String, required: true },
    state: { type: String },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    name: { type: String, required: true }
});

const Address = mongoose.model('Address', addressSchema);

export default Address;
