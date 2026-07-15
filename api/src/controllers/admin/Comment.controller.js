const Comment = require("../../models/Comment.Schema");

exports.getCommentsByVideo = async (request, response) => {
    try {
        const { videoId } = request.body;
        const comments = await Comment.find({ videoId }).sort({ createdAt: -1 });

        response.status(200).json({
            status: true,
            message: "Comments fetched successfully",
            count: comments.length,
            data: comments
        });
    } catch (error) {
        response.status(500).json({
            status: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};

exports.statusChange = async (request, response) => {
    try {
        const { id, status } = request.body;
        
        const updatedComment = await Comment.findByIdAndUpdate(
            id,
            { status: status },
            { new: true }
        );

        if (!updatedComment) {
            return response.status(404).json({
                status: false,
                message: "Comment not found",
            });
        }

        response.status(200).json({
            status: true,
            message: "Comment status updated successfully",
            data: updatedComment,
        });
    } catch (error) {
        response.status(500).json({
            status: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};

exports.getAllComments = async (request, response) => {
    try {
        const comments = await Comment.find()
            .populate('videoId', 'title videoUrl thumbnail')
            .sort({ createdAt: -1 });

        response.status(200).json({
            status: true,
            message: "All comments fetched successfully",
            count: comments.length,
            data: comments
        });
    } catch (error) {
        response.status(500).json({
            status: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};