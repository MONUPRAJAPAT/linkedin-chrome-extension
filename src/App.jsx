import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CompanyTable from './components/company-table/CompanyTable';
import './App.css'


function App() {
  return <>
      <CompanyTable/>
  </>
}

export default App;