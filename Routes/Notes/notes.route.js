const express = require("express");
const Note = require("../../models/Notes/notes.model");
const notesRouter = express.Router();
const User = require("../../models/Auth/auth.model");
notesRouter.post("/create", async (req, res) => {
  const { title, allowedUsers, access, content } = req.body;
  const users = await User.find({ email: { $in: allowedUsers } });
  try {
    const newNote = await Note.create({
      title,
      content,
      allowedUsers: users.map((u) => u._id),
      access: access || "Private",
    });
    // newNote.save();
    res.status(200).json({ msg: "Note created successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
});

module.exports = notesRouter;
