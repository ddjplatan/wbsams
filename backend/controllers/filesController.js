const fs = require("fs");
const path = require("path");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const Adoption = require("../models/Adoption");
const Pet = require("../models/Pet");
const Donation = require("../models/Donation");
const Volunteer = require("../models/Volunteer");
const SpayNeuterAppointment = require("../models/SpayNeuterAppointment");

const convertAdoption = async (req, res, next) => {
  try {
    const adoptions = await Adoption.find()
      .populate("adopter")
      .populate("adoptee");
    const currentDate = Date.now();
    const csvFilePath = path.join(
      __dirname,
      "..",
      "..",
      "files",
      `Adoptions-${currentDate}.csv`
    );

    const csvWriter = createCsvWriter({
      path: csvFilePath,
      header: [
        { id: "adopter", title: "Parent" },
        { id: "email", title: "Email" },
        { id: "phoneNumber", title: "Phone Number" },
        { id: "adoptee", title: "Pet" },
        { id: "species", title: "Species" },
        { id: "breed", title: "Breed" },
        { id: "reason", title: "Reason" },
        { id: "date", title: "Adoption Date" },
        { id: "parentJob", title: "Parent Job" },
        { id: "isApproved", title: "Is Approved" },
      ],
    });

    const records = adoptions.map((doc) => ({
      adopter: doc.adopter.firstName + " " + doc.adopter.lastName,
      email: doc.adopter.email,
      phoneNumber: doc.adopter.phoneNumber,
      adoptee: doc.adoptee.name,
      species: doc.adoptee.species,
      breed: doc.adoptee.breed,
      reason: doc.reason,
      date: doc.date,
      parentJob: doc.parentJob,
      isApproved: doc.isApproved,
    }));

    await csvWriter.writeRecords(records).then(() => {
      console.log("CSV file generated successfully");
      res.status(200).send("CSV file generated successfully");
    });
  } catch (error) {
    console.error("Error converting to CSV:", error);
    res.status(500).send("Internal Server Error");
  }
};

const convertPets = async (req, res, next) => {
  try {
    const pets = await Pet.find();
    const currentDate = Date.now();
    const csvFilePath = path.join(
      __dirname,
      "..",
      "..",
      "files",
      `Pet-${currentDate}.csv`
    );
    const csvWriter = createCsvWriter({
      path: csvFilePath,
      header: [
        { id: "name", title: "Pet Name" },
        { id: "age", title: "Age" },
        { id: "gender", title: "Gender" },
        { id: "breed", title: "Breed" },
        { id: "description", title: "Description" },
        { id: "species", title: "Species" },
      ],
    });

    const records = pets.map((doc) => ({
      name: doc.name,
      age: doc.age,
      gender: doc.gender,
      breed: doc.breed,
      description: doc.description,
      species: doc.species,
    }));

    await csvWriter.writeRecords(records).then(() => {
      res.status(200).send("CSV file generated successfully");
    });
  } catch (error) {
    console.error("Error converting to CSV:", error);
    res.status(500).send("Internal Server Error");
  }
};

const convertDonation = async (req, res, next) => {
  try {
    const donations = await Donation.find();
    const currentDate = Date.now();
    const csvFilePath = path.join(
      __dirname,
      "..",
      "..",
      "files",
      `Donations-${currentDate}.csv`
    );

    const csvWriter = createCsvWriter({
      path: csvFilePath,
      header: [
        { id: "donor", title: "Donor" },
        { id: "donationType", title: "Donation" },
        { id: "address", title: "Address" },
        { id: "remarks", title: "Remarks" },
        { id: "date", title: "Date" },
      ],
    });

    const records = donations.map((doc) => ({
      donor: doc.donor,
      donationType: doc.donationType,
      address: doc.address,
      remarks: doc.remarks,
      date: new Date(doc.date),
    }));

    await csvWriter.writeRecords(records).then(() => {
      console.log("CSV file generated successfully");
      res.status(200).send("CSV file generated successfully");
    });
  } catch (error) {
    console.error("Error converting to CSV:", error);
    res.status(500).send("Internal Server Error");
  }
};

const convertSpayAndNeuter = async (req, res, next) => {
  try {
    const appointments = await SpayNeuterAppointment.find().populate("owner");
    const currentDate = Date.now();
    const csvFilePath = path.join(
      __dirname,
      "..",
      "..",
      "files",
      `SpayAndNeuter-${currentDate}.csv`
    );

    const csvWriter = createCsvWriter({
      path: csvFilePath,
      header: [
        { id: "owner", title: "Owner" },
        { id: "phoneNumber", title: "Phone Number" },
        { id: "petName", title: "Pet" },
        { id: "species", title: "Species" },
        { id: "age", title: "Pet Age" },
        { id: "petGender", title: "Pet Gender" },
        { id: "isApproved", title: "Is Approved?" },
      ],
    });

    const records = appointments.map((doc) => ({
      owner: doc.owner.firstName + " " + doc.owner.lastName,
      phoneNumber: doc.owner.phoneNumber,
      petName: doc.petName,
      species: doc.petSpecies,
      age: doc.petAge,
      petGender: doc.petGender,
      isApproved: doc.isApproved,
    }));

    await csvWriter.writeRecords(records).then(() => {
      console.log("CSV file generated successfully");
      res.status(200).send("CSV file generated successfully");
    });
  } catch (error) {
    console.error("Error converting to CSV:", error);
    res.status(500).send("Internal Server Error");
  }
};

const convertVolunteer = async (req, res, next) => {
  try {
    const volunteers = await Volunteer.find();
    const currentDate = Date.now();
    const csvFilePath = path.join(
      __dirname,
      "..",
      "..",
      "files",
      `Volunteer-${currentDate}.csv`
    );

    const csvWriter = createCsvWriter({
      path: csvFilePath,
      header: [
        { id: "firstName", title: "First Name" },
        { id: "lastName", title: "Last Name" },
        { id: "email", title: "Email" },
        { id: "phoneNumber", title: "Phone Number" },
        { id: "address", title: "Address" },
        { id: "workExperience", title: "Work Experience" },
      ],
    });

    const records = volunteers.map((doc) => ({
      firstName: doc.firstName,
      lastName: doc.lastName,
      email: doc.email,
      phoneNumber: doc.phoneNumber,
      address: doc.address,
      workExperience: doc.workExperience,
    }));

    await csvWriter.writeRecords(records).then(() => {
      console.log("CSV file generated successfully");
      res.status(200).send("CSV file generated successfully");
    });
  } catch (error) {
    console.error("Error converting to CSV:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Function to convert documents to PDF
// function convertToPDF(documents, pdfFilePath) {
//   const doc = new PDFDocument();
//   const stream = fs.createWriteStream(pdfFilePath);

//   doc.pipe(stream);

//   documents.forEach((doc) => {
//     doc.checkups.forEach((checkup) => {
//       doc.text(`Checkup Date: ${checkup.date}`, { align: "left" });
//       doc.text(`Accompanied By: ${checkup.accompaniedBy}`, { align: "left" });
//       doc.text(`Remarks: ${checkup.remarks || "N/A"}`, { align: "left" });
//       doc.moveDown();
//     });

//     doc.moveDown();
//     doc.text("=====================================");
//     doc.moveDown();
//   });

//   doc.end();
// }

// convertAdoption();

// Usage example:
// Assuming you have an array of Adoption documents, you can call these functions like:
// const documents = await Adoption.find({}); // Fetch documents from MongoDB
// convertToCSV(documents, 'adoption.csv');
// convertToPDF(documents, 'adoption.pdf');

module.exports = {
  convertAdoption,
  convertPets,
  convertDonation,
  convertVolunteer,
  convertSpayAndNeuter,
};
