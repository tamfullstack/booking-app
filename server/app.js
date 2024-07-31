const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const { connect } = require("mongoose");

const clientRoutes = require("./routes/client");
const adminRoutes = require("./routes/admin");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "images")));

app.use(clientRoutes);
app.use("/admin", adminRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const { message, data } = error;
  res.status(status).json({ message, data });
});

connect(
  "mongodb+srv://tamfullstack:nhatrang@cluster0.kbmugi6.mongodb.net/booking?retryWrites=true"
)
  .then((result) => app.listen(port))
  .catch((err) => console.log(err));
