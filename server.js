require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const authRoutes = require('./src/server/routes/authRoutes');
const loginRoutes = require('./src/server/routes/Login.route');
const connectDB = require('./src/server/config/db');


const app = express();

// Middleware for parsing JSON data
app.use(express.json());

// Routes
app.use('/', require('./src/server/routes/Login.route'))
app.use('/', loginRoutes);
app.use('/api/auth', authRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('[-- MongoDB connected --]'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Use the auth routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
