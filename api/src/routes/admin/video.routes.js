const express = require('express');
const route = express.Router();
const videoController = require('../../controllers/admin/video.controller');
const upload = require('../../config/upload');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../../config/cloudinary');
const multer = require('multer');

// Custom multer with fields for both video and image
const videoStorage = new CloudinaryStorage({ cloudinary, params: { folder: 'videos', resource_type: 'video', allowed_formats: ['mp4','mov','avi','mkv','webm'] } });
const imageStorage = new CloudinaryStorage({ cloudinary, params: { folder: 'thumbnails', resource_type: 'image', allowed_formats: ['jpg','jpeg','png','webp'] } });

const uploadVideo = multer({ storage: videoStorage });
const uploadImage = multer({ storage: imageStorage });

module.exports = app => {

    route.post('/add', uploadVideo.single('videoUrl'), videoController.create);

    route.post('/view', videoController.view);

    route.put('/update/:id', uploadVideo.single('videoUrl'), videoController.update);

    route.post('/upload-thumbnail', uploadImage.single('thumbnail'), videoController.uploadThumbnail);

    route.delete('/delete/:id', videoController.delete);

    route.post("/status-change", videoController.statusChange);

    route.post("/details", videoController.details);

    app.use('/api/admin/video', route);
}
//http://localhost:5000/api/admin/video/add
//http://localhost:5000/api/admin/video/view
//http://localhost:5000/api/admin/video/update/:id
//http://localhost:5000/api/admin/video/delete/:id
//http://localhost:5000/api/admin/video/status-change
//http://localhost:5000/api/admin/video/details