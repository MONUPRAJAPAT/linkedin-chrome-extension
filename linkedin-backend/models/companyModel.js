const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  logo: String,
  name: String,
  description: String,
  headquarters: String,
  companySize: String,
  industry: String,
  founded: String,
  specialties: String,
  website: String,
  email: String,
});

const companyModel = mongoose.model("companyModel", companySchema);
module.exports = companyModel;
