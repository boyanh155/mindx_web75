const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://loclh:1@cluster0.e7o8byz.mongodb.net/test');


// Middleware
app.use(express.json());
const db = mongoose.connection;
db.on('error', err => console.log(err));
db.once('open', function() {
    console.log("We're connected!");
});

// User Schema
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

// Post Schema
const PostSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});
// 
const SchoolSchema = new mongoose.Schema({
    name: String,
    authors: {
        type: [UserSchema],
    }
})

// Models
const User = mongoose.model('User', UserSchema);
const Post = mongoose.model('Post', PostSchema);
const School = mongoose.model('School', SchoolSchema)




// Routes
app.get('/users/:id', async(req, res) => {
    const users = await User.findById(req.params.id);
    res.json(users);
});
app.post('/schools', async(req, res) => {
    const created = await School.create(req.body)
    res.json(created)
})

app.post('/users', async(req, res) => {
    // validate email 
    const {
        email,
        name,
        password
    } = req.body
        //
    try {

        if (!password) throw {
                statusCode: 400,
                message: 'Missing password'
            }
            // validate email

        const newUser = new User(req.body);
        const savedUser = await newUser.save();

        res.json(savedUser);
    } catch (err) {
        res.status(err.statusCode || 500).send(err.message || 'Internal Server Error')
    }
});

app.get('/posts', async(req, res) => {
    const posts = await Post.find().populate('author');
    res.json(posts);
});

app.post('/posts', async(req, res) => {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.json(savedPost);
});

// Start the server
app.listen(3000, () => console.log('Server started on port 3000'));