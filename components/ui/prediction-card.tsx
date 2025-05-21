import React from 'react';

interface PredictionCardProps {
  original_image: string;
  gradcam_image: string;
  prediction: string;
  confidence: number;
}

const PredictionCard: React.FC<PredictionCardProps> = ({ original_image, gradcam_image, prediction, confidence }) => {
  // Format confidence value to 4 decimal places
  const formattedConfidence = confidence.toFixed(4);
  const confidencePercentage = (confidence * 100).toFixed(2);

  return (
    // <div className="shadow-input mx-auto w-full max-w-5xl rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
    //   <div className="p-6">
    //     {/* Image and Confidence Section */}
    //     <div className="space-y-6">
    //       {/* Prediction */}
    //       <div className="text-center">
    //         <h2 className="text-2xl font-semibold">Prediction: </h2>
    //         <p className="mt-2 text-lg text-indigo-600 font-bold">{prediction}</p>
    //       </div>

    //       {/* Images */}
    //       <div className="grid grid-cols-2 gap-4">
    //         {/* Original Image */}
    //         <div>
    //           <h3 className="font-semibold">Original Image</h3>
    //           <img
    //             src={`data:image/jpeg;base64,${original_image}`}
    //             alt="Original"
    //             className="w-full h-auto rounded-lg shadow-lg"
    //           />
    //         </div>

    //         {/* Grad-CAM Heatmap */}
    //         <div>
    //           <h3 className="font-semibold">Grad-CAM Heatmap</h3>
    //           <img
    //             src={`data:image/jpeg;base64,${gradcam_image}`}
    //             alt="Grad-CAM Heatmap"
    //             className="w-full h-auto rounded-lg shadow-lg"
    //           />
    //         </div>
    //       </div>

    //       {/* Confidence Display */}
    //       <div className="text-center">
    //         <h3 className="text-xl font-semibold">Prediction Confidence</h3>
    //         <p className="mt-2 text-lg">{formattedConfidence}</p>
    //         <p className="text-sm">
    //           Confidence Level: <span className="font-bold text-indigo-600">{confidencePercentage}%</span>
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="shadow-input mx-auto w-full max-w-5xl rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-neutral-800">
      <div className="space-y-8">
        {/* Prediction */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold">
            Prediction: <span className="text-blue-500 font-bold">{prediction}</span>
          </h2>
        </div>

        {/* Images */}
        <div className="flex flex-col md:flex-row md:justify-center md:gap-8 gap-6 items-center">
          {/* Original Image */}
          <div className="flex flex-col items-center w-full md:w-1/2">
            <h3 className="font-semibold mb-2 text-lg">Original Image</h3>
            <img
              src={`data:image/jpeg;base64,${original_image}`}
              alt="Original"
              className="w-full max-w-xs h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Grad-CAM Heatmap */}
          <div className="flex flex-col items-center w-full md:w-1/2">
            <h3 className="font-semibold mb-2 text-lg">Grad-CAM Heatmap</h3>
            <img
              src={`data:image/jpeg;base64,${gradcam_image}`}
              alt="Grad-CAM Heatmap"
              className="w-full max-w-xs h-auto rounded-lg shadow-md"
            />
          </div>
        </div>

        {/* Confidence */}
        <div className="text-center">
          <h3 className="text-xl font-semibold">
            Confidence Level: <span className="text-blue-500 font-bold">{confidencePercentage}%</span>
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Confidence: <span className="font-semibold text-base">{formattedConfidence}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PredictionCard;
