import express from"express";
import mongoose from "mongoose";
import bodyParser from"body-parser";
import {postRouter}  from"./routes/post.routes.js";

const app = express();

// Connect to MongoDB
mongoose.connect("mongodb+srv://loclh:1@cluster0.e7o8byz.mongodb.net/test");

// Middleware
app.use(express.json());
const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", function () {
  console.log("We're connected!");
});

// User Schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

// Post Schema
// const PostSchema = new mongoose.Schema({
//   title: String,
//   content: String,
//   author: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//   },
// });
// //
const SchoolSchema = new mongoose.Schema({
  name: String,
  authors: {
    type: [UserSchema],
  },
});

// Models
const User = mongoose.model("User", UserSchema);
// const Post = mongoose.model("Post", PostSchema);
const School = mongoose.model("School", SchoolSchema);

// Routes

app.post("/schools", async (req, res) => {
  const created = await School.create(req.body);
  res.json(created);
});

app.get("/users/:id", async (req, res) => {
  const users = await User.findById(req.params.id);
  res.json(users);
});

//
//
//

app.use("/posts", postRouter);
app.use("/users", postRouter);
app.use("/school", postRouter);

// Start the server
app.listen(3000, () => console.log("Server started on port 3000"));

