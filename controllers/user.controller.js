const User = require("../Models/User");
const bcrypt = require("bcryptjs");

const userController = {};

userController.createUser = async (req, res) => {
  try {
    // 비구조화 할당을 통해 email, password, name을 req.body에서 추출합니다.
    const { email, password, name, level } = req.body;
    console.log(req.body);

    // User 컬렉션에서 email이 일치하는 document를 찾습니다.
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "이미 존재하는 이메일입니다." });
    }
    console.log(req.body);

    // 비밀번호를 암호화합니다.
    const salt = await bcrypt.genSaltSync(10);
    const hasedPassword = await bcrypt.hashSync(password, salt);

    // User 컬렉션에 document를 생성합니다.
    const newUser = new User({
      email,
      password: hasedPassword,
      name,
      level: level ? level : "customer",
    });

    // document를 저장합니다.
    await newUser.save();

    return res
      .status(200)
      .json({ status: "success", message: "회원가입에 성공했습니다." });
  } catch (e) {
    res.status(400).json({ error: e });
  }
};

userController.getUser = async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ error: "유저를 찾을 수 없습니다." });
    }
    return res.status(200).json({ status: "success", user });
  } catch (e) {
    if (!res.headersSent) {
      res
        .status(500)
        .json({ status: "error", error: e.message || "서버 오류" });
    }
  }
};

module.exports = userController;
