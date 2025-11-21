const express = require("express");
const cors = require("cors");
const multer = require("multer");

const Routes = require("./routes/Routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/claims", Routes);

// File upload setup
const upload = multer({ dest: "uploads/" });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.json({ message: "File uploaded successfully", file: req.file });
});

app.listen(5000, () => console.log("Backend running on port 5000"));
