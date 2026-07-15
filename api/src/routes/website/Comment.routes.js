const express = require('express');
const route = express.Router();
const commentController = require('../../controllers/website/Comment.controller');

module.exports = app => {

    route.post('/add', commentController.addComment);
    route.post('/video', commentController.getCommentsByVideo);
    route.put('/update/:id', commentController.updateComment);
    route.delete('/delete/:id', commentController.deleteComment);

    app.use('/api/website/comment', route);
};
//http://localhost:5000/api/website/comment/add
//http://localhost:5000/api/website/comment/video
//