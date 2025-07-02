const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true
    },
    firstName: {
        type: String,
        required: [true, "Full Name is required"],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, "Full Name is required"],
        trim: true
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    profileSetup: {
        type: Boolean,
        default: false
    }
});

userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await hash(this.password,salt);
    next();
})

module.exports = mongoose.model("user",userSchema);