const express = require("express");
const notesRouter = express.Router();
const Note = require("../../models/Notes/notes.model");
const User = require("../../models/Auth/auth.model");
const verifyToken = require("../../middlewares/token/verifyToken");
notesRouter.post("/create", async (req, res) => {
  const { title, allowedUsers, access, content, createdBy } = req.body;
  const users = await User.find({ email: { $in: allowedUsers } });
  try {
    const note = await Note.create({
      title,
      content,
      createdBy,
      // createdBy: req.user._id,
      allowedUsers: users.map((u) => u._id),
      access: access || "Private",
    });
    res.status(200).json({ msg: "Note created successfully", note });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
});

notesRouter.get("/get", verifyToken, async (req, res) => {
  try {
    const notes = await Note.find({ createdBy: req.user.id });
    console.log(notes);
    res.json(notes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "something went wrong" });
  }
});

module.exports = notesRouter;
