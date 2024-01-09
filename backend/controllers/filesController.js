const fs = require("fs");
const path = require("path");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const puppeteer = require("puppeteer");
const PDFDocument = require("pdfkit");
const Adoption = require("../models/Adoption");
const Pet = require("../models/Pet");
const Donation = require("../models/Donation");
const Volunteer = require("../models/Volunteer");
const SpayNeuterAppointment = require("../models/SpayNeuterAppointment");
const SpayNeuterInstance = require("../models/SpayNeuterInstance");

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
      res.download(csvFilePath, `Adoptions-${currentDate}.csv`, (err) => {
        if (err) {
          console.error("Error sending CSV:", err);
          res.status(500).send("Internal Server Error");
        } else {
          // Optionally, you can delete the generated CSV file after it's sent
          fs.unlink(csvFilePath, (unlinkErr) => {
            if (unlinkErr) {
              console.error("Error deleting CSV file:", unlinkErr);
            } else {
              console.log("CSV file deleted successfully");
            }
          });
        }
      });
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

    res.download(pdfFilePath, `Adoptions-${currentDate}.pdf`, (err) => {
      if (err) {
        console.error("Error sending PDF:", err);
        res.status(500).send("Internal Server Error");
      } else {
        fs.unlink(pdfFilePath, (unlinkErr) => {
          if (unlinkErr) {
            console.error("Error deleting PDF file:", unlinkErr);
          } else {
            console.log("PDF file deleted successfully");
          }
        });
      }
    });
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
      res.download(csvFilePath, `Pets-${currentDate}.csv`, (err) => {
        if (err) {
          console.error("Error sending CSV:", err);
          res.status(500).send("Internal Server Error");
        } else {
          // Optionally, you can delete the generated CSV file after it's sent
          fs.unlink(csvFilePath, (unlinkErr) => {
            if (unlinkErr) {
              console.error("Error deleting CSV file:", unlinkErr);
            } else {
              console.log("CSV file deleted successfully");
            }
          });
        }
      });
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
      res.download(csvFilePath, `Donations-${currentDate}.csv`, (err) => {
        if (err) {
          console.error("Error sending CSV:", err);
          res.status(500).send("Internal Server Error");
        } else {
          // Optionally, you can delete the generated CSV file after it's sent
          fs.unlink(csvFilePath, (unlinkErr) => {
            if (unlinkErr) {
              console.error("Error deleting CSV file:", unlinkErr);
            } else {
              console.log("CSV file deleted successfully");
            }
          });
        }
      });
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

    res.download(pdfFilePath, `Donations-${currentDate}.pdf`, (err) => {
      if (err) {
        console.error("Error sending PDF:", err);
        res.status(500).send("Internal Server Error");
      } else {
        fs.unlink(pdfFilePath, (unlinkErr) => {
          if (unlinkErr) {
            console.error("Error deleting PDF file:", unlinkErr);
          } else {
            console.log("PDF file deleted successfully");
          }
        });
      }
    });
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
      res.download(csvFilePath, `SpayAndNeuter-${currentDate}.csv`, (err) => {
        if (err) {
          console.error("Error sending CSV:", err);
          res.status(500).send("Internal Server Error");
        } else {
          // Optionally, you can delete the generated CSV file after it's sent
          fs.unlink(csvFilePath, (unlinkErr) => {
            if (unlinkErr) {
              console.error("Error deleting CSV file:", unlinkErr);
            } else {
              console.log("CSV file deleted successfully");
            }
          });
        }
      });
    });
  } catch (error) {
    console.error("Error converting to CSV:", error);
    res.status(500).send("Internal Server Error");
  }
};

const convertSpayAndNeuterInstance = async (req, res, next) => {
  try {
    const { instanceId } = req.params;
    const instance = await SpayNeuterInstance.findById(instanceId).populate({
      path: "registered",
      populate: {
        path: "owner",
        model: "User",
      },
    });
    const currentDate = Date.now();
    const csvFilePath = path.join(
      __dirname,
      "..",
      "..",
      "files",
      `SpayNeuterInstance-${currentDate}.csv`
    );

    const csvWriter = createCsvWriter({
      path: csvFilePath,
      header: [
        { id: "location", title: "Location" },
        { id: "slots", title: "slots" },
        { id: "schedule", title: "Schedule" },
        { id: "owner", title: "Owner" },
        { id: "petName", title: "Pet Name" },
        { id: "petSpecies", title: "Pet Species" },
        { id: "petBreed", title: "Pet Breed" },
        { id: "petGender", title: "Pet Gender" },
        { id: "petDescription", title: "Pet Description" },
      ],
    });

    const records = instance.registered.map((pet) => ({
      location: instance.location,
      slots: instance.slots,
      owner: pet.owner.firstName + " " + pet.owner.lastName,
      petName: pet.petName,
      petSpecies: pet.petSpecies,
      petAge: pet.petAge,
      petBreed: pet.petBreed,
      petGender: pet.petGender,
      petDescription: pet.petDescription,
      schedule: instance.schedule,
    }));

    await csvWriter.writeRecords(records).then(() => {
      res.download(
        csvFilePath,
        `SpayNeuterInstance-${currentDate}.csv`,
        (err) => {
          if (err) {
            console.error("Error sending CSV:", err);
            res.status(500).send("Internal Server Error");
          } else {
            // Optionally, you can delete the generated CSV file after it's sent
            fs.unlink(csvFilePath, (unlinkErr) => {
              if (unlinkErr) {
                console.error("Error deleting CSV file:", unlinkErr);
              } else {
                console.log("CSV file deleted successfully");
              }
            });
          }
        }
      );
    });
  } catch (error) {
    console.error("Error converting to CSV:", error);
    res.status(500).send("Internal Server Error");
  }
};

const generateSpayNeuterInstanceReport = async (instance) => {
  const currentDate = Date.now();
  const htmlContent = generateHtmlContentForInstance(instance); // Create a function to generate HTML content based on your data

  const pdfFilePath = path.join(
    __dirname,
    "..",
    "..",
    "files",
    `SpayNeuterInstance-${instance._id}-${currentDate}.pdf`
  );

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(htmlContent);
  await page.pdf({
    path: pdfFilePath,
    format: "A4",
    margin: { top: 20, right: 20, bottom: 20, left: 20 },
  });

  await browser.close();

  res.download(pdfFilePath, `SpayNeuterInstance-${currentDate}.pdf`, (err) => {
    if (err) {
      console.error("Error sending PDF:", err);
      res.status(500).send("Internal Server Error");
    } else {
      fs.unlink(pdfFilePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error("Error deleting PDF file:", unlinkErr);
        } else {
          console.log("PDF file deleted successfully");
        }
      });
    }
  });
};

// const generateSpayNeuterInstancePdf = async (instance) => {
//   const currentDate = Date.now();
//   const pdfFilePath = path.join(
//     __dirname,
//     "..",
//     "..",
//     "files",
//     `SpayNeuterInstance-${currentDate}.pdf`
//   );

//   const doc = new PDFDocument();
//   const stream = fs.createWriteStream(pdfFilePath);

//   doc.pipe(stream);

//   // Header
//   doc.fontSize(18).text("Spay/Neuter Instance Report", { align: "center" });
//   doc.moveDown();

//   // Instance Info
//   doc.fontSize(14).text(`Location: ${instance.location}`);
//   doc.fontSize(14).text(`Slots: ${instance.slots}`);
//   doc.fontSize(14).text(`Schedule: ${instance.schedule}`);
//   doc.moveDown();

//   // Registered Pets Table
//   doc.fontSize(14).text("Registered Pets:", { underline: true });
//   doc.moveDown().fontSize(12);

//   instance.registered.forEach((pet, index) => {
//     doc.text(`- Owner: ${pet.owner.firstName} ${pet.owner.lastName}`);
//     doc.text(`- Pet Name: ${pet.petName}`);
//     doc.text(`- Species: ${pet.petSpecies}`);
//     doc.text(`- Breed: ${pet.petBreed}`);
//     doc.text(`- Gender: ${pet.petGender}`);
//     doc.text(`- Description: ${pet.petDescription}`);
//     doc.moveDown();
//   });

//   doc.end();

//   return pdfFilePath;
// };

// Usage in your route/controller
const convertSpayNeuterInstanceToPdf = async (req, res, next) => {
  try {
    const { instanceId } = req.params;
    const instance = await SpayNeuterInstance.findById(instanceId).populate({
      path: "registered",
      populate: {
        path: "owner",
        model: "User",
      },
    });
    const currentDate = Date.now();
    const pdfFilePath = path.join(
      __dirname,
      "..",
      "..",
      "files",
      `SpayNeuterInstance-${currentDate}.pdf`
    );

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Create an HTML string with your content
    const htmlContent = await generateHtmlContentForInstance(instance);

    await page.setContent(htmlContent);
    await page.pdf({
      path: pdfFilePath,
      format: "A4",
      margin: { top: 20, right: 20, bottom: 20, left: 20 },
    });

    await browser.close();

    res.download(
      pdfFilePath,
      `SpayNeuterInstance-${currentDate}.pdf`,
      (err) => {
        if (err) {
          console.error("Error sending PDF:", err);
          res.status(500).send("Internal Server Error");
        } else {
          fs.unlink(pdfFilePath, (unlinkErr) => {
            if (unlinkErr) {
              console.error("Error deleting PDF file:", unlinkErr);
            } else {
              console.log("PDF file deleted successfully");
            }
          });
        }
      }
    );
  } catch (error) {
    console.error("Error converting to PDF:", error);
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

    res.download(pdfFilePath, `SpayAndNeuter-${currentDate}.pdf`, (err) => {
      if (err) {
        console.error("Error sending PDF:", err);
        res.status(500).send("Internal Server Error");
      } else {
        fs.unlink(pdfFilePath, (unlinkErr) => {
          if (unlinkErr) {
            console.error("Error deleting PDF file:", unlinkErr);
          } else {
            console.log("PDF file deleted successfully");
          }
        });
      }
    });
  } catch (error) {
    console.error("Error converting to PDF:", error);
    res.status(500).send("Internal Server Error");
  }
};

// const convertSpayNeuterInstanceToPdf = async (req, res, next) => {
//   const { instanceId } = req.params;
//   try {
// const instance = await SpayNeuterInstance.findById(instanceId).populate({
//   path: "registered",
//   populate: {
//     path: "owner",
//     model: "User",
//   },
// });

//     const currentDate = Date.now();
//     const pdfFilePath = path.join(
//       __dirname,
//       "..",
//       "..",
//       "files",
//       `SpayNeuterInstance-${instanceId}-${currentDate}.pdf`
//     );

//     const doc = new PDFDocument();
//     const stream = fs.createWriteStream(pdfFilePath);

//     doc.pipe(stream);

//     // Header
//     doc.fontSize(18).text("Spay/Neuter Instance Report", { align: "center" });
//     doc.moveDown();

//     // Instance Info
//     doc.fontSize(14).text(`Location: ${instance.location}`);
//     doc.fontSize(14).text(`Slots: ${instance.slots}`);
//     doc.fontSize(14).text(`Details: ${instance.details}`);
//     doc.fontSize(14).text(`Schedule: ${instance.schedule}`);
//     doc.moveDown();

//     // Registered Pets Table
//     doc.fontSize(14).text("Registered Pets:", { underline: true });
//     doc.moveDown().fontSize(12);

//     if (instance.registered && instance.registered.length > 0) {
//       instance.registered.forEach((pet, index) => {
//         doc.text(`Pet ${index + 1}:`);
//         doc.text(`- Owner: ${pet.owner.firstName} ${pet.owner.lastName}`);
//         doc.text(`- Pet Name: ${pet.petName}`);
//         doc.text(`- Species: ${pet.petSpecies}`);
//         doc.text(`- Breed: ${pet.petBreed}`);
//         doc.text(`- Gender: ${pet.petGender}`);
//         doc.text(`- Description: ${pet.petDescription}`);
//         doc.text(`- Approved: ${pet.isApproved ? "Yes" : "No"}`);
//         doc.text(
//           `- Date Registered: ${new Date(pet.createdAt).toLocaleString()}`
//         );
//         doc.moveDown();
//       });
//     } else {
//       doc.text("No registered pets found.");
//     }

//     doc.end();

//     res.download(
//       pdfFilePath,
//       `SpayNeuterInstance-${currentDate}.pdf`,
//       (err) => {
//         if (err) {
//           console.error("Error sending PDF:", err);
//           res.status(500).send("Internal Server Error");
//         } else {
//           fs.unlink(pdfFilePath, (unlinkErr) => {
//             if (unlinkErr) {
//               console.error("Error deleting PDF file:", unlinkErr);
//             } else {
//               console.log("PDF file deleted successfully");
//             }
//           });
//         }
//       }
//     );

//     // res.download(pdfFilePath, `Checkups-${currentDate}.pdf`, (err) => {
//     //   if (err) {
//     //     console.error("Error sending PDF:", err);
//     //     res.status(500).send("Internal Server Error");
//     //   } else {
//     //     fs.unlink(pdfFilePath, (unlinkErr) => {
//     //       if (unlinkErr) {
//     //         console.error("Error deleting PDF file:", unlinkErr);
//     //       } else {
//     //         console.log("PDF file deleted successfully");
//     //       }
//     //     });
//     //   }
//     // });
//   } catch (error) {
//     console.error("Error generating PDF file:", error.message);
//     throw error; // Rethrow the error to be handled by the calling code
//   }
// };

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
      res.download(csvFilePath, `Volunteers-${currentDate}.csv`, (err) => {
        if (err) {
          console.error("Error sending CSV:", err);
          res.status(500).send("Internal Server Error");
        } else {
          // Optionally, you can delete the generated CSV file after it's sent
          fs.unlink(csvFilePath, (unlinkErr) => {
            if (unlinkErr) {
              console.error("Error deleting CSV file:", unlinkErr);
            } else {
              console.log("CSV file deleted successfully");
            }
          });
        }
      });
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

    res.download(pdfFilePath, `Volunteer-${currentDate}.pdf`, (err) => {
      if (err) {
        console.error("Error sending PDF:", err);
        res.status(500).send("Internal Server Error");
      } else {
        fs.unlink(pdfFilePath, (unlinkErr) => {
          if (unlinkErr) {
            console.error("Error deleting PDF file:", unlinkErr);
          } else {
            console.log("PDF file deleted successfully");
          }
        });
      }
    });
  } catch (error) {
    console.error("Error converting to PDF:", error);
    res.status(500).send("Internal Server Error");
  }
};

const convertCheckupsToCsv = async (req, res, next) => {
  const { adoptionId } = req.params;

  try {
    const adoption = await Adoption.findById(adoptionId)
      .populate("checkups")
      .populate("adopter")
      .populate("adoptee");

    if (!adoption) {
      throw new Error("Adoption not found");
    }

    const currentDate = Date.now();
    const csvFilePath = path.join(
      __dirname,
      "..",
      "..",
      "files",
      `Checkups-${adoptionId}-${currentDate}.csv`
    );

    const csvWriter = createCsvWriter({
      path: csvFilePath,
      header: [
        { id: "adopterEmail", title: "Adopter Email" },
        { id: "adopterFullName", title: "Adopter Name" },
        { id: "adopterPhoneNumber", title: "Adopter Phone Number" },
        { id: "petName", title: "Pet Name" },
        { id: "petSpecies", title: "Pet Species" },
        { id: "petBreed", title: "Pet Breed" },
        { id: "petGender", title: "Pet Gender" },
        { id: "checkupDate", title: "Checkup Date" },
        { id: "accompaniedBy", title: "Accompanied By" },
        { id: "remarks", title: "Remarks" },
      ],
    });

    const records = adoption.checkups.map((checkup) => ({
      adopterEmail: adoption.adopter.email,
      adopterFullName: `${adoption.adopter.firstName} ${adoption.adopter.lastName}`,
      adopterPhoneNumber: adoption.adopter.phoneNumber,
      petName: adoption.adoptee.name,
      petSpecies: adoption.adoptee.species,
      petBreed: adoption.adoptee.breed,
      petGender: adoption.adoptee.gender,
      checkupDate: checkup.date,
      accompaniedBy: checkup.accompaniedBy,
      remarks: checkup.remarks,
    }));

    await csvWriter.writeRecords(records).then(() => {
      res.download(csvFilePath, `Checkups-${currentDate}.csv`, (err) => {
        if (err) {
          console.error("Error sending CSV:", err);
          res.status(500).send("Internal Server Error");
        } else {
          // Optionally, you can delete the generated CSV file after it's sent
          fs.unlink(csvFilePath, (unlinkErr) => {
            if (unlinkErr) {
              console.error("Error deleting CSV file:", unlinkErr);
            } else {
              console.log("CSV file deleted successfully");
            }
          });
        }
      });
    });
  } catch (error) {
    console.error("Error generating CSV file:", error);
    throw error; // Rethrow the error to be handled by the calling code
  }
};

const convertCheckupsToPdf = async (req, res, next) => {
  const { adoptionId } = req.params;
  try {
    const adoption = await Adoption.findById(adoptionId)
      .populate("adopter")
      .populate("adoptee")
      .populate("checkups");

    if (!adoption) {
      throw new Error("Adoption not found");
    }

    const currentDate = Date.now();
    const pdfFilePath = path.join(
      __dirname,
      "..",
      "..",
      "files",
      `Checkups-${adoptionId}-${currentDate}.pdf`
    );

    const doc = new PDFDocument();
    const stream = fs.createWriteStream(pdfFilePath);

    doc.pipe(stream);

    // Header
    doc.fontSize(18).text("Checkups Report", { align: "center" });
    doc.moveDown();

    // Adopter Info (Avoid repetition)
    const adopterInfo = `${adoption.adopter.firstName} ${adoption.adopter.lastName} (${adoption.adopter.email}, ${adoption.adopter.phoneNumber})`;
    doc.fontSize(14).text("Adopter Information:", { underline: true });
    doc.fontSize(12).text(adopterInfo);

    // Adoptee Info (Avoid repetition)
    const adopteeInfo = `${adoption.adoptee.name} (${adoption.adoptee.species}, ${adoption.adoptee.breed}, ${adoption.adoptee.gender})`;
    doc
      .moveDown()
      .fontSize(14)
      .text("Adoptee Information:", { underline: true });
    doc.fontSize(12).text(adopteeInfo);

    // Checkup Table
    doc.moveDown().fontSize(14).text("Checkups:", { underline: true });
    doc.moveDown().fontSize(12);

    adoption.checkups.forEach((checkup, index) => {
      doc.text(`Checkup ${index + 1}:`);
      doc.text(`- Accompanied By: ${checkup.accompaniedBy}`);
      doc.text(`- Remarks: ${checkup.remarks}`);
      doc.text(`- Date: ${new Date(checkup.date).toLocaleString()}`);
      doc.moveDown();
    });

    doc.end();

    res.download(pdfFilePath, `Checkups-${currentDate}.pdf`, (err) => {
      if (err) {
        console.error("Error sending PDF:", err);
        res.status(500).send("Internal Server Error");
      } else {
        fs.unlink(pdfFilePath, (unlinkErr) => {
          if (unlinkErr) {
            console.error("Error deleting PDF file:", unlinkErr);
          } else {
            console.log("PDF file deleted successfully");
          }
        });
      }
    });
  } catch (error) {
    console.error("Error generating PDF file:", error.message);
    throw error; // Rethrow the error to be handled by the calling code
  }
};

const generateHtmlContentForInstance = async (instance) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Spay/Neuter Report</title>
      <style>
        /* Add your custom styles here */
        body {
          font-family: Arial, sans-serif;
        }
        .header {
          text-align: center;
          font-size: 18px;
          margin-bottom: 20px;
        }
        .info-section {
          margin-bottom: 20px;
        }
        .registered-section {
          margin-bottom: 20px;
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
          background-color: #f2f2f2;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Spay/Neuter Report</h1>
      </div>
      <div class="info-section">
        <h2>Location:</h2>
        <p>${instance.location}</p>
      </div>
      <div class="info-section">
        <h2>Slots:</h2>
        <p>${instance.slots}</p>
      </div>
      <div class="info-section">
        <h2>Schedule:</h2>
        <p>${instance.schedule}</p>
      </div>
      <div class="registered-section">
        <h2>Registered Pets:</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Breed</th>
              <th>Species</th>
              <th>Gender</th>
              <th>Owner</th>
            </tr>
          </thead>
          <tbody>
            ${instance.registered
              .map(
                (pet) => `
              <tr>
                <td>${pet.petName}</td>
                <td>${pet.petBreed}</td>
                <td>${pet.petSpecies}</td>
                <td>${pet.petGender}</td>
                <td>${pet.owner.firstName} ${pet.owner.lastName}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </div>
    </body>
    </html>
  `;
};

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
  convertCheckupsToCsv,
  convertCheckupsToPdf,
  convertSpayAndNeuterInstance,
  convertSpayNeuterInstanceToPdf,
};
