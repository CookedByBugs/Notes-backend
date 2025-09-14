const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    allowedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    access: {
      type: String,
      enum: ["Public", "Private"],
      default: "Private",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", notesSchema);

module.exports = Note;
