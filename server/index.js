require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

//built in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//middleware third party
app.use(cors({ origin: "*" }));

// mongodb+srv://<username>:<password>@cluster0.f7lnxwz.mongodb.net/?retryWrites=true&w=majority
mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("connect to database");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api/v1/auth", require("./routes/auth"));
app.use("/api/v1/accounts", require("./routes/accounts"));

app.listen(process.env.PORT, () => {
  console.log("server started");
});
