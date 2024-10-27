const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../Models/User");
require("dotenv").config();
const JWT_SECRET_KEY = `${process.env.JWT_SECRET_KEY}`;

const authController = {};

// 이메일로 로그인
authController.loginWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "존재하지 않는 이메일입니다." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ error: "이메일 혹은 비밀번호가 틀립니다." });
    }

    const token = await user.generateToken();
    return res.status(200).json({ status: "success", user, token });
  } catch (e) {
    res.status(500).json({ error: e.message || "서버 오류" });
  }
};

// 토큰 검증
authController.authenticate = async (req, res, next) => {
  try {
    const tokenString = req.headers.authorization;
    if (!tokenString) {
      return res.status(401).json({ error: "토큰이 없습니다." });
    }

    const token = tokenString.replace("Bearer ", "");
    jwt.verify(token, JWT_SECRET_KEY, (err, payload) => {
      if (err) {
        return res.status(401).json({ error: "토큰이 만료되었습니다." });
      }
      req.userId = payload._id;
    });
    next();
  } catch (e) {
    res.status(400).json({ status: "fail", error: e });
  }
};

// 관리자 권한 검증
authController.checkAdminPermission = async (req, res, next) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId);

    if (user.level !== "admin") {
      return res.status(403).json({ error: "관리자 권한이 없습니다." });
    }

    next();
  } catch (e) {
    res.status(400).json({ status: "fail", error: e });
  }
};

module.exports = authController;
