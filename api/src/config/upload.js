const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

// Storage for videos
const videoStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "videos",
        resource_type: "video",
        allowed_formats: ["mp4", "mov", "avi", "mkv", "webm"],
    },
});

// Storage for images (thumbnails)
const imageStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "thumbnails",
        resource_type: "image",
        allowed_formats: ["jpg", "jpeg", "png", "webp", "gif"],
    },
});

const upload = multer({ storage: videoStorage });
const uploadImage = multer({ storage: imageStorage });

// For uploading both video and thumbnail in one request
const uploadFields = multer({
    storage: multer.memoryStorage(),
}).fields([
    { name: "videoUrl", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
]);

module.exports = upload;
module.exports.uploadImage = uploadImage;
module.exports.uploadFields = uploadFields;
