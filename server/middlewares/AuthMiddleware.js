const jwt = require("jsonwebtoken");

const verifyToken = async(req, res , next) =>{
    const token = req.cookies.token;
    if(!token) {
        return res.status(401).send("You are not authenticated");
    }
    
    jwt.verify(token, process.env.JWT_KEY, async(err,payload)=>{
        if(err) return res.status(403).send("Invalid token ");
        req.email = payload.email;
        next();
    })

}

module.exports = {verifyToken};