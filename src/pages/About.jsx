import React from "react";

const About = () => {
  const team = [
    "Aryan Shrestha",
    "Ruksana Shrestha",
    "Saksham Thapa",
    "Sameer Maharjan",
  ];
  const features = [
    "Real-time URL analysis",
    "Machine learning-based detection",
    "Detailed security reports",
  ];

  return (
    <div className="max-w-4xl mx-auto my-16 px-6 font-sans">
      <div className="bg-white rounded-lg shadow-lg p-10">
        <h3 className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-3">
          <i className="fas fa-info-circle text-blue-500"></i>
          About Our Phishing Detection System
        </h3>

        <div className="grid grid-cols-2 gap-12">
          <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6">
            <h5 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <i className="fas fa-shield-alt text-blue-500"></i> Our Team
            </h5>
            <p className="text-gray-600 mb-6 text-base">
              We are Final Year Students of BE IT who designed and developed
              this project as a part of our FYP.
            </p>
            <ul className="space-y-3">
              {team.map((member) => (
                <li
                  key={member}
                  className="flex items-center text-gray-700 text-base"
                >
                  <i className="fas fa-check-circle text-green-500 mr-2"></i>
                  {member}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6">
            <h5 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <i className="fas fa-lock text-blue-500"></i> Security Features
            </h5>
            <p className="text-gray-600 mb-6 text-base">
              Our system provides comprehensive protection against various types
              of phishing attacks:
            </p>
            <ul className="space-y-3">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center text-gray-700 text-base"
                >
                  <i className="fas fa-shield-alt text-blue-500 mr-2"></i>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 bg-blue-50 rounded-md p-6 flex items-center gap-4 text-blue-700 text-sm">
          <i className="fas fa-lightbulb text-blue-400"></i>
          <p>
            <strong>Tip:</strong> Always verify the URL before entering
            sensitive information, even if it appears legitimate.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
