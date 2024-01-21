// const createPost = async (req, res) => {
//     // validate email
//     const {
//         email,
//         name,
//         password
//     } = req.body;
//     //
//     try {
//         if (!password)
//             throw {
//                 statusCode: 400,
//                 message: "Missing password",
//             };
//         // validate email

//         const newUser = new User(req.body);
//         const savedUser = await newUser.save();

//         res.json(savedUser);
//     } catch (err) {
//         res
//             .status(err.statusCode || 500)
//             .send(err.message || "Internal Server Error");
//     }
// }


//   app.get("/posts", async (req, res) => {
//     // find({}) = findAll

//     const posts = await Post.find({
//       title: {
//         $sort: 1,
//       },
//     });
//     res.json(posts);
//   });

//   app.post("/posts", async (req, res) => {
//     const newPost = new Post(req.body);
//     newPost.updateOne({
//       $set: { title: "New Title" },
//     });
//     const savedPost = await newPost.save();
//     res.json(savedPost);
//   });

// /posts/:id 
// method PUT

// put, delete, findById
// business

// -> req.params.id
// -> find({id:{$eq:req.params.id}})
const updatePost = async(req, res) => {

}

export {
    updatePost
}