const jwt = require("jsonwebtoken");
const User = require("../models/User");

const createToken = (_id) => {
  return jwt.sign({ _id }, "process.env.SECRET", { expiresIn: "3d" });
};

// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ userEmail: req.body.email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup a user
const signupUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.signup(username, email, password);
    user.save();
    // create a token
    const token = createToken(user._id);

    res.status(200).json({ username, userEmail: req.body.email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const profileUser = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    res.status(200).json({ username: user.username, userEmail: user.email });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser, profileUser };
