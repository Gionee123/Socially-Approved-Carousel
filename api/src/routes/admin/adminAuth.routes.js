const express = require('express');
const router = express.Router();
const adminAuthController = require('../../controllers/admin/adminAuth.controller');

// Admin login route
router.post('/login', adminAuthController.login);

module.exports = app => {
    app.use('/api/admin/adminAuth', router);
};
//https://localhost:5000/api/admin/adminAuth/login