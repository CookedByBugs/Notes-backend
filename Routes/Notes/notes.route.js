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
    // console.log(notes);
    res.json(notes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "something went wrong" });
  }
});

notesRouter.get("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    const singleNote = await Note.findById(id);
    if (!singleNote) return res.json({ msg: "Note not found" });
    console.log(singleNote);
    res.json(singleNote);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error", error });
  }
});

module.exports = notesRouter;
