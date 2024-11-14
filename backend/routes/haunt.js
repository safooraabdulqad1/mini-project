const express = require("express");
const router = express.Router();
const Haunt = require("../models/Haunt");
const verifyToken = require("../middleware/auth.js"); // Assuming you have an verifyToken middleware

router.post("/addhaunt", verifyToken, async (req, res) => {
  const { title, description, email, token } = req.body;

  try {
    const newHaunt = new Haunt({
      title,
      description,
      email,
    });

    const savedHaunt = await newHaunt.save();
    res.json(savedHaunt);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

router.get("/gethaunts", verifyToken, async (req, res) => {
  try {
    const haunts = await Haunt.find({ email: req.body.email });
    res.json(haunts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
