"use client";

import { usePatientStore } from "@/store/usePatientStore";

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
        <div>Here are our Prediction</div>
      ): (
        <>
            <h2 className="text-2xl font-bold mb-4 text-center">Prediction Result</h2>
            <div className="grid grid-cols-2 gap-4">
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
            <p className="text-center mt-2">Confidence: {confidence}</p>
        </>
      )
    }
    </>
);
}