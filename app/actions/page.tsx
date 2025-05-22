import React from "react";
import { Timeline } from "@/components/ui/timeline";
import PatientInfoForm from "@/components/pages/PatientInfoForm";
import PredictionPage from "@/components/pages/PredictionPage";
import ReportDisplay from "@/components/pages/ReportDisplay";
import HealthAssistantChatbot from "@/components/pages/HealthAssistantChatbot";
import BackgroundFloatingPaths from "@/components/ui/background-floating-paths";
import Navbar from "@/components/ui/navbar";
import { DockControlledTimeline } from "@/components/ui/custom-dock-timeline";
import {
  IconBrain,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
  IconUserPlus,
  IconFileText,
  IconMessages,
} from "@tabler/icons-react";

export default function TimelineDemo() {
  const data = [
    {
      title: "Patient Details",
      navbarTitle: "Patient Details",
      icon: (
        <IconUserPlus className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      content: (
        <PatientInfoForm/>
      ),
    },
    {
      title: "Prediction",
      navbarTitle: "Prediction",
      icon: (
        <IconBrain className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        ),
      content: (
        <PredictionPage />
      ),
    },
    {
      title: "Report",
      navbarTitle: "Report",
      icon: (
            <IconFileText className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        ),
      content: (
        <ReportDisplay />
      ),
    },
    {
      title: "Health Assistant",
      navbarTitle: "Health Assistant",
      icon: (
              <IconMessages className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
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
      {/* <Timeline data={data} /> */}
      <DockControlledTimeline heading="How It Works" subheading="Navigate through step-by-step flow of the application from collecting patient information to AI-driven tumor prediction, report generation, and personalized support through the health assistant." items={data}/>
    </div>
  );
}
