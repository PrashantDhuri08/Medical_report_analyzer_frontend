// HowItWorks.jsx
import React from "react";

const HowItWorks = () => {
  return (
    <div className="bg-black mt-4 p-6 rounded-lg shadow border-4 ">
      <h2 className="text-xl font-semibold mb-4">How It Works</h2>
      <div className="space-y-4">
        <div className="flex items-start">
          <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center mr-3">
            1
          </span>
          <div>
            <h3 className="font-semibold">Upload Your Report</h3>
            <p className="text-gray-500">
              Upload a clear image of your medical report. Ensure all text is
              legible and the image is not blurry.
            </p>
          </div>
        </div>
        <div className="flex items-start">
          <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center mr-3">
            2
          </span>
          <div>
            <h3 className="font-semibold">Automatic Data Extraction</h3>
            <p className="text-gray-500">
              Our AI system will automatically extract key health parameters
              from your report, including hemoglobin levels, platelet count, and
              other vital metrics.
            </p>
          </div>
        </div>
        <div className="flex items-start">
          <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center mr-3">
            3
          </span>
          <div>
            <h3 className="font-semibold">Risk Analysis</h3>
            <p className="text-gray-500">
              Receive detailed risk assessments for anemia and dengue based on
              your report data, along with personalized health recommendations.
            </p>
          </div>
        </div>
      </div>

      {/* Important Note */}
      <div className="bg-yellow-50 p-4 rounded-lg mt-4">
        <p className="text-yellow-700">
          <span className="font-semibold">Important Note:</span> This tool is
          for informational purposes only and does not replace professional
          medical advice. Always consult with a healthcare provider for medical
          decisions.
        </p>
      </div>
    </div>
  );
};

export default HowItWorks;
