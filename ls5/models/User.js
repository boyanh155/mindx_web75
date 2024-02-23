import mongoose from 'mongoose';

const User = mongoose.Schema({
    name: String,
    age: Number,
    password: String,
    role: String,
    updateAt: { type: Date, default: Date.now },
    createAt: { type: Date, default: Date.now },
})



User.pre("save", function(err) {
    const modifiedFields = this.isModified("password");
    if (!modifiedFields) return next();
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(this.password, salt, (err, hashedPassword) => {
            if (err) return next(err);
            this.password = hashedPassword;
            next();
        })
    })
})

const UserModel = mongoose.model('User', User);

export {
    UserModel
}