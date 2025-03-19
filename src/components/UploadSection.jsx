import React, { useState } from "react";

const UploadSection = () => {
  const [file, setFile] = useState(null); // State for the uploaded file

  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file); // Attach the file to the request

    try {
      // Use the /upload endpoint on localhost
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        alert(
          "Upload successful! Analysis result: " + JSON.stringify(data.message)
        );
      } else {
        alert("Failed to upload. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-2">Upload Medical Report</h2>
      <p className="text-gray-500 mb-4">
        Upload your medical report image for automatic data extraction and risk
        analysis
      </p>

      {/* Upload Area */}
      <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center mb-4">
        <input
          type="file"
          onChange={handleFileChange}
          className="hidden"
          id="fileInput"
        />
        <label htmlFor="fileInput" className="text-blue-500 cursor-pointer">
          Drag and drop your medical report image, or browse files
        </label>
        <p className="text-sm text-gray-400 mt-1">
          Supported formats: JPG, PNG, PDF, TIFF
        </p>
      </div>

      {/* Buttons */}
      <div className="flex space-x-3">
        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Upload & Analyze
        </button>
        <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-300">
          Use Sample Report
        </button>
      </div>
    </div>
  );
};

export default UploadSection;
