import React, { useState } from "react";
// import FileUpload from "./components/FileUpload";
// import DataDisplay from "./components/DataDisplay";
import "./App.css";
import ReportAnalysis from "./components/ReportAnalysis";
import UploadSection from "./components/UploadSection";
import Sidebar from "./components/Sidebar";
import HowItWorks from "./components/HowItWorks";
import CompleteBloodCount from "./components/CompleteBloodCount";
import RiskAnalysis from "./components/RiskAnalysis";
// import Glass from "./components/Glass";
import Chatbot from "./components/Chatbot";

const App = () => {
  return (
    <div className="app-container">
      {/* <Sidebar /> */}
      <UploadSection />

      <ReportAnalysis />
      <CompleteBloodCount />
      <RiskAnalysis />
      <Chatbot />

      {/* error state for report analysis component and RiskAnalysis component */}

      <HowItWorks />
    </div>
  );
};

export default App;
