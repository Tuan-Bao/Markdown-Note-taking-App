import express from "express";
import bodyParser from "body-parser";
import errorHandler from "./middlewares/errorHandler.js";
import noteRouter from "./routes/noteRoutes.js";
import grammarRouter from "./routes/grammarRoutes.js";

const PORT = 3000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/notes", noteRouter);
app.use("/api/grammar", grammarRouter);

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
