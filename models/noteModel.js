import db from "../config/db.js";

export const getAllNotes = async () => {
  const [rows] = await db.query("SELECT * FROM notes");
  return rows;
};

export const getNoteById = async (id) => {
  const [rows] = await db.query("SELECT * FROM notes WHERE id = ?", [id]);
  return rows[0];
};

export const saveNote = async (title, content) => {
  const [result] = await db.query(
    "INSERT INTO notes (title, content) VALUES (?, ?)",
    [title, content]
  );
  return result.insertId;
};
