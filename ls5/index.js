import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import routesFn from "./routes/index.js";
import "dotenv/config"
import multer from "multer";
import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
import path from "path";
import { CloudinaryStorage } from "multer-storage-cloudinary";
const app = express();
const __dirname = path.resolve();
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
cloudinary.config({
    cloud_name: 'dn9g2qx0y',
    api_key: '871699447446464',
    api_secret: 'KEep8-APfgBDmw2JlHoNBKaNN9I'
});
// routesFn(app);

// buffer
// const storage = multer.memoryStorage();

// disk
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         // is exist folder
//         const _destination = path.resolve(__dirname, "imgs")
//             //
//         if (!fs.existsSync(_destination)) {
//             fs.mkdirSync(_destination);
//         }
//         return cb(null, _destination);

//     },
//     filename: (req, file, cb) => {
//         return cb(null, file.originalname);
//     }
// })
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'imgs',
        format: async(req, file) => 'png', // supports promises as well
        // public_id: (req, file) => 'computed-filename-using-request',
    },
})


const upload = multer({ storage: storage });
// 
app.use('/test', upload.single('file'), (req, res) => {
    // Truy cập dữ liệu tệp từ req.file
    const file = req.file;

    if (!file) {
        return res.status(400).json({ error: 'Không có tệp được tải lên.' });
    }
    console.log(file)


    res.json({ message: 'Tệp được tải lên thành công.', data: file });
})

// app.use("/posts", postRouter);
// app.use("/users", postRouter);
// app.use("/school", postRouter);

// Start the server
app.listen(3000, () => console.log(`Server started on port ${process.env.PORT}`));