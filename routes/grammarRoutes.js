import express from "express";
import checkGrammarController from "../controllers/grammarController.js";
import upload from "../middlewares/upload.js";

const router = express.Router();
router.post("/", upload.single("file"), checkGrammarController);

export default router;
