const jwt = require("jsonwebtoken");
const generateToken = (user)=>{
    const {email, username} = user;
    return jwt.sign({email, username},process.env.JWT_KEY);
}
module.exports = generateToken;