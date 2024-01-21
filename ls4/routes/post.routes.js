import express from "express";
import { updatePost } from "../controllers/post.controller";
import { isValidPostId } from "../middlewares/post.middleware";

// /
// :id
const postRouter = express.Router();

// /posts
/**
 * @route GET /posts/
 * @methods GET, PUT, POST, DELETE
 */

postRouter.route("/").get().put().post().delete();

/**
 * @route GET /posts/:Id
 * @methods GET, PUT, POST, DELETE
 */

postRouter
  .route("/:id")
  .all(isValidPostId)
  .get()
  .put(updatePost)
  .post()
  .delete();

export { postRouter };
