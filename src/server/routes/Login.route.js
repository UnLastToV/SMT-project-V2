const express = require('express');
const router = express.Router();

// ตัวอย่าง route
router.post('/login', (req, res) => {
    // การทำงานของการ login
    res.send('Login successful');
});

module.exports = router; // export router
