import React, { useState, useEffect } from "react";

const ReportAnalysis = () => {
  const [reportData, setReportData] = useState(null); // State for report data
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    // Fetch report data from the API
    const fetchReportData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/report");
        if (response.ok) {
          const data = await response.json();
          setReportData(data); // Save API response to state
        } else {
          console.error("Failed to fetch report data");
        }
      } catch (error) {
        console.error("Error fetching report data:", error);
      } finally {
        setLoading(false); // Loading complete
      }
    };

    fetchReportData();
  }, []);

  // Rotating Spinner CSS
  const spinnerStyle = {
    border: "4px solid #f3f3f3",
    borderTop: "4px solid #3498db", // Blue color
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    animation: "spin 1s linear infinite",
  };

  // Add CSS animation for spinner
  const styles = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-800">
        {/* Adding the spinner */}
        <style>{styles}</style>
        <div style={spinnerStyle}></div>
        <p className="text-lg font-semibold text-gray-300 ml-4">
          Loading report...
        </p>
      </div>
    );
  }

  // Render Key Findings dynamically
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg mt-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">
          Complete Blood Count (CBC) Analysis <br />
          <span className="text-sm text-gray-400">
            Report ID: #CBC12345 • Processed on{" "}
            {new Date().toLocaleDateString()}
          </span>
        </h2>
        <div className="space-x-3">
          <button className="bg-gray-700 text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-600">
            Print Report
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Share Results
          </button>
        </div>
      </div>

      {/* Key Findings */}
      <div>
        <h3 className="text-lg font-semibold mb-2 text-white">Key Findings</h3>
        <div className="space-y-3">
          {reportData && (
            <>
              <div className="flex items-center">
                <p className="w-40 text-gray-300">Hemoglobin</p>
                <p className="w-24 font-semibold text-white">
                  {reportData.Hemoglobin} g/dL
                </p>
                <div className="flex-1 bg-gray-700 rounded-full h-2">
                  <div
                    className={`${
                      reportData.Hemoglobin < 12
                        ? "bg-yellow-400"
                        : reportData.Hemoglobin > 15.5
                        ? "bg-red-500"
                        : "bg-green-500"
                    } w-1/2 h-2 rounded-full`}
                  ></div>
                </div>
                <p className="ml-4 text-sm text-gray-400">
                  Low (7.0) Normal (12.0-15.5) High (18.0)
                </p>
              </div>
              <div className="flex items-center">
                <p className="w-40 text-gray-300">RBC Count</p>
                <p className="w-24 font-semibold text-white">
                  {reportData["RBC Count"]} million/mcL
                </p>
                <div className="flex-1 bg-gray-700 rounded-full h-2">
                  <div
                    className={`${
                      reportData["RBC Count"] < 4.2
                        ? "bg-yellow-400"
                        : reportData["RBC Count"] > 5.4
                        ? "bg-red-500"
                        : "bg-green-500"
                    } w-2/3 h-2 rounded-full`}
                  ></div>
                </div>
                <p className="ml-4 text-sm text-gray-400">
                  Low (3.5) Normal (4.2-5.4) High (6.0)
                </p>
              </div>
              <div className="flex items-center">
                <p className="w-40 text-gray-300">Platelet Count</p>
                <p className="w-24 font-semibold text-white">
                  {reportData["Platelet Count"]} /mcL
                </p>
                <div className="flex-1 bg-gray-700 rounded-full h-2">
                  <div
                    className={`${
                      reportData["Platelet Count"] < 150000
                        ? "bg-yellow-400"
                        : reportData["Platelet Count"] > 450000
                        ? "bg-red-500"
                        : "bg-green-500"
                    } w-1/2 h-2 rounded-full`}
                  ></div>
                </div>
                <p className="ml-4 text-sm text-gray-400">
                  Low (150K) Normal (150K-450K) High (450K)
                </p>
              </div>
              <div className="flex items-center">
                <p className="w-40 text-gray-300">Total Leucocyte Count</p>
                <p className="w-24 font-semibold text-white">
                  {reportData["Total WBC Count"] ||
                    reportData["Total Leucocyte Count"]}{" "}
                  /mcL
                </p>
                <div className="flex-1 bg-gray-700 rounded-full h-2">
                  <div
                    className={`${
                      reportData["Total WBC Count"] ||
                      reportData["Total Leucocyte Count"] < 4500
                        ? "bg-yellow-400"
                        : reportData["Total WBC Count"] ||
                          reportData["Total Leucocyte Count"] > 11000
                        ? "bg-red-500"
                        : "bg-green-500"
                    } w-3/4 h-2 rounded-full`}
                  ></div>
                </div>
                <p className="ml-4 text-sm text-gray-400">
                  Low (4.5K) Normal (4.5K-11K) High (11K)
                </p>
              </div>
            </>
          )}
        </div>
        {reportData && reportData.Hemoglobin < 12 && (
          <div className="bg-yellow-900/50 p-4 rounded-lg mt-4">
            <p className="text-yellow-200">
              Hemoglobin levels are slightly below the normal range, suggesting
              mild anemia. Follow-up required.
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3 mt-4">
        <button className="bg-gray-700 text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-600">
          Add Notes
        </button>
        <button className="bg-gray-700 text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-600">
          Print Report
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Share with Doc
        </button>
      </div>
    </div>
  );
};

export default ReportAnalysis;
