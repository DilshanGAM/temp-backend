import Address from "../models/address.js";

// Create a new address
export const createAddress = async (req, res) => {
  const { addressLine1, addressLine2, city, state, postalCode, country, name } =
    req.body;
  const email = req.user.email;

  try {
    const newAddress = new Address({
      email,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      name,
    });
    await newAddress.save();
    res.status(201).json(newAddress);
  } catch (error) {
    console.error("Error creating address:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all addresses
export const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ email: req.user.email });
    res.status(200).json(addresses);
  } catch (error) {
    console.error("Error fetching addresses:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get a single address by ID
export const getAddressById = async (req, res) => {
  const { id } = req.params;
  const email = req.user.email;

  try {
    const address = await Address.findOne({ _id: id, email });
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.status(200).json(address);
  } catch (error) {
    console.error("Error fetching address:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update an address by ID
export const updateAddress = async (req, res) => {
  const { id } = req.params;
  const { addressLine1, addressLine2, city, state, postalCode, country, name } =
    req.body;
  const email = req.user.email;

  try {
    const updatedAddress = await Address.findOneAndUpdate(
      { _id: id, email },
      { addressLine1, addressLine2, city, state, postalCode, country, name },
      { new: true }
    );

    if (!updatedAddress) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.status(200).json(updatedAddress);
  } catch (error) {
    console.error("Error updating address:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete an address by ID
export const deleteAddress = async (req, res) => {
  const { id } = req.params;
  const email = req.user.email;

  try {
    const deletedAddress = await Address.findOneAndDelete({ _id: id, email });

    if (!deletedAddress) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    console.error("Error deleting address:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
