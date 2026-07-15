const Like = require("../../models/Like.Schema");
const Video = require("../../models/Video.schema");


exports.getLikesByVideo = async (request, response) => {
    try {
        const { videoId } = request.body;

        const likes = await Like.find({ videoId, liked: true });

        response.status(200).json({
            status: true,
            message: "Likes fetched successfully",
            count: likes.length,
            data: likes
        });
    } catch (error) {
        response.status(500).json({
            status: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};

exports.getAllLikes = async (request, response) => {
    try {
        const likes = await Like.find()
            .populate('videoId', 'title videoUrl thumbnail')
            .sort({ createdAt: -1 });

        response.status(200).json({
            status: true,
            message: "All likes fetched successfully",
            count: likes.length,
            data: likes
        });
    } catch (error) {
        response.status(500).json({
            status: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};