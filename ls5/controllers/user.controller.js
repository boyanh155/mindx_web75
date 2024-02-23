// CRUD USER

import { UserModel } from "../models/User.js";


// register -> POST /register (body:{username, password}) -> !username(isExist) -> password(hash) -> save -> res(201)
// login -> POST /login (body:{username, password}) -> username(isExist) -> password(compare) -> res(200,access_token)

// CRUD /:endpoint (header:{Authorization: Bearer access_token})



// Create

const createUser = async(req, res) => {
    const { email, password, username } = req.body;
    const isExist = await UserModel.count({
        username
    })

    if (isExist) return res.status(400).send({ message: "Username is exist" })


    try {
        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const user = new UserModel({
            name: req.body.name,
            username,
            email: req.body.email,
            password: password,
        })

        const savedUser = await user.save();
        return res.json(savedUser);
    } catch (error) {
        return res.json({ message: error });
    }
}

// Read

const getUsers = async(req, res) => {

    try {
        const users = await UserModel.find();
        res.json(users);
    } catch (error) {
        res.json({ message: error });
    }
}

const getUser = async(req, res) => {
    try {
        const user = await UserModel.findById(req.params.userId);
        res.json(user);
    } catch (error) {
        res.json({ message: error });
    }
}

// Delete

const deleteUser = async(req, res) => {

        try {
            const removedUser = await UserModel.remove({ _id: req.params.userId });
            res.json(removedUser);
        } catch (error) {
            res.json({ message: error });
        }
    }
    // Update


const updateUser = async(req, res) => {

    try {
        const updatedUser = await UserModel.updateOne({ _id: req.params.userId }, { $set: { name: req.body.name, email: req.body.email, password: req.body.password } });
        res.json(updatedUser);
    } catch (error) {
        res.json({ message: error });
    }
}

export {
    createUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser
}