import React from "react";
import { Timeline } from "@/components/ui/timeline";
import PatientInfoForm from "@/components/pages/PatientInfoForm";
import PredictionPage from "@/components/pages/PredictionPage";
import ReportDisplay from "@/components/pages/ReportDisplay";
import HealthAssistantChatbot from "@/components/pages/HealthAssistantChatbot";
import BackgroundFloatingPaths from "@/components/ui/background-floating-paths";
import Navbar from "@/components/ui/navbar";

export default function TimelineDemo() {
  const data = [
    {
      title: "Patient Info",
      content: (
        <PatientInfoForm/>
      ),
    },
    {
      title: "Prediction",
      content: (
        <PredictionPage />
      ),
    },
    {
      title: "Report",
      content: (
        <ReportDisplay />
      ),
    },
    {
      title: "Health Assistant",
      content: (
        <HealthAssistantChatbot />
      ),
    },
  ];
  return (
    <div className="relative w-full overflow-clip">
      <BackgroundFloatingPaths
        // color="rgba(255,255,255,0.3)"
        count={25}
        baseOpacity={0.5}
        // baseStrokeWidth={0.3}
      />
      <Navbar/>
      <Timeline data={data} />
    </div>
  );
}
