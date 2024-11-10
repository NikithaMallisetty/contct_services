const express = require('express');  
const bodyParser = require('body-parser'); 
const app = express();
const port = 3000; 

app.use(bodyParser.json());

let contacts = [];


app.post('/identify', (req, res) => {
  const { email, phoneNumber } = req.body;


  if (!email || !phoneNumber) {
    return res.status(400).json({ error: 'Email and phone number are required' });
  }

  let primaryContact = contacts.find(contact => contact.email === email || contact.phoneNumber === phoneNumber);

  
  if (!primaryContact) {
    primaryContact = {
      id: contacts.length + 1,
      email: email,
      phoneNumber: phoneNumber,
      linkedId: null,
      linkPrecedence: 'primary',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    contacts.push(primaryContact);
  } else {
    // If primary contact exists, create a secondary contact link
    const secondaryContact = {
      id: contacts.length + 1,
      email: email,
      phoneNumber: phoneNumber,
      linkedId: primaryContact.id,
      linkPrecedence: 'secondary',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    contacts.push(secondaryContact);
  }

  
  res.status(200).json({
    primaryContactId: primaryContact.id,
    emails: [primaryContact.email],
    phoneNumbers: [primaryContact.phoneNumber],
    secondaryContactIds: primaryContact.linkedId ? [primaryContact.linkedId] : [],
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



