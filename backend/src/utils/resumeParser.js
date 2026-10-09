const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");
const mammoth = require("mammoth");

async function extractTextFromResume(file) {
  const extension = file.originalname
    .toLowerCase()
    .split(".")
    .pop();

  if (extension === "pdf") {
    const loadingTask = pdfjsLib.getDocument({
      data: new Uint8Array(file.buffer),
      stopAtErrors: false,
    });

    const pdf = await loadingTask.promise;

    let fullText = "";

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
      const page = await pdf.getPage(pageNumber);
      const content = await page.getTextContent();

      const pageText = content.items
        .map((item) => item.str)
        .join(" ");

      fullText += pageText + "\n";
    }

    return fullText.trim();
  }

  if (extension === "docx") {
    const result = await mammoth.extractRawText({
      buffer: file.buffer,
    });

    return result.value.trim();
  }

  return "";
}

module.exports = {
  extractTextFromResume,
};