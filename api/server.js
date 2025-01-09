const express = require('express');
const path = require('path');
const app = require('./app');

const PORT = process.env.PORT || 3824;

// Serve static files from the /public/dist directory
app.use(express.static(path.join(__dirname, 'public', 'dist')));

// Catch-all handler to serve index.html for React routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dist', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
