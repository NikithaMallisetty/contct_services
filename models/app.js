const express = require('express');
const app = express();
const sequelize = require('./models/index'); // Import Sequelize connection
const identifyRoute = require('./routes/identify'); // Import identify route

// Middleware to parse JSON requests
app.use(express.json());

// Use the /identify route
app.use('/identify', identifyRoute);

// Start the server and sync database
const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to sync database:', err);
});
