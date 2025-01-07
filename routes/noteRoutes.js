import express from "express";
import {
  getAllNotesController,
  getNoteByIdController,
  saveNoteController,
} from "../controllers/notesController.js";
import upload from "../middlewares/upload.js";

const router = express.Router();
router.get("/", getAllNotesController);
router.get("/:id", getNoteByIdController);
router.post("/", upload.single("file"), saveNoteController);

export default router;
