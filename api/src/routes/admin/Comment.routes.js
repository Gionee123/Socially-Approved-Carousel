const express = require('express');
const route = express.Router();
const commentController = require('../../controllers/admin/Comment.controller');

module.exports = app => {

    route.post('/all', commentController.getAllComments);
    route.post('/video', commentController.getCommentsByVideo);
    route.post('/status-change', commentController.statusChange);

    app.use('/api/admin/comment', route);
};

//http://localhost:5000/api/admin/comment/all
//http://localhost:5000/api/admin/comment/video/:videoId
//http://localhost:5000/api/admin/comment/status-change