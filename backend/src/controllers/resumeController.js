const { extractTextFromResume } = require("../utils/resumeParser");

const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF or DOCX resume.",
      });
    }

    const extractedText = await extractTextFromResume(req.file);

    if (!extractedText) {
      return res.status(400).json({
        success: false,
        message: "Could not extract text from the uploaded resume.",
      });
    }

    res.json({
      success: true,
      filename: req.file.originalname,
      fileType: req.file.mimetype,
      textLength: extractedText.length,
      extractedText,
    });
  } catch (error) {
    console.error("Resume processing error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to process resume.",
      error: error.message,
    });
  }
};

module.exports = {
  uploadResume,
};