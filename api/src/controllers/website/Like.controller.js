const Like = require("../../models/Like.Schema");
const Video = require("../../models/Video.schema");

exports.toggleLike = async (request, response) => {
    try {
        const { videoId } = request.body;
        // In a real scenario, you'd get the IP address from the request like this:
        // const ipAddress = request.headers['x-forwarded-for'] || request.socket.remoteAddress;
        // Or if the frontend sends a user ID, you'd use that instead.
        const ipAddress = request.body.ipAddress || request.ip; 

        if (!videoId) {
            return response.status(400).json({ status: false, message: "Video ID is required" });
        }

        // Check if like exists for this video and IP
        let like = await Like.findOne({ videoId, ipAddress });

        if (like) {
            // Toggle like status
            like.liked = !like.liked;
            await like.save();

            return response.status(200).json({
                status: true,
                message: like.liked ? "Video liked" : "Video unliked",
                data: like
            });
        } else {
            // Create new like
            const newLike = new Like({ videoId, ipAddress, liked: true });
            await newLike.save();

            return response.status(201).json({
                status: true,
                message: "Video liked",
                data: newLike
            });
        }

    } catch (error) {
        response.status(500).json({
            status: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};

exports.getLikesByVideo = async (request, response) => {
    try {
        const { videoId } = request.params;

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
