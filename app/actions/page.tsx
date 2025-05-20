"use client";

import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
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

// Import your sections
import HomePage from "@/components/pages/HomePage";
import PatientInfoForm from "@/components/pages/PatientInfoForm";
import PredictionPage from "@/components/pages/PredictionPage";
import ReportDisplay from "@/components/pages/ReportDisplay";
import HealthAssistantChatbot from "@/components/pages/HealthAssistantChatbot";

export default function FloatingDockDemo() {
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#home",
    },
    {
      title: "Patient Info",
      icon: (
        <IconUserPlus className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#patient-info",
    },
    {
      title: "Prediction",
      icon: (
        <IconBrain className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#predict",
    },
    {
      title: "Report",
      icon: (
        <IconFileText className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#report-display",
    },
    {
      title: "Health Assistant",
      icon: (
        <IconMessages className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#health-assistant",
    },
  ];

  return (
    <main className="relative min-h-screen bg-white dark:bg-black text-black dark:text-white scroll-smooth">
      {/* Sections */}
      <section id="home" className="min-h-screen flex items-center justify-center">
        <HomePage />
      </section>

      <section id="patient-info" className="min-h-screen flex items-center justify-center">
        <PatientInfoForm />
      </section>

      <section id="predict" className="min-h-screen flex items-center justify-center">
        <PredictionPage />
      </section>

      <section id="report-display" className="min-h-screen flex items-center justify-center">
        <ReportDisplay />
      </section>

      <section id="health-assistant" className="min-h-screen flex items-center justify-center">
        <HealthAssistantChatbot />
      </section>

      {/* Floating Dock */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
        <FloatingDock desktopClassName="bg-white/70 backdrop-blur-xs rounded-xl shadow-lg p-2" mobileClassName="bg-white/70 backdrop-blur-xs rounded-xl shadow-lg p-2" items={links} />
      </div>
    </main>
  );
}
