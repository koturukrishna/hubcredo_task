const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotEnv = require("dotenv");
dotEnv.config();

// SIGNUP API Controller
const JWT_SECRET = process.env.JWT_SECRET;
const createUser = async (req, res) => {
  try {
    const { username, email, password, address, contact } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "Email already exists" });

    if (!password || password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      address,
      contact,
    });
    await newUser.save();
    res.status(201).json({
      status: "signup success",
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Login API Controller

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log(token);

    res.status(200).json({
      status: "login sucess",
      token,
      userData: {
        name: user.username,
        email: user.email,
        address: user.address,
        contact: user.contact,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { createUser, userLogin };
