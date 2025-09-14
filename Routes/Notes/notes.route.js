const express = require("express");
const Note = require("../../models/Notes/notes.model");
const notesRouter = express.Router();
const User = require("../../models/Auth/auth.model");
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
    res.status(200).json({ msg: "Note created successfully", note});
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
});

module.exports = notesRouter;
