const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables from .env file

// Initialize Sequelize to connect to your database
const sequelize = new Sequelize(
    process.env.DB_NAME,      // Database name from .env file
    process.env.DB_USER,      // Database user from .env file
    process.env.DB_PASSWORD,  // Database password from .env file
    {
        host: process.env.DB_HOST,   // Database host from .env file
        dialect: 'mysql'             // Specifies using MySQL
    }
);

module.exports = sequelize; // Exports the database connection

