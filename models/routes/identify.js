const express = require('express');
const router = express.Router();
const Contact = require('../models/contact'); // Import the Contact model

// Handle POST requests to /identify
router.post('/', async (req, res) => {
    try {
        const { email, phoneNumber } = req.body;

        // 1. Look for existing contact with matching email or phone number
        let existingContact = await Contact.findOne({
            where: { email, phoneNumber }
        });

        // 2. If no match, create a new primary contact
        if (!existingContact) {
            const newContact = await Contact.create({
                email,
                phoneNumber,
                linkPrecedence: 'primary'
            });

            return res.status(200).json({
                primaryContactId: newContact.id,
                emails: [newContact.email],
                phoneNumbers: [newContact.phoneNumber],
                secondaryContactIds: []
            });
        }

        // 3. If a match is found, treat it as a secondary contact
        const secondaryContact = await Contact.create({
            email,
            phoneNumber,
            linkedId: existingContact.id,
            linkPrecedence: 'secondary'
        });

        // 4. Prepare and send the response
        res.status(200).json({
            primaryContactId: existingContact.id,
            emails: [existingContact.email, secondaryContact.email],
            phoneNumbers: [existingContact.phoneNumber, secondaryContact.phoneNumber],
            secondaryContactIds: [secondaryContact.id]
        });
    } catch (error) {
        console.error("Error handling /identify request:", error);
        res.status(500).json({ message: "An error occurred." });
    }
});

module.exports = router;
