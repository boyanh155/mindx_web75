import mongoose from 'mongoose';

const Post = mongoose.Schema({
    title: String,
    content: String,
})

const PostModel = mongoose.model('Post', Post);

export {
    PostModel
}