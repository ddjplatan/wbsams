const fs = require("fs");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const Adoption = require("../models/Adoption");

const convertAdoption = async (req, res, next) => {
  try {
    const adoptions = await Adoption.find()
      .populate("adopter")
      .populate("adoptee");

    const csvFilePath = "adoption.csv";
    await convertToCSV(adoptions, csvFilePath);

    // Send the CSV file as a response
    res
      .status(200)
      .setHeader("Content-Disposition", "attachment; filename=adoption.csv")
      .setHeader("Content-Type", "text/csv")
      .download(csvFilePath, "adoption.csv", (err) => {
        if (err) {
          console.error("Error downloading CSV file:", err);
          res.status(500).send("Internal Server Error");
        } else {
          fs.unlinkSync(csvFilePath);
        }
      });
  } catch (error) {
    console.error("Error converting to CSV:", error);
    res.status(500).send("Internal Server Error");
  }
};

async function convertToCSV(documents, csvFilePath) {
  const csvWriter = createCsvWriter({
    path: csvFilePath,
    header: [
      { id: "adopter", title: "Parent" },
      { id: "email", title: "Email" },
      { id: "phoneNumber", title: "Phone Number" },
      { id: "adoptee", title: "Pet" },
      { id: "reason", title: "Reason" },
      { id: "date", title: "Adoption Date" },
      { id: "parentJob", title: "Parent Job" },
      { id: "isApproved", title: "Is Approved" },
    ],
  });

  const records = documents.map((doc) => ({
    adopter: doc.adopter.firstName + " " + doc.adopter.lastName,
    email: doc.adopter.email,
    phoneNumber: doc.adopter.phoneNumber,
    adoptee: doc.adoptee.name,
    reason: doc.reason,
    date: doc.date,
    parentJob: doc.parentJob,
    isApproved: doc.isApproved,
  }));

  await csvWriter.writeRecords(records);
}

// Function to convert documents to PDF
function convertToPDF(documents, pdfFilePath) {
  const doc = new PDFDocument();
  const stream = fs.createWriteStream(pdfFilePath);

  doc.pipe(stream);

  documents.forEach((doc) => {
    doc.checkups.forEach((checkup) => {
      doc.text(`Checkup Date: ${checkup.date}`, { align: "left" });
      doc.text(`Accompanied By: ${checkup.accompaniedBy}`, { align: "left" });
      doc.text(`Remarks: ${checkup.remarks || "N/A"}`, { align: "left" });
      doc.moveDown();
    });

    doc.moveDown();
    doc.text("=====================================");
    doc.moveDown();
  });

  doc.end();
}

// convertAdoption();

// Usage example:
// Assuming you have an array of Adoption documents, you can call these functions like:
// const documents = await Adoption.find({}); // Fetch documents from MongoDB
// convertToCSV(documents, 'adoption.csv');
// convertToPDF(documents, 'adoption.pdf');

module.exports = {
  convertAdoption,
};
