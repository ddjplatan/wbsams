// const User = require("../models/User");
const Event = require("../models/Event");

const postEvent = async (req, res, next) => {
  const postedBy = req.user._id;
  const { title, details } = req.body;
  const img = req.upload
    ? req.upload.secure_url
    : "https://res.cloudinary.com/dhndw6jia/image/upload/v1704408190/bla6dbcsi1gvxslngj6x.png";

  try {
    await Event.create({
      postedBy,
      title,
      details,
      img,
    });

    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json({ success: true, message: "Event posted" });
  } catch (err) {
    console.error(err);
  }
};

const getEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.eventId);
    res.status(200).setHeader("Content-Type", "application/json").json(event);
  } catch (err) {
    console.error(err);
  }
};

// const getEvents = async (req, res, next) => {
//   const { skip, limit, category } = req.query;
//   const count = await Event.countDocuments();
//   let events;
//   if (category === undefined) {
//     events = await Event.find().skip(skip).limit(limit);
//   } else {
//     events = await Event.find({ category }).skip(skip).limit(limit);
//   }
//   res
//     .status(200)
//     .setHeader("Content-Type", "application/json")
//     .setHeader("X-Total-Count", `${count}`)
//     .json(events);
// };

const getEvents = async (req, res, next) => {
  const { skip, limit, category } = req.query;
  const filterCondition = { isDeleted: false }; // Add this filter condition

  let events, count;

  if (category === undefined) {
    count = await Event.countDocuments(filterCondition);
    events = await Event.find(filterCondition).skip(skip).limit(limit);
  } else {
    const categoryCondition = { category };
    const finalCondition = { ...filterCondition, ...categoryCondition };
    count = await Event.countDocuments(finalCondition);
    events = await Event.find(finalCondition).skip(skip).limit(limit);
  }

  res
    .status(200)
    .setHeader("Content-Type", "application/json")
    .setHeader("X-Total-Count", `${count}`)
    .json(events);
};


const updateEvent = async (req, res, next) => {
  try {
    const result = await Event.findByIdAndUpdate(
      req.params.eventId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json({ success: true, message: "Successfully updated event" });
  } catch (err) {
    console.error(err);
  }
};

// const deleteEvent = async (req, res, next) => {
//   try {
//     await Event.deleteOne({ _id: req.params.eventId });
//     res
//       .status(200)
//       .setHeader("Content-Type", "application/json")
//       .json({ success: true, message: "Successfully deleted one event" });
//   } catch (err) {
//     console.error(err);
//   }
// };

const deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findOneAndUpdate(
      { _id: req.params.eventId },
      { isDeleted: true },
      { new: true } // To return the updated document
    );

    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json({ success: true, message: "Successfully marked event as deleted", event });
  } catch (err) {
    console.error("Error occurred while marking event as deleted:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const deleteEvents = async (req, res, next) => {
  try {
    await Event.deleteMany();
    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json({ success: true, message: "Deleted all events" });
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  postEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
  deleteEvents,
};
