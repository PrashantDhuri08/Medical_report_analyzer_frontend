import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const RiskAnalysis = () => {
  // State for anemia and dengue risk data and loading state
  const [anemiaData, setAnemiaData] = useState(null);
  const [dengueData, setDengueData] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [noData, setNoData] = useState(false); // No data state
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Get user ID from localStorage
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(parseInt(storedUserId));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch anemia data
        const anemiaResponse = await fetch(
          "http://127.0.0.1:5000/predict/anemia"
        );
        const anemiaData = anemiaResponse.ok
          ? await anemiaResponse.json()
          : null;
        setAnemiaData(anemiaData);

        // Fetch dengue data
        const dengueResponse = await fetch(
          "http://127.0.0.1:5000/predict/dengue"
        );
        const dengueData = dengueResponse.ok
          ? await dengueResponse.json()
          : null;
        setDengueData(dengueData);

        if (!anemiaData && !dengueData) {
          setNoData(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Loading complete
      }
    };

    fetchData();
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
      <div className="flex items-center justify-center h-screen">
        {/* Adding the spinner */}
        <style>{styles}</style>
        <div style={spinnerStyle}></div>
        <p className="text-lg font-semibold text-gray-600 ml-4">
          Loading report...
        </p>
      </div>
    );
  }

  if (noData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-gray-600">
          Please upload document first.
        </p>
      </div>
    );
  }

  // Anemia Risk Analysis based on fetched data
  const anemiaRisk = anemiaData
    ? {
        percentage: anemiaData.confidence.toFixed(2),
        level: anemiaData.prediction === 1 ? "High Risk" : "Low Risk",
        basis: "Based on your hemoglobin level and hematocrit percentage",
        keyFactors: [
          anemiaData.prediction === 1
            ? "Indicators suggest anemia risk"
            : "No significant anemia indicators",
        ],
        recommendations:
          anemiaData.prediction === 1
            ? [
                "Schedule follow-up testing in 4-6 weeks",
                "Increase dietary iron intake (lean meats, beans, fortified cereals)",
                "Consider iron supplements after consulting with your doctor",
                "Monitor for symptoms like fatigue, weakness, or shortness of breath",
              ]
            : [
                "Maintain a balanced diet rich in iron",
                "Continue regular health check-ups",
              ],
      }
    : null;

  // Dengue Risk Analysis based on fetched data
  const dengueRisk = dengueData
    ? {
        percentage: dengueData.confidence.toFixed(2),
        level: dengueData.prediction === 1 ? "High Risk" : "Low Risk",
        basis: "Based on platelet count and white blood cell analysis",
        keyFactors: [
          dengueData.prediction === 1
            ? "Abnormal platelet count or WBC levels"
            : "No significant dengue indicators",
        ],
        assessment:
          dengueData.prediction === 1
            ? "Blood parameters suggest potential risk of dengue. Consult with a healthcare provider for further testing and advice."
            : "Your blood parameters show no significant indicators of dengue infection. Continue with routine monitoring and follow standard preventive measures in endemic areas.",
      }
    : null;

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Anemia Risk Analysis */}
      <div className="bg-black p-6 rounded-lg shadow">
        <h2 className="text-xl text-white font-semibold mb-4">
          Anemia Risk Analysis {userId && `• User ID: ${userId}`}
        </h2>

        {/* Circular Progress Indicator */}
        <div className="flex items-center mb-4">
          <div className="w-24 h-24 mr-4">
            <CircularProgressbar
              value={anemiaRisk.percentage}
              text={`${anemiaRisk.percentage}%`}
              styles={buildStyles({
                pathColor:
                  anemiaRisk.level === "High Risk" ? "#EF4444" : "#10B981",
                textColor:
                  anemiaRisk.level === "High Risk" ? "#EF4444" : "#10B981",
                trailColor: "#E5E7EB",
              })}
            />
          </div>
          <div>
            <p
              className={`text-lg font-semibold ${
                anemiaRisk.level === "High Risk"
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {anemiaRisk.level}
            </p>
            <p className="text-gray-500">{anemiaRisk.basis}</p>
          </div>
        </div>

        {/* Recommendations */}
        <div
          className={`p-4 rounded-lg ${
            anemiaRisk.level === "High Risk" ? "bg-red-50" : "bg-green-50"
          }`}
        >
          <p
            className={`font-semibold mb-2 ${
              anemiaRisk.level === "High Risk"
                ? "text-red-700"
                : "text-green-700"
            }`}
          >
            Recommendations
          </p>
          <ul
            className={`list-disc list-inside space-y-1 ${
              anemiaRisk.level === "High Risk"
                ? "text-red-700"
                : "text-green-700"
            }`}
          >
            {anemiaRisk.recommendations.map((recommendation, index) => (
              <li key={index}>{recommendation}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Dengue Risk Analysis */}
      <div className="bg-black p-6 rounded-lg shadow">
        <h2 className="text-xl text-white font-semibold mb-4">
          Dengue Risk Analysis
        </h2>

        {/* Circular Progress Indicator */}
        <div className="flex items-center mb-4">
          <div className="w-24 h-24 mr-4">
            <CircularProgressbar
              value={dengueRisk.percentage}
              text={`${dengueRisk.percentage}%`}
              styles={buildStyles({
                pathColor:
                  dengueRisk.level === "High Risk" ? "#EF4444" : "#10B981",
                textColor:
                  dengueRisk.level === "High Risk" ? "#EF4444" : "#10B981",
                trailColor: "#E5E7EB",
              })}
            />
          </div>
          <div>
            <p
              className={`text-lg font-semibold ${
                dengueRisk.level === "High Risk"
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {dengueRisk.level}
            </p>
            <p className="text-gray-500">{dengueRisk.basis}</p>
          </div>
        </div>

        {/* Assessment */}
        <div
          className={`p-4 rounded-lg ${
            dengueRisk.level === "High Risk" ? "bg-red-50" : "bg-green-50"
          }`}
        >
          <p
            className={`font-semibold mb-2 ${
              dengueRisk.level === "High Risk"
                ? "text-red-700"
                : "text-green-700"
            }`}
          >
            Assessment
          </p>
          <p
            className={`${
              dengueRisk.level === "High Risk"
                ? "text-red-700"
                : "text-green-700"
            }`}
          >
            {dengueRisk.assessment}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RiskAnalysis;
