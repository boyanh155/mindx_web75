import { PostModel } from "../models/Post.js";

const isValidPostId = async (req, res, next) => {
  try {
    const postID = req.params.id || req.body.id;

    if (!postID) throw { status: 400, message: "Post ID is required" };

    const post = PostModel.find({
      _id: postID,
    });
    if (!post) throw { status: 404, message: "Post not found" };

    return next();
  } catch (err) {
    return res.status(500).send({
      message: err,
      success: false,
    });
  }
};

export { isValidPostId };
