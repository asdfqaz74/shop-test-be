const authController = {};
const bcrypt = require("bcryptjs");
const User = require("../Models/User");

authController.loginWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "존재하지 않는 이메일입니다." });
    }
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ error: "이메일 혹은 비밀번호가 틀립니다." });
      } else {
        const token = await user.generateToken();
        return res.status(200).json({ status: "success", user, token });
      }
    }
    throw new Error("서버 오류");
  } catch (e) {
    res.status(400).json({ error: e });
  }
};

module.exports = authController;
