import { getAllNotes, getNoteById, saveNote } from "../models/noteModel.js";
import renderMarkdown from "../services/markdownService.js";
import fs from "fs";
import path from "path";

export const getAllNotesController = async (req, res, next) => {
  try {
    const notes = await getAllNotes();
    res.json({ success: true, notes });
  } catch (error) {
    next(error);
  }
};

// Xử lý các ký tự escape phổ biến từ JSON
const unescapeJSONContent = (content) => {
  return content
    .replace(/\\n/g, "\n") // Xuống dòng
    .replace(/\\t/g, "\t") // Tab
    .replace(/\\r/g, "\r") // Carriage return
    .replace(/\\"/g, '"') // Dấu ngoặc kép
    .replace(/\\\\/g, "\\"); // Dấu gạch chéo ngược
};

export const getNoteByIdController = async (req, res, next) => {
  const { id } = req.params;
  try {
    const note = await getNoteById(id);
    if (!note) return res.json({ success: false, message: "Note not found" });

    // Xử lý các ký tự escape
    const cleanContent = unescapeJSONContent(note.content);

    const html = await renderMarkdown(cleanContent);
    return res.send(html);
  } catch (error) {
    next(error);
  }
};

export const saveNoteController = async (req, res, next) => {
  try {
    // Kiểm tra nếu không có file được upload
    if (!req.file) {
      return res.json({ success: false, message: "No file uploaded" });
    }

    // Đọc nội dung file đã upload
    const filePath = req.file.path;
    const content = fs.readFileSync(filePath, "utf8");

    // Lấy title từ tên file (không có phần mở rộng)
    const title = path.parse(req.file.originalname).name;

    // Lưu vào database
    const noteId = await saveNote(title, content);

    res.json({ success: true, note: { id: noteId, title, content } });
  } catch (error) {
    next(error);
  }
};
