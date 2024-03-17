chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "displayCompanySidebar") {
    const companyInfo = message.companyInfo;
    console.log("Received company info from background:", companyInfo);

    const maxChars = 20; // Maximum characters to display
    const truncatedDescription =
      companyInfo.description.length > maxChars
        ? companyInfo.description.substring(0, maxChars) + "..."
        : companyInfo.description;

    const sidebarHtml = `
    <div id="companySidebar" style="
      position: fixed;
      top: 0;
      right: 0;
      width: 330px;
      height: 640px;
      background-color: #ffffff;
      padding: 20px;
      z-index: 9999;
      border-left: 1px solid #ccc;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
      border-radius: 10px;
      ">
      <div style="text-align: center;">
        <img src="${companyInfo.logo}" alt="Company Logo" style="width: 80px; height: 80px; border-radius: 50%;">
      </div>
      <h3 style="text-align: center;">${companyInfo.name}</h3>
      <div id="companyInfo" style="
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        margin-bottom: 20px;
      ">
        <div style="display: flex; justify-content: space-between;">
          <div style="flex: 1;">
            <strong>Info:</strong>
          </div>
          <div style="flex: 2; text-align: right;">
          <small>${truncatedDescription}</small>
          </div>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <div style="flex: 1;">
            <strong>Website:</strong>
          </div>
          <div style="flex: 2; text-align: right;">
            <a href="${companyInfo.website}" target="_blank">${companyInfo.website}</a>
          </div>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <div style="flex: 1;">
            <strong>Headquarters:</strong>
          </div>
          <div style="flex: 2; text-align: right;">
            ${companyInfo.headquarters}
          </div>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <div style="flex: 1;">
            <strong>Employees:</strong>
          </div>
          <div style="flex: 2; text-align: right;">
            ${companyInfo.companySize}
          </div>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <div style="flex: 1;">
            <strong>Industry:</strong>
          </div>
          <div style="flex: 2; text-align: right;">
            ${companyInfo.industry}
          </div>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <div style="flex: 1;">
            <strong>Specialties:</strong>
          </div>
          <div style="flex: 2; text-align: right;">
            ${companyInfo.specialties}
          </div>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <div style="flex: 1;">
            <strong>Founded:</strong>
          </div>
          <div style="flex: 2; text-align: right;">
            ${companyInfo.founded}
          </div>
        </div>
      </div>
      <div style="text-align: center;">
        <button id="closeBtn" style="
          background-color: #007bff;
          color: #ffffff;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
        ">Close</button>
        <button id="stretchBtn" style="
          background-color: #007bff;
          color: #ffffff;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          margin-left: 10px;
        ">Stretch</button>
      </div>
    </div>
  `;

    // Append the sidebar HTML to the body of the page
    document.body.insertAdjacentHTML("beforeend", sidebarHtml);

    // Get references to the sidebar and buttons
    const sidebar = document.getElementById("companySidebar");
    const closeBtn = document.getElementById("closeBtn");
    const stretchBtn = document.getElementById("stretchBtn");

    // Add event listeners to the buttons
    closeBtn.addEventListener("click", closeSidebar);
    stretchBtn.addEventListener("click", stretchSidebar);

    // Function to close the sidebar
    function closeSidebar() {
      sidebar.remove();
    }

    // Function to stretch the sidebar to full page width
    function stretchSidebar() {
      chrome.runtime.sendMessage({ action: "openNewWindow" });
      // Close the sidebar
      sidebar.remove();
    }
  }
});

// Function to extract company information from the LinkedIn company page
function extractCompanyInfo() {
  let company = {};

  // for the logo
  const logoContainer = document.querySelector(
    ".org-top-card-primary-content__logo-container"
  );
  const logoElement = logoContainer ? logoContainer.querySelector("img") : null;
  company.logo = logoElement ? logoElement.src : null;

  // for the name
  const nameElement = document.querySelector(".org-top-card-summary__title");
  company.name = nameElement ? nameElement.textContent.trim() : null;

  // for the description
  const descriptionElement = document.querySelector(
    ".break-words.white-space-pre-wrap.t-black--light.text-body-medium"
  );
  company.description = descriptionElement
    ? descriptionElement.textContent.trim()
    : null;

  // Extract Website
  const websiteElement = document.querySelector("dt:nth-of-type(1) + dd");
  company.website = websiteElement ? websiteElement.textContent.trim() : "";
  // Extract industry
  const industryElement = document.querySelector("dt:nth-of-type(2) + dd");
  company.industry = industryElement ? industryElement.textContent.trim() : "";

  // Extract company size
  const companySizeElement = document.querySelector("dt:nth-of-type(3) + dd");
  company.companySize = companySizeElement
    ? companySizeElement.textContent.trim()
    : "";

  // Extract headquarters
  const headquartersElement = document.querySelector("dt:nth-of-type(4) + dd");
  company.headquarters = headquartersElement
    ? headquartersElement.textContent.trim()
    : "";

  // Extract founded year
  const foundedElement = document.querySelector("dt:nth-of-type(5) + dd");
  company.founded = foundedElement ? foundedElement.textContent.trim() : "";

  // Extract specialties
  const specialtiesElement = document.querySelector("dt:nth-of-type(6) + dd");
  company.specialties = specialtiesElement
    ? specialtiesElement.textContent.trim()
    : "";

  return company;
}

// Send the extracted company information back to the background script
chrome.runtime.sendMessage({
  action: "extractCompanyInfo",
  companyInfo: extractCompanyInfo(),
});
