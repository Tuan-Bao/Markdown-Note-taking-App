import checkGrammar from "../services/grammarCheckService.js";
import fs from "fs";

const checkGrammarController = async (req, res, next) => {
  try {
    const { language } = req.body;

    if (!req.file) {
      return res.json({ success: false, message: "No file uploaded" });
    }

    const filePath = req.file.path;
    const text = fs.readFileSync(filePath, "utf8");

    const grammarIssues = await checkGrammar(text, language || "en-US");
    res.json({ success: true, issues: grammarIssues });
  } catch (error) {
    next(error);
  }
};

export default checkGrammarController;
