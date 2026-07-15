const Product = require("../../models/Product.Schema");
const Like = require("../../models/Like.Schema");
const Comment = require("../../models/Comment.Schema");

exports.view = async (request, response) => {
    try {
        // Fetch all products and populate video details
        const products = await Product.find().populate("videoId").lean();

        // Add like and comment counts for each product's video
        const productsWithStats = await Promise.all(products.map(async (product) => {
            let likeCount = 0;
            let commentCount = 0;

            if (product.videoId && product.videoId._id) {
                // Get total likes for this video
                likeCount = await Like.countDocuments({ videoId: product.videoId._id, liked: true });
                
                // Get total comments for this video
                commentCount = await Comment.countDocuments({ videoId: product.videoId._id });
            }

            return {
                ...product,
                videoStats: {
                    totalLikes: likeCount,
                    totalComments: commentCount
                }
            };
        }));

        response.status(200).json({
            status: true,
            message: "Products fetched successfully with video stats",
            data: productsWithStats,
        });
    } catch (error) {
        response.status(500).json({
            status: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};
