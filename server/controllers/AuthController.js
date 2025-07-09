const userModel = require("../models/UserModel");
const debug = require("debug")("development:auth");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcrypt");
const cloudinary = require("../config/cloudinary");

const maxAge = 2 * 24 * 60 * 60 * 1000; // 2 days (cookie will expire in 2 days)
const signup = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        if (!email || !username || !password) {
            return res.status(400).send("email , username and password are required");
        }
        const isUserEmail = await userModel.findOne({ email });
        if (isUserEmail) {
            return res.status(409).send("Email already exists. Please login");
        }

        const isUserUsername = await userModel.findOne({ username });
        if (isUserUsername) {
            return res.status(409).send("Username already taken. Please choose another.");
        }
        const user = await userModel.create({
            email, username, password
        });
        const token = generateToken(user);
        res.cookie("token", token, {
            maxAge,
            secure: true,
            sameSite: "None"
        });
        return res.status(201).json({
            user: {
                id: user._id,
                email: user.email,
                username: user.username,

            }
        })

    } catch (err) {
        debug("error in creating the user , sign up issue: ", err.message);
        console.error(err);
        res.status(500).send("Internal server error");
    }
}

const login = async (req, res) => {
    try {

        let { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send("Email and Password is required");
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send("Invalid Email or Password");
        }

        //password check
        bcrypt.compare(password, user.password, function (err, result) {
            console.log(result);
            if (!result) {
                return res.status(404).send("Invalid Email or Password");
            }
            const token = generateToken(user);
            res.cookie("token", token, {
                maxAge,
                secure: true,
                sameSite: "None"
            });
            return res.status(200).json({
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    profileSetup: user.profileSetup,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    image: user.image
                }
            });

        });
    } catch (err) {
        debug("error in login: ", err.message);
        return res.status(500).send("Internal server error");
    }

}

const getUserInfo = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.email });
        if (!user) {
            return res.status(404).send("Email not found!");
        }
        return res.status(200).json({
            user: {
                id: user._id,
                username: user.username,
                image: user.image,
                email: user.email,
                profileSetup: user.profileSetup,
                firstName: user.firstName,
                lastName: user.lastName

            }
        })
    } catch (err) {
        debug("error in get-user-info : ", err.message);
        return res.status(500).send("Internal server error");
    }
}

const updateProfile = async (req, res) => {
    try {
        const { firstName, lastName, id } = req.body;
        console.log(firstName, lastName, id);
        if (!firstName || !lastName) {
            return res.status(400).send("First name or Last name is required");
        }
        const user = await userModel.findOneAndUpdate({ _id: id }, { firstName: firstName, lastName: lastName, profileSetup: true }, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).send("User not found");
        }
        return res.status(200).json({
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                profileSetup: user.profileSetup,
                firstName: user.firstName,
                lastName: user.lastName,
                image: user.image
            }
        })

    } catch (err) {
        debug("Error in updating the profile: ", err);
        return res.status(500).send("Internal server error ");
    }



}

const uploadProfilePic = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send("File is required");
        }
        const user = await userModel.findOne({ email: req.email });

        if (user.imagePublicId && user.image) {
            await cloudinary.uploader.destroy(user.imagePublicId);
        }

        const fileStr = req.file.buffer.toString("base64");
        const dataUri = `data:${req.file.mimetype};base64,${fileStr}`;


        const result = await cloudinary.uploader.upload(
            dataUri,
            {
                folder: "chat-app-profile-pic"
            }
        );


        user.image = result.secure_url;
        user.imagePublicId = result.public_id;
        await user.save();

        return res.status(200).json({
            message: "uploaded successfully",
            user: {
                image: user.image,
                imagePublicId: user.imagePublicId
            }
        })

    } catch (err) {
        debug("error in uploading profile pic: ", err.message);
        return res.status(500).send("Internal server error ");
    }

}

const removeProfilePic = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.email });
        if (!user) {
            return res.status(404).send("User not found");
        }

        if (user.image && user.imagePublicId) {
            await cloudinary.uploader.destroy(user.imagePublicId);
        }

        user.image = null;
        user.imagePublicId = null;
        await user.save();
        return res.status(200).send("Profile pic removed");
    } catch (err) {
        debug("error in removing the profile pic: ", err.message);
        return res.status(500).send("Internal server error");
    }
}
module.exports = { signup, login, getUserInfo, updateProfile, uploadProfilePic, removeProfilePic };