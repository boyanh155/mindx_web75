import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import routesFn from "./routes/index.js";

const app = express();

// Connect to MongoDB
mongoose.connect("mongodb+srv://loclh:1@cluster0.e7o8byz.mongodb.net/test");

// Middleware
app.use(express.json());
const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", function() {
    console.log("We're connected!");
});



//
//
//

// router
routesFn(app);

// app.use("/posts", postRouter);
// app.use("/users", postRouter);
// app.use("/school", postRouter);

// Start the server
app.listen(3000, () => console.log("Server started on port 3000"));