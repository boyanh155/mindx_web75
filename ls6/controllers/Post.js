import { PostModel } from '../models/Post.js';

// CRUD POST

// Create

const createPost = async(req, res) => {
    const post = new PostModel({
        title: req.body.title,
        content: req.body.content,
    })
    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (error) {
        res.json({ message: error });
    }
}

// Read

const getPosts = async(req, res) => {
    try {
        const posts = await PostModel.find();
        res.json(posts);
    } catch (error) {
        res.json({ message: error });
    }
}

const getPost = async(req, res) => {
    try {
        const post = await PostModel.findById(req.params.postId);
        res.json(post);
    } catch (error) {
        res.json({ message: error });
    }
}

// Delete

const deletePost = async(req, res) => {

    try {
        const removedPost = await PostModel.remove({ _id: req.params.postId });
        res.json(removedPost);
    } catch (error) {
        res.json({ message: error });
    }
}

// Update


const updatePost = async(req, res) => {
    try {
        const updatedPost = await PostModel.updateOne({ _id: req.params.postId }, { $set: { title: req.body.title, content: req.body.content } });
        res.json(updatedPost);
    } catch (error) {
        res.json({ message: error });
    }
}

export {
    createPost,
    getPosts,
    getPost,
    deletePost,
    updatePost
}