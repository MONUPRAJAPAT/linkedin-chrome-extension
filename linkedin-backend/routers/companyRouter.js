const express = require("express");
const companyRouter = express.Router();
const companyModel = require("../models/companyModel");

// Fetch all companies
companyRouter.get("/", async (req, res) => {
  try {
    const companies = await companyModel.find();
    return res.status(200).json({
      message: "All the Companies",
      data: companies,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Add a new company
companyRouter.post("/", async (req, res) => {
  const company = new companyModel({
    logo: req.body.logo || null,
    name: req.body.name || null,
    description: req.body.description || null,
    headquarters: req.body.headquarters || null,
    companySize: req.body.companySize || null,
    industry: req.body.industry || null,
    founded: req.body.founded || null,
    specialties: req.body.specialties || null,
    website: req.body.website || null,
    email: req.body.email || null,
  });
  try {
    const newCompany = await company.save();
    return res.status(201).json({
      message: "New Company Added",
      data: newCompany,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// Delete a company
companyRouter.delete("/:id", async (req, res) => {
  try {
    let deletedCompany = await companyModel.findByIdAndDelete(req.params.id);
    if (deletedCompany) {
      return res
        .status(200)
        .json({ message: "Company deleted", data: deletedCompany });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = companyRouter;
