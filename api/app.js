const express = require('express');
const mongoose = require('mongoose');
const resumeRoutes = require('./components/resume/resumeRoutes');
const userRoutes = require('./components/user/userRoutes');
const cors = require('cors');
const app = express();

app.use(cors({}));

// Middleware
// app.use(express.json());
// Increase JSON body size limit
app.use(express.json({ limit: '10mb' })); // Set the limit to 10MB
app.use(express.urlencoded({ limit: '10mb', extended: true })); // For URL-encoded data
app.use('/', resumeRoutes);
app.use('/', userRoutes);

// MongoDB connection
// 'mongodb://127.0.0.1:27017'
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

module.exports=app;