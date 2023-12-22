const fs = require("fs");
const path = require("path");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const puppeteer = require("puppeteer");
const pdfMakePrinter = require("pdfmake");
const { vfsFonts } = require("pdfmake/build/vfs_fonts");
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

const convertAdoptionToPdf = async (req, res, next) => {
  try {
    const adoptions = await Adoption.find()
      .populate("adopter")
      .populate("adoptee");
    const currentDate = Date.now();
    const pdfFilePath = path.join(
      __dirname,
      "..",
      "..",
      "files",
      `Adoptions-${currentDate}.pdf`
    );

    const htmlContent = generateHtmlForAdoptions(adoptions);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(htmlContent);
    await page.pdf({
      path: pdfFilePath,
      format: "A4",
      margin: { top: 20, right: 20, bottom: 20, left: 20 },
    });

    await browser.close();

    console.log("PDF file generated successfully");
    res.status(200).send("PDF file generated successfully");
  } catch (error) {
    console.error("Error converting to PDF:", error);
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

const convertDonationToPdf = async (req, res, next) => {
  try {
    const donations = await Donation.find();
    const currentDate = Date.now();
    const pdfFilePath = path.join(
      __dirname,
      "..",
      "..",
      "files",
      `Donations-${currentDate}.pdf`
    );

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Create an HTML string with your content
    const htmlContent = generateHtmlForDonations(donations);

    await page.setContent(htmlContent);
    await page.pdf({
      path: pdfFilePath,
      format: "A4",
      margin: { top: 20, right: 20, bottom: 20, left: 20 },
    });

    await browser.close();

    console.log("PDF file generated successfully");
    res.status(200).send("PDF file generated successfully");
  } catch (error) {
    console.error("Error converting to PDF:", error);
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

const convertSpayAndNeuterToPdf = async (req, res, next) => {
  try {
    const appointments = await SpayNeuterAppointment.find().populate("owner");
    const currentDate = Date.now();
    const pdfFilePath = path.join(
      __dirname,
      "..",
      "..",
      "files",
      `SpayAndNeuter-${currentDate}.pdf`
    );

    const htmlContent = generateHtmlForSpayAndNeuter(appointments);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(htmlContent);
    await page.pdf({
      path: pdfFilePath,
      format: "A4",
      margin: { top: 20, right: 20, bottom: 20, left: 20 },
    });

    await browser.close();

    console.log("PDF file generated successfully");
    res.status(200).send("PDF file generated successfully");
  } catch (error) {
    console.error("Error converting to PDF:", error);
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

const convertVolunteerToPdf = async (req, res, next) => {
  try {
    const volunteers = await Volunteer.find();
    const currentDate = Date.now();
    const pdfFilePath = path.join(
      __dirname,
      "..",
      "..",
      "files",
      `Volunteer-${currentDate}.pdf`
    );

    const htmlContent = generateHtmlForVolunteers(volunteers);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(htmlContent);
    await page.pdf({
      path: pdfFilePath,
      format: "A4",
      margin: { top: 20, right: 20, bottom: 20, left: 20 },
    });

    await browser.close();

    console.log("PDF file generated successfully");
    res.status(200).send("PDF file generated successfully");
  } catch (error) {
    console.error("Error converting to PDF:", error);
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

function generateHtmlForDonations(donations) {
  const formattedDonations = donations.map((donation) => ({
    donor: donation.donor,
    donationType: donation.donationType,
    address: donation.address,
    remarks: donation.remarks,
    date: new Date(donation.date).toLocaleDateString(),
  }));

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
          }
          header {
            background-color: #4CAF50;
            color: white;
            text-align: center;
            padding: 1em;
          }
          main {
            margin: 2em;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #4CAF50;
            color: white;
          }
        </style>
      </head>
      <body>
        <header>
          <h1>Donations Report</h1>
        </header>
        <main>
          <table>
            <thead>
              <tr>
                <th>Donor</th>
                <th>Donation Type</th>
                <th>Address</th>
                <th>Remarks</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              ${formattedDonations
                .map(
                  (donation) => `
                    <tr>
                      <td>${donation.donor}</td>
                      <td>${donation.donationType}</td>
                      <td>${donation.address}</td>
                      <td>${donation.remarks}</td>
                      <td>${donation.date}</td>
                    </tr>
                  `
                )
                .join("")}
            </tbody>
          </table>
        </main>
      </body>
    </html>
  `;

  return htmlContent;
}

function generateHtmlForAdoptions(adoptions) {
  const formattedAdoptions = adoptions.map((adoption) => ({
    adopter: `${adoption.adopter.firstName} ${adoption.adopter.lastName}`,
    email: adoption.adopter.email,
    phoneNumber: adoption.adopter.phoneNumber,
    adoptee: adoption.adoptee.name,
    species: adoption.adoptee.species,
    breed: adoption.adoptee.breed,
    reason: adoption.reason,
    date: new Date(adoption.date).toLocaleDateString(),
    parentJob: adoption.parentJob,
    isApproved: adoption.isApproved,
  }));

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
          }
          header {
            background-color: #4CAF50;
            color: white;
            text-align: center;
            padding: 1em;
          }
          main {
            margin: 2em;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #4CAF50;
            color: white;
          }
        </style>
      </head>
      <body>
        <header>
          <h1>Adoptions Report</h1>
        </header>
        <main>
          <table>
            <thead>
              <tr>
                <th>Parent</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Pet</th>
                <th>Species</th>
                <th>Breed</th>
                <th>Reason</th>
                <th>Adoption Date</th>
                <th>Parent Job</th>
                <th>Is Approved</th>
              </tr>
            </thead>
            <tbody>
              ${formattedAdoptions
                .map(
                  (adoption) => `
                    <tr>
                      <td>${adoption.adopter}</td>
                      <td>${adoption.email}</td>
                      <td>${adoption.phoneNumber}</td>
                      <td>${adoption.adoptee}</td>
                      <td>${adoption.species}</td>
                      <td>${adoption.breed}</td>
                      <td>${adoption.reason}</td>
                      <td>${adoption.date}</td>
                      <td>${adoption.parentJob}</td>
                      <td>${adoption.isApproved}</td>
                    </tr>
                  `
                )
                .join("")}
            </tbody>
          </table>
        </main>
      </body>
    </html>
  `;

  return htmlContent;
}

function generateHtmlForVolunteers(volunteers) {
  const formattedVolunteers = volunteers.map((volunteer) => ({
    firstName: volunteer.firstName,
    lastName: volunteer.lastName,
    email: volunteer.email,
    phoneNumber: volunteer.phoneNumber,
    address: volunteer.address,
    workExperience: volunteer.workExperience,
  }));

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
          }
          header {
            background-color: #4CAF50;
            color: white;
            text-align: center;
            padding: 1em;
          }
          main {
            margin: 2em;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #4CAF50;
            color: white;
          }
        </style>
      </head>
      <body>
        <header>
          <h1>Volunteers Report</h1>
        </header>
        <main>
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Work Experience</th>
              </tr>
            </thead>
            <tbody>
              ${formattedVolunteers
                .map(
                  (volunteer) => `
                    <tr>
                      <td>${volunteer.firstName}</td>
                      <td>${volunteer.lastName}</td>
                      <td>${volunteer.email}</td>
                      <td>${volunteer.phoneNumber}</td>
                      <td>${volunteer.address}</td>
                      <td>${volunteer.workExperience}</td>
                    </tr>
                  `
                )
                .join("")}
            </tbody>
          </table>
        </main>
      </body>
    </html>
  `;

  return htmlContent;
}

function generateHtmlForSpayAndNeuter(appointments) {
  const formattedAppointments = appointments.map((appointment) => ({
    owner: `${appointment.owner.firstName} ${appointment.owner.lastName}`,
    phoneNumber: appointment.owner.phoneNumber,
    petName: appointment.petName,
    species: appointment.petSpecies,
    age: appointment.petAge,
    petGender: appointment.petGender,
    isApproved: appointment.isApproved,
  }));

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
          }
          header {
            background-color: #4CAF50;
            color: white;
            text-align: center;
            padding: 1em;
          }
          main {
            margin: 2em;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #4CAF50;
            color: white;
          }
        </style>
      </head>
      <body>
        <header>
          <h1>Spay and Neuter Appointments Report</h1>
        </header>
        <main>
          <table>
            <thead>
              <tr>
                <th>Owner</th>
                <th>Phone Number</th>
                <th>Pet</th>
                <th>Species</th>
                <th>Pet Age</th>
                <th>Pet Gender</th>
                <th>Is Approved?</th>
              </tr>
            </thead>
            <tbody>
              ${formattedAppointments
                .map(
                  (appointment) => `
                    <tr>
                      <td>${appointment.owner}</td>
                      <td>${appointment.phoneNumber}</td>
                      <td>${appointment.petName}</td>
                      <td>${appointment.species}</td>
                      <td>${appointment.age}</td>
                      <td>${appointment.petGender}</td>
                      <td>${appointment.isApproved}</td>
                    </tr>
                  `
                )
                .join("")}
            </tbody>
          </table>
        </main>
      </body>
    </html>
  `;

  return htmlContent;
}

module.exports = {
  convertAdoption,
  convertPets,
  convertDonation,
  convertVolunteer,
  convertSpayAndNeuter,
  convertAdoptionToPdf,
  convertDonationToPdf,
  convertVolunteerToPdf,
  convertSpayAndNeuterToPdf,
};
