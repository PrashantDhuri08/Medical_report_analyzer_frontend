import React, { useState, useRef } from "react";

const UploadSection = () => {
  const [file, setFile] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [showUserForm, setShowUserForm] = useState(false);
  const [userId, setUserId] = useState(null);

  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setShowUserForm(true);
  };

  // Handle camera start
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setShowCamera(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert(
        "Could not access camera. Please make sure you have granted camera permissions."
      );
    }
  };

  // Handle camera stop
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setShowCamera(false);
    setShowUserForm(true);
  };

  // Handle capture photo
  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);

    canvas.toBlob((blob) => {
      setFile(blob);
      stopCamera();
    }, "image/jpeg");
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file or capture an image to upload.");
      return;
    }

    if (!userEmail) {
      alert("Please enter your email address.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("email", userEmail);
    if (userName) {
      formData.append("name", userName);
    }

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Upload response:", data);

        // Save user ID for future requests
        if (data.user_id) {
          setUserId(data.user_id);
          localStorage.setItem("userId", data.user_id);
        }

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
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-2 text-white">
        Upload Medical Report
      </h2>
      <p className="text-gray-300 mb-4">
        Upload your medical report image or capture it using your camera for
        automatic data extraction and risk analysis
      </p>

      {/* Camera Preview */}
      {showCamera && (
        <div className="mb-4">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full max-w-md mx-auto rounded-lg"
          />
          <div className="flex justify-center space-x-2 mt-2">
            <button
              onClick={capturePhoto}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Capture Photo
            </button>
            <button
              onClick={stopCamera}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Stop Camera
            </button>
          </div>
        </div>
      )}

      {/* Upload Area */}
      {!showCamera && (
        <div className="border-2 border-dashed border-gray-600 p-6 rounded-lg text-center mb-4 bg-gray-700">
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="fileInput"
            accept="image/*"
          />
          <label
            htmlFor="fileInput"
            className="text-blue-400 cursor-pointer hover:text-blue-300"
          >
            Drag and drop your medical report image, or browse files
          </label>
          <p className="text-sm text-gray-400 mt-1">
            Supported formats: JPG, PNG, PDF, TIFF
          </p>
        </div>
      )}

      {/* User Information Form */}
      {showUserForm && (
        <div className="mb-4 p-4 bg-gray-700 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-white">
            Your Information
          </h3>
          <div className="mb-3">
            <label htmlFor="userEmail" className="block text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="userEmail"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="w-full p-2 rounded bg-gray-600 text-white border border-gray-500"
              placeholder="your.email@example.com"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="userName" className="block text-gray-300 mb-1">
              Name (Optional)
            </label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full p-2 rounded bg-gray-600 text-white border border-gray-500"
              placeholder="Your Name"
            />
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex space-x-3">
        {!showCamera && (
          <>
            <button
              onClick={handleUpload}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Upload & Analyze
            </button>
            <button
              onClick={startCamera}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Use Camera
            </button>
            <button className="bg-gray-600 text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-500">
              Use Sample Report
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UploadSection;
