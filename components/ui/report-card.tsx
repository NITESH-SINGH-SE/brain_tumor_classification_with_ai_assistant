import React from 'react';

interface ReportCardProps {
  description: string[];
  precautions: string[];
  handleDownload: () => void;
}

const ReportCard: React.FC<ReportCardProps> = ({ description, precautions, handleDownload }) => {
  return (
    <div>
      {/* Title Section */}
      <div className="my-8 px-2">
        <h2 className="text-2xl font-semibold">Description</h2>
        <p className="mt-2 text-lg">{description}</p>
      </div>

      <div className="my-8 mt-16 px-2">
        <h2 className="text-2xl font-semibold">Precautions</h2>
        <p className="mt-2 text-lg">{precautions}</p>
      </div>

      {/* Button Section */}
      <div className="my-8 text-center">
        <button
          onClick={handleDownload}
          className="px-8 py-2 rounded-md bg-blue-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-blue-500"
        >
          Download Report
        </button>
      </div>
    </div>
  );
};

export default ReportCard;
