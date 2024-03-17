import React, { useState, useEffect } from "react";
import axios from "axios";
import "./companyTable.css";
import LoadingSpinner from "./LoadingSpinner";
import LogoImage from "../../assets/copy-file-icon.png";
import DeleteImage from "../../assets/recycle-bin-line-icon.png";

const companyTable = ({ onClose }) => {
  const [companies, setCompanies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [copyMessage, setCopyMessage] = useState("");
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3001/companies/");
        setCompanies(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }
  const indexOfLastCompany = currentPage * itemsPerPage;
  const indexOfFirstCompany = indexOfLastCompany - itemsPerPage;
  const currentCompanies = companies.slice(
    indexOfFirstCompany,
    indexOfLastCompany
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(companies.length / itemsPerPage);

  const exportAsCSV = () => {
    setCopyMessage("This Functionality Will be Added Soon!");
    setTimeout(() => {
      setCopyMessage("");
    }, 2000);
  };

  const deleteCompany = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:3001/companies/${id}`);
      setCompanies((prevCompanies) =>
        prevCompanies.filter((company) => company._id !== id)
      );
      setLoading(false);
    } catch (error) {
      console.error("Error deleting company:", error);
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopyMessage("Copied!");
    setTimeout(() => {
      setCopyMessage("");
    }, 1000);
  };

  return (
    <div className="large-view-container">
      {copyMessage && <div className="copy-message">{copyMessage}</div>}
      <div className="top-bar">
        <div className="selected-actions">
          <button className="action-btn" onClick={exportAsCSV}>
            Export as CSV
          </button>
        </div>
      </div>
      <div style={{ marginTop: "50px" }}></div>
      {companies.length === 0 ? (
        <div
          style={{
            display: "Flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          No companies data
        </div>
      ) : (
        <table className="companies-table">
          <thead className="table-header">
            <tr>
              <th></th>
              <th></th>
              <th>Name</th>
              <th>HQ Location</th>
              <th>Employees</th>
              <th>Industry</th>
              <th>Founded</th>
              <th>Website</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {currentCompanies.map((company) => (
              <tr key={company.id}>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteCompany(company._id)}
                  >
                    <img src={DeleteImage} width={10} height={10} alt="" />
                  </button>
                </td>
                <td>
                  <div className="company-info">
                    {" "}
                    <img
                      src={company.logo}
                      alt={`${company.name} Logo`}
                      className="company-logo"
                      width={60}
                      height={60}
                      style={{ borderRadius: "10px" }}
                    />
                  </div>
                </td>
                <td>{company.name === null ? "null" : company.name}</td>
                <td>
                  {company.headquarters === null ? "null" : company.headquarters}
                </td>
                <td>
                  {company.companySize === null ? "null" : company.companySize}
                </td>
                <td>{company.industry === null ? "null" : company.industry}</td>
                <td>{company.founded === null ? "null" : company.founded}</td>
                <td>
                  {company.website === null ? (
                    "not provided"
                  ) : (
                    <div className="flex items-center">
                      <span className="mr-2 text-blue-500 cursor-pointer">
                        {company.website}
                      </span>
                      <button
                        className="text-blue-500 cursor-pointer"
                        onClick={() => copyToClipboard(company.website)}
                      >
                        <img
                          src={LogoImage}
                          width={10}
                          height={10}
                          alt=""
                        />
                      </button>
                    </div>
                  )}
                </td>
                <td>
                  {company.email === null ? (
                    "not provided"
                  ) : (
                    <div className="flex items-center">
                      <span className="mr-2 text-blue-500 cursor-pointer">
                        {company.email}
                      </span>
                      <button
                        className="text-blue-500 cursor-pointer"
                        onClick={() => copyToClipboard(company.email)}
                      >
                        <img src={LogoImage} width={10} height={10} alt="" />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={`pagination-btn ${currentPage === 1 ? "disabled" : ""}`}
        >
          Previous
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentCompanies.length < itemsPerPage}
          className={`pagination-btn ${
            currentCompanies.length < itemsPerPage ? "disabled" : ""
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default companyTable;
