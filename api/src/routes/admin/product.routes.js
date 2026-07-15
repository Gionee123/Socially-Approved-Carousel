const express = require('express');
const route = express.Router();
const productController = require('../../controllers/admin/product.controller');

module.exports = app => {

    route.get('/view', productController.view);

    app.use('/api/admin/product', route);
};
