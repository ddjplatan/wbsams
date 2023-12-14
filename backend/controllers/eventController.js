// const User = require("../models/User");
const Event = require("../models/Event");

const postEvent = async (req, res, next) => {
  const postedBy = req.user._id;
  const { title, details } = req.body;
  const img = req.file
    ? req.file.path.replace(/backend[\/\\]public[\/\\]/, "").replace(/\\/g, "/")
    : "defaults/default-profile.png";

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

const getEvents = async (req, res, next) => {
  const { skip, limit, category } = req.query;
  const count = await Event.countDocuments();
  let events;
  if (category === undefined) {
    events = await Event.find().skip(skip).limit(limit);
  } else {
    events = await Event.find({ category }).skip(skip).limit(limit);
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

const deleteEvent = async (req, res, next) => {
  try {
    await Event.deleteOne({ _id: req.params.eventId });
    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json({ success: true, message: "Successfully deleted one event" });
  } catch (err) {
    console.error(err);
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
