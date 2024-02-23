import { UserModel } from "../models/User.js";

const login = async(req, res) => {
    // create jwt token
    // return token
    return res.status(200).send("Login successful");
}

const register = async(req, res) => {
    try {
        const user = await UserModel.findOne({
            email: req.body.email,
        });
        if (user) throw { status: 400, message: "User already exists" };

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new UserModel({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });

        await newUser.save();

        return res.status(200).send({
            message: "Register successful",
            success: true,
            data: newUser,
        });
    } catch (err) {
        return res.status(500).send({
            message: err,
            success: false,
        });
    }
}

export { login, register };