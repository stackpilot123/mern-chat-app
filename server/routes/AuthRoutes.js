const express = require("express");
const {signup,login, getUserInfo, updateProfile, uploadProfilePic, removeProfilePic} = require("../controllers/AuthController");
const { verifyToken } = require("../middlewares/AuthMiddleware");
const upload = require("../config/multerConfig");
const router = express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.get("/user-info", verifyToken ,getUserInfo);
router.post("/update-profile",verifyToken,updateProfile);
router.post("/upload-profile-pic",verifyToken,upload.single("profilePic"),uploadProfilePic);
router.delete("/remove-profile-pic", verifyToken, removeProfilePic);

module.exports = router;

