const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");

// 회원가입
router.post("/", userController.createUser);

// 토큰 검증
// 이 토큰을 가지고 유저를 찾아서 유저 정보를 반환
router.get("/me", authController.authenticate, userController.getUser);

module.exports = router;
