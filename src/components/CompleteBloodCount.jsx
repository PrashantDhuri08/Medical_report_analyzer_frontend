import React, { useState, useEffect } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

const CompleteBloodCount = () => {
  // States for data, loading, and error
  const [bloodCountData, setBloodCountData] = useState([]);
  const [radarData, setRadarData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [errorState, setErrorState] = useState(false); // Error state

  // Fetch data from the API
  const fetchData = async () => {
    setLoading(true); // Start loading
    setErrorState(false); // Reset error state
    try {
      const response = await fetch("http://127.0.0.1:5000/report");
      if (response.ok) {
        const data = await response.json();

        // Map API data to blood count table format
        const bloodCountTableData = [
          {
            test: "Hemoglobin",
            result: `${data.Hemoglobin} g/dL`,
            normalRange: "12.0-15.5 g/dL",
          },
          {
            test: "Hematocrit (Hct)",
            result: `${data["Hct"] || data["PCV"]} %`,
            normalRange: "36-46%",
          },
          {
            test: "Red Blood Cell Count (RBC)",
            result: `${data["RBC Count"]} million/mcL`,
            normalRange: "4.2-5.4 million/mcL",
          },
          {
            test: "White Blood Cell Count (WBC)",
            result: `${
              data["Total Leucocyte Count"] || data["Total WBC Count"]
            }/mcL`,
            normalRange: "4,500-11,000/mcL",
          },
          {
            test: "Platelet Count",
            result: `${data["Platelet Count"]}/mcL`,
            normalRange: "150,000-450,000/mcL",
          },
          {
            test: "Mean Cell Volume (MCV)",
            result: `${data.MCV} fL`,
            normalRange: "80-96 fL",
          },
          {
            test: "Mean Cell Hemoglobin (MCH)",
            result: `${data.MCH} pg`,
            normalRange: "27-33 pg",
          },
        ];

        // Map API data to radar chart format
        const radarChartData = [
          {
            parameter: "Hemoglobin",
            value: parseFloat(data.Hemoglobin),
            fullMark: 15.5,
          },
          {
            parameter: "Hematocrit",
            value: parseFloat(data["Hct"] || data["PCV"]),
            fullMark: 46,
          },
          {
            parameter: "RBC",
            value: parseFloat(data["RBC Count"]),
            fullMark: 5.4,
          },
          {
            parameter: "Platelets",
            value: parseFloat(data["Platelet Count"]) / 1000,
            fullMark: 450,
          },
          {
            parameter: "WBC",
            value:
              parseFloat(
                data["Total Leucocyte Count"] || data["Total WBC Count"]
              ) / 1000,
            fullMark: 11,
          },
        ];

        setBloodCountData(bloodCountTableData);
        setRadarData(radarChartData);
      } else {
        console.error("Failed to fetch data from the API");
        setErrorState(true); // Set error state on failed fetch
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrorState(true); // Set error state on catch
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Fetch data on component mount
  useEffect(() => {
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

  // Show loading spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <style>{styles}</style>
        <div style={spinnerStyle}></div>
        <p className="text-lg font-semibold text-gray-600 ml-4">
          Loading CBC...
        </p>
      </div>
    );
  }

  // Show error state if fetch fails
  if (errorState) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-lg font-semibold text-red-600 mb-4">
          Failed to fetch data. Please try again.
        </p>
        <button
          onClick={fetchData} // Retry fetch on button click
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-6 mt-4">
      {/* Left Section: Complete Blood Count Details Table */}
      <div className="bg-gray-500 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">
          Complete Blood Count Details
        </h2>
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500">
              <th className="py-2">TEST</th>
              <th className="py-2">RESULT</th>
              <th className="py-2">NORMAL RANGE</th>
            </tr>
          </thead>
          <tbody>
            {bloodCountData.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="py-3">{item.test}</td>
                <td className="py-3 font-semibold">{item.result}</td>
                <td className="py-3 text-gray-500">{item.normalRange}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Right Section: Blood Parameters Visualization and Trend Analysis */}
      <div className="bg-gray-600 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">
          Blood Parameters Visualization
        </h2>

        {/* Radar Chart */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="parameter" />
              <PolarRadiusAxis angle={90} domain={[0, "auto"]} />
              <Radar
                name="Blood Parameters"
                dataKey="value"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.3}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Trend Analysis Placeholder */}
        <h3 className="text-lg font-semibold mt-6 mb-2">
          Trend Analysis (Last 3 Tests)
        </h3>
        <div className="h-24 bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Trend Analysis Chart Placeholder</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="col-span-2 flex justify-end space-x-3 mt-4">
        <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-300">
          Add Notes
        </button>
        <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-300">
          Print Report
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Share with Doc
        </button>
      </div>
    </div>
  );
};

export default CompleteBloodCount;
