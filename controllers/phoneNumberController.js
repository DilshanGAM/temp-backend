import PhoneNumber from '../models/phoneNumber.js';

// Create a new phone number entry
export const createPhoneNumber = async (req, res) => {
    try {
        const { email, phoneNumber, countryCode, numberWithoutCountryCode, country } = req.body;

        // Log incoming request body
        console.log('Request Body:', req.body);

        // Validate required fields
        if (!email || !phoneNumber || !countryCode || !numberWithoutCountryCode || !country) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newPhoneNumber = new PhoneNumber({
            email,
            phoneNumber,
            countryCode,
            numberWithoutCountryCode,
            country
        });

        await newPhoneNumber.save();
        res.status(201).json(newPhoneNumber);
    } catch (error) {
        console.error('Error creating phone number:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get all phone numbers
export const getPhoneNumbers = async (req, res) => {
    try {
        const phoneNumbers = await PhoneNumber.find({ email: req.user.email });
        res.status(200).json(phoneNumbers);
    } catch (error) {
        console.error('Error fetching phone numbers:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get a single phone number by ID
export const getPhoneNumberById = async (req, res) => {
    const { id } = req.params;
    const email = req.user.email;

    try {
        const phoneNumber = await PhoneNumber.findOne({ _id: id, email });
        if (!phoneNumber) {
            return res.status(404).json({ message: 'Phone number not found' });
        }
        res.status(200).json(phoneNumber);
    } catch (error) {
        console.error('Error fetching phone number:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update a phone number by ID
export const updatePhoneNumber = async (req, res) => {
    const { id } = req.params;
    const { phoneNumber, countryCode, numberWithoutCountryCode, country } = req.body;
    const email = req.user.email;

    try {
        const updatedPhoneNumber = await PhoneNumber.findOneAndUpdate(
            { _id: id, email },
            { phoneNumber, countryCode, numberWithoutCountryCode, country },
            { new: true }
        );

        if (!updatedPhoneNumber) {
            return res.status(404).json({ message: 'Phone number not found' });
        }

        res.status(200).json(updatedPhoneNumber);
    } catch (error) {
        console.error('Error updating phone number:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete a phone number by ID
export const deletePhoneNumber = async (req, res) => {
    const { id } = req.params;
    const email = req.user.email;

    try {
        const deletedPhoneNumber = await PhoneNumber.findOneAndDelete({ _id: id, email });

        if (!deletedPhoneNumber) {
            return res.status(404).json({ message: 'Phone number not found' });
        }

        res.status(200).json({ message: 'Phone number deleted successfully' });
    } catch (error) {
        console.error('Error deleting phone number:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
