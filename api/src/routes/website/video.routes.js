const express = require('express');
const route = express.Router();
const videoController = require('../../controllers/website/video.controller');
const upload = require('../../config/upload');

module.exports = app => {


    route.post('/view', videoController.view);





    app.use('/api/website/video', route);
}
//http://localhost:5000/api/website/video/view
//