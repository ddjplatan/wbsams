// const User = require("../models/User");
const News = require("../models/News");

const postNews = async (req, res, next) => {
  const postedBy = req.user._id;
  const { title, details } = req.body;
  const img = req.upload
    ? req.upload.secure_url
    : "https://res.cloudinary.com/dhndw6jia/image/upload/v1704408190/bla6dbcsi1gvxslngj6x.png";

  try {
    await News.create({
      postedBy,
      title,
      details,
      img,
    });

    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json({ success: true, message: "News posted" });
  } catch (err) {
    console.error(err);
  }
};

const getNews = async (req, res, next) => {
  try {
    const news = await News.findById(req.params.newsId);
    res.status(200).setHeader("Content-Type", "application/json").json(news);
  } catch (err) {
    console.error(err);
  }
};

const getNewss = async (req, res, next) => {
  const { skip, limit, category } = req.query;
  const count = await News.countDocuments();
  let newss;
  if (category === undefined) {
    newss = await News.find().skip(skip).limit(limit);
  } else {
    newss = await News.find({ category }).skip(skip).limit(limit);
  }
  res
    .status(200)
    .setHeader("Content-Type", "application/json")
    .setHeader("X-Total-Count", `${count}`)
    .json(newss);
};

const updateNews = async (req, res, next) => {
  try {
    const result = await News.findByIdAndUpdate(
      req.params.newsId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json({ success: true, message: "Successfully updated news" });
  } catch (err) {
    console.error(err);
  }
};

const deleteNews = async (req, res, next) => {
  try {
    await News.deleteOne({ _id: req.params.newsId });
    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json({ success: true, message: "Successfully deleted one news" });
  } catch (err) {
    console.error(err);
  }
};

const deleteNewss = async (req, res, next) => {
  try {
    await News.deleteMany();
    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json({ success: true, message: "Deleted all newss" });
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  postNews,
  getNewss,
  getNews,
  updateNews,
  deleteNews,
  deleteNewss,
};
