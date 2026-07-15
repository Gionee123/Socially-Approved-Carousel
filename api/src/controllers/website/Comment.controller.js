const Comment = require("../../models/Comment.Schema");

exports.addComment = async (request, response) => {
    try {
        const { videoId, name, comment } = request.body;
        const ipAddress = request.body.ipAddress || request.ip; 

        if (!videoId || !name || !comment) {
            return response.status(400).json({ status: false, message: "Video ID, name, and comment are required" });
        }

        const newComment = new Comment({ videoId, name, comment, ipAddress });
        await newComment.save();

        return response.status(201).json({
            status: true,
            message: "Comment added successfully",
            data: newComment
        });

    } catch (error) {
        response.status(500).json({
            status: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};

exports.getCommentsByVideo = async (request, response) => {
    try {
        const { videoId } = request.body;
        // Website users should only see active (approved) comments
        const comments = await Comment.find({ videoId, status: true }).sort({ createdAt: -1 });

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

exports.updateComment = async (request, response) => {
    try {
        const id = request.params.id;
        const { comment } = request.body;

        if (!comment) {
            return response.status(400).json({ status: false, message: "Comment text is required" });
        }

        const updatedComment = await Comment.findByIdAndUpdate(
            id,
            { comment: comment },
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
            message: "Comment updated successfully",
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

exports.deleteComment = async (request, response) => {
    try {
        const id = request.params.id;
        const deletedComment = await Comment.findByIdAndDelete(id);

        if (!deletedComment) {
            return response.status(404).json({
                status: false,
                message: "Comment not found",
            });
        }

        response.status(200).json({
            status: true,
            message: "Comment deleted successfully",
        });
    } catch (error) {
        response.status(500).json({
            status: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};