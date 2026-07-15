const express = require('express');
const route = express.Router();
const likeController = require('../../controllers/website/Like.controller');

module.exports = app => {

    route.post('/toggle', likeController.toggleLike);
    route.get('/video/:videoId', likeController.getLikesByVideo);

    app.use('/api/website/like', route);
};