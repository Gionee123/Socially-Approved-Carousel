const Video = require("../../models/Video.schema");
const Like = require("../../models/Like.Schema");
const Comment = require("../../models/Comment.Schema");

exports.view = async (request, response) => {
    try {
        // Only fetch videos where status is true (Active)
        const videos = await Video.find({ status: true }).sort({ createdAt: -1 }).lean();

        const videosWithStats = await Promise.all(videos.map(async (video) => {
            const likesCount = await Like.countDocuments({ videoId: video._id, liked: true });
            const commentsCount = await Comment.countDocuments({ videoId: video._id, status: true });
            return {
                ...video,
                likes: likesCount,
                comments: commentsCount
            };
        }));

        response.status(200).json({
            status: true,
            message: "Videos fetched successfully",
            data: videosWithStats,
        });
    } catch (error) {
        response.status(500).json({
            status: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};
