const Video = require("../../models/Video.schema");

exports.create = async (request, response) => {
    try {
        if (request.file) {
            request.body.videoUrl = request.file.path;
        }

        if (request.body.duration && Number(request.body.duration) > 30) {
            return response.status(400).json({ status: false, message: "Maximum video duration can be 30 seconds" });
        }

        const newVideo = new Video(request.body);
        const result = await newVideo.save();

        response.status(201).json({
            status: true,
            message: "Video created successfully",
            data: result,
        });
    } catch (error) {
        response.status(500).json({
            status: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};

exports.view = async (request, response) => {
    try {
        const videos = await Video.find().sort({ createdAt: -1 });

        response.status(200).json({
            status: true,
            message: "Videos fetched successfully",
            data: videos,
        });
    } catch (error) {
        response.status(500).json({
            status: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};

exports.update = async (request, response) => {
    try {
        const id = request.params.id;

        if (request.file) {
            request.body.videoUrl = request.file.path;
        }

        if (request.body.duration && Number(request.body.duration) > 30) {
            return response.status(400).json({ status: false, message: "Maximum video duration can be 30 seconds" });
        }

        const updatedVideo = await Video.findByIdAndUpdate(
            id,
            { $set: request.body },
            { new: true }
        );

        if (!updatedVideo) {
            return response.status(404).json({
                status: false,
                message: "Video not found",
            });
        }

        response.status(200).json({
            status: true,
            message: "Video updated successfully",
            data: updatedVideo,
        });
    } catch (error) {
        response.status(500).json({
            status: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};

exports.delete = async (request, response) => {
    try {
        const id = request.params.id;
        const deletedVideo = await Video.findByIdAndDelete(id);

        if (!deletedVideo) {
            return response.status(404).json({
                status: false,
                message: "Video not found",
            });
        }

        response.status(200).json({
            status: true,
            message: "Video deleted successfully",
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
        
        const updatedVideo = await Video.findByIdAndUpdate(
            id,
            { status: status },
            { new: true }
        );

        if (!updatedVideo) {
            return response.status(404).json({
                status: false,
                message: "Video not found",
            });
        }

        response.status(200).json({
            status: true,
            message: "Video status updated successfully",
            data: updatedVideo,
        });
    } catch (error) {
        response.status(500).json({
            status: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};

exports.details = async (request, response) => {
    try {
        const { id } = request.body;
        const video = await Video.findById(id);

        if (!video) {
            return response.status(404).json({
                status: false,
                message: "Video not found",
            });
        }

        response.status(200).json({
            status: true,
            message: "Video details fetched successfully",
            data: video,
        });
    } catch (error) {
        response.status(500).json({
            status: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};

exports.uploadThumbnail = async (request, response) => {
    try {
        if (!request.file) {
            return response.status(400).json({ status: false, message: "No thumbnail file uploaded" });
        }

        response.status(200).json({
            status: true,
            message: "Thumbnail uploaded successfully",
            url: request.file.path,
        });
    } catch (error) {
        response.status(500).json({
            status: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};
