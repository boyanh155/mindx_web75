// CRUD USER

import { UserModel } from "../models/User.js";

// Create

const createUser = async(req, res) => {
    const user = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    })
    try {
        const savedUser = await user.save();
        res.json(savedUser);
    } catch (error) {
        res.json({ message: error });
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