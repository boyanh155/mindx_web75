import express from "express";
import { createUser, deleteUser, getUser, getUsers, updateUser } from "../controllers/user.controller.js";


// /
// :id
const userRouter = express.Router();

// /posts
/**
 * @route GET /posts/
 * @methods GET, PUT, POST, DELETE
 */

userRouter.route("/")
    .get(
        getUsers
    )
    .post(
        createUser
    )

/**
 * @route GET /posts/:Id
 * @methods GET, PUT, POST, DELETE
 */
userRouter
    .route("/:id")
    .get(getUser)
    .put(
        updateUser
    )
    .delete(
        deleteUser
    )

export { userRouter };