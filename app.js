const express = require("express");
const app = express();

app.use("/", express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

// AtoB Routes (SEO)
const atobRouter = require("./routes/atob.routes");
app.use("/one-way-taxi", atobRouter);

app.get("/", (req, res) => {
  res.render("index");
});

const bookingRouter = require("./routes/booking.routes");
app.use("/api", bookingRouter);

const estimateRouter = require("./routes/estimate.routes");
app.use("/estimation", estimateRouter);

const otpRouter = require("./routes/otp.routes");
app.use("/otp", otpRouter);

const pages = [
  "about",
  "booking",
  "service",
  "vehicles",
  "tariff",
  "cities",
  "contact",
  "success",
  "verification",
  "estimation",
];

pages.forEach((page) => {
  app.get(`/${page}`, (req, res) => res.render(page));
});
app.post("/contact", async (req, res) => {
  try {
    sendMail(req.body);
    res.status(200).send("Form submitted successfully.");
  } catch (err) {
    res.status(500).send(`Internal Server Error`);
  }
});

app.get("/verification", (req, res) => {
  res.render("verification");
});

app.get("/success", (req, res) => {
  res.render("success");
});

app.use("", (req, res) => {
  res.render("404");
});

module.exports = app;
