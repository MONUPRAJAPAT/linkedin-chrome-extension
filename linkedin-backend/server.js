const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config({ path: "./.env" });

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_CLOUD_URL)
  .then(() => {
    console.log("DataBase is Connected Successfully");
  })
  .catch((error) => {
    console.log("DataBase in not Connected");
    process.exit(1);
  });

app.get("/", (req, res) => {
  res.status(200).json({
    msg: "Welcome to the Linkedin Scrapping Extension Server",
  });
});


// Routes
const companyRouter = require("./routers/companyRouter");
app.use("/companies", companyRouter);

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
