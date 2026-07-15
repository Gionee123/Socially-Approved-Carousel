const express = require('express');
const route = express.Router();
const likeController = require('../../controllers/admin/Like.controller');

module.exports = app => {

    route.post('/all', likeController.getAllLikes);
    route.post('/video', likeController.getLikesByVideo);

    app.use('/api/admin/like', route);
};