"use client";

import { usePatientStore } from "@/store/usePatientStore";
import PredictionCard from "../ui/prediction-card";
import { IconLock } from "@tabler/icons-react";

export default function PredictionPage() {
  const { 
        name, 
        age, 
        gender, 
        email, 
        symptoms, 
        prediction,
        confidence,
        original_image,
        gradcam_image,
        description,
        precautions,
        report_path,setField, reset } = usePatientStore();
  return (
    <>
    {
      !prediction ? (
        <div className="shadow-input mx-auto w-full max-w-5xl rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-neutral-800">
          <IconLock className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500 mb-4" stroke={1.5} />
          <div className="text-center text-lg text-gray-700 dark:text-gray-300">
            Please upload patient details to unlock the prediction.
          </div>
        </div>
      ): (
        <>
            {/* <div className="grid grid-cols-2 gap-4">
                <div>
                <h3 className="font-semibold">Original Image</h3>
                <img src={`data:image/jpeg;base64,${original_image}`} alt="Original" className="rounded" />
                </div>
                <div>
                <h3 className="font-semibold">Grad-CAM Heatmap</h3>
                <img src={`data:image/jpeg;base64,${gradcam_image}`} alt="Heatmap" className="rounded" />
                </div>
            </div>
            <p className="text-xl text-center mt-4">Prediction: <strong>{prediction}</strong></p>
            <p className="text-center mt-2">Confidence: {confidence}</p> */}
            <PredictionCard
              original_image={original_image}
              gradcam_image={gradcam_image}
              prediction={prediction}
              confidence={confidence}
            />
        </>
      )
    }
    </>
);
}