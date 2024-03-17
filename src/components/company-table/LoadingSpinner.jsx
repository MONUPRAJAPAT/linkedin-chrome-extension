import React from "react";
import "./loadingSpinner.css";
import { Flex } from "antd";

const LoadingSpinner = () => {
  return (
    <>
      <h1
        style={{
          display: 'Flex',
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height:'100vh',
          width:'100%'
        }}
      >
        <div class="loader"></div>
      </h1>
    </>
  );
};

export default LoadingSpinner;
