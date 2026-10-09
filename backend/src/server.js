const express = require("express");
const cors = require("cors");
require("dotenv").config();

const resumeRoutes = require("./routes/resumeRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/resume", resumeRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AI Resume Skill Analyzer API is running",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    status: "healthy",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});