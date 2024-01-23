import express from "express";
import { createPost, deletePost, getPost, getPosts, updatePost } from "../controllers/post.controller.js";
import { isValidPostId } from "../middlewares/post.middleware.js";

// /
// :id
const postRouter = express.Router();

// /posts
/**
 * @route GET /posts/
 * @methods GET, PUT, POST, DELETE
 */

postRouter.route("/")
    .get(
        getPosts
    )
    .post(
        createPost
    )

/**
 * @route GET /posts/:Id
 * @methods GET, PUT, POST, DELETE
 */
postRouter
    .route("/:id")
    .all(isValidPostId)
    .get(getPost)
    .put(
        updatePost
    )
    .delete(
        deletePost
    )

export { postRouter };