const userModel = require("../models/UserModel");
const debug = require("debug");
const generateToken = require("../utils/generateToken");

const maxAge = 2 * 24 * 60 * 60 * 1000; // 2 days (cookie will expire in 2 days)

const signup = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        if(!email || !username || !password) {
            res.status(400).send("email , username and password are required");
        }
        const user = await userModel.create({
            email, username, password
        });
        const token = generateToken();
        res.cookie("token",token,{
            maxAge,
            secure: true,
            sameSite: "None"
        });
        return res.status(201).json({
            user:{
                id: user._id,
                email: user.email,
                username: user.username,

            }
        })

    } catch (err) {
        debug("error in creating the user , sign up issue: ", err.message);
        res.status(500).send("Internal server error");
    }
}

module.exports = signup;