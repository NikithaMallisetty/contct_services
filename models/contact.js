const { DataTypes } = require('sequelize');
const sequelize = require('./index'); // Import the database connection

// Define the Contact model (database table)
const Contact = sequelize.define('Contact', {
    phoneNumber: { type: DataTypes.STRING },    // Phone number field
    email: { type: DataTypes.STRING },          // Email field
    linkedId: { type: DataTypes.INTEGER },      // ID of another linked contact
    linkPrecedence: {
        type: DataTypes.ENUM('primary', 'secondary'), // Enum type for linkPrecedence
        allowNull: false                          // Mandatory field
    },
    deletedAt: { type: DataTypes.DATE }          // Optional deletion date for soft deletes
}, { timestamps: true });                        // Adds createdAt and updatedAt timestamps

module.exports = Contact; // Exports the Contact model for use in other parts of the application
