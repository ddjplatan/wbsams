const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const user = require("./routes/user");
const event = require("./routes/event");
const donation = require("./routes/donation");
const vet = require("./routes/vet");
const volunteer = require("./routes/Volunteer");
const pet = require("./routes/Pet");
const adoption = require("./routes/Adoption");
const spayAndNeuter = require("./routes/SpayAndNeuter");

const logger = require("./middlewares/logger");
const errorHandler = require("./middlewares/error");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
// const fileupload = require("express-fileupload");
const usersession = require("express-session");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const hpp = require("hpp");
const xss = require("xss-clean");

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 1000,
});

dotenv.config({ path: "./.env" });
connectDB();

const app = express();
app.use(express.static(__dirname + "/public"));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(
  usersession({
    secret: "secret key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
app.use(bodyParser.json());

app.use(cookieParser());

// app.use(fileupload());

app.use(mongoSanitize());

app.use(xss());

app.use(hpp());

app.use(helmet());

const corsOptions = {
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Total-Count"],
  exposedHeaders: ["X-Total-Count"],
};

app.use(cors(corsOptions));

app.use(limiter);

app.use(logger);

app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.use("/api/user", user);
app.use("/api/event", event);
app.use("/api/donation", donation);
app.use("/api/vet", vet);
app.use("/api/volunteer", volunteer);
app.use("/api/pet", pet);
app.use("/api/adoption", adoption);
app.use("/api/spay-and-neuter", spayAndNeuter);

const server = app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
});
