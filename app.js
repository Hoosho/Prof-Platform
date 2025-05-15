// Importing Required Modules
const express = require('express');
const app = express();

require('dotenv').config();

// Importing Routes
const {  } = require('./routes/auth');

// Importing Database Connection
const { connectDB } = require('./config/db')
connectDB();

// Middlewares
// Parse JSON bodies in the request
app.use(express.json());
// Parse URL-encoded bodies in the request
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', (req, res) => {
    res.send('test')
});

// Setting Up The PORT And Listening To It
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => { 
    console.log(`Server Is Listening At http://localhost:${PORT}`)
});


