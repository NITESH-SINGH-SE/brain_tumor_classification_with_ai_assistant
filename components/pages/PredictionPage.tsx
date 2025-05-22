"use client";

import { usePatientStore } from "@/stores/usePatientStore";
import { useUnlockStore } from "@/stores/unlockStore";
import PredictionCard from "../ui/prediction-card";
import { IconLock, IconLockOpen } from "@tabler/icons-react";
import LockableCard from "../ui/lockableCard";


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
  
  const {
    predictionUnlocked,
    reportUnlocked,
    setPredictionUnlocked,
    setReportUnlocked,
  } = useUnlockStore();

  const predictionContent = (
    <PredictionCard
        original_image={original_image}
        gradcam_image={gradcam_image}
        prediction={prediction}
        confidence={confidence}
      />
  )
  return (
    <LockableCard
          lockedText="Please upload patient details to unlock prediction."
          unlockedText="Click on the lock to unlock prediction."
          lockedIcon={<IconLock stroke={1.5} className="mx-auto h-16 w-16 mb-4 " />}
          unlockedIcon={<IconLockOpen stroke={1.5} size={40} className="mx-auto h-16 w-16 mb-4" />}
          content={predictionContent}
          unlockCondition={!!prediction}
          onUnlock={() => setPredictionUnlocked(true)}
          lockIconColor = "text-blue-400"
          lockIconColorDark = "dark:text-blue-400"
          unlockIconColor = "text-emerald-400"
          unlockIconColorDark = "dark:text-emerald-400"
        />
);
}