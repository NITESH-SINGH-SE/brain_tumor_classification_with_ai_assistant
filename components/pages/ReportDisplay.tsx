"use client";

import { useState, useMemo } from 'react';
import { usePatientStore } from "@/stores/usePatientStore";
import { useUnlockStore } from '@/stores/unlockStore';
import axios from 'axios';
import ReportCard from '../ui/report-card';
import { IconLock, IconLockOpen } from "@tabler/icons-react";
import LockableCard from '../ui/lockableCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ReportDisplay() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
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

  const handleDownload = async () => {
    try {
      // const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL_LOCAL
      const response = await axios.get(`${backendUrl}/download_report`, {
        params: {
          path: report_path, // Replace with the correct full path
        },
        responseType: 'blob', // Important for binary file
      });

      // Create a blob URL and simulate a click to download the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'report.pdf'); // filename to save
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success('Successfully downloaded file.')
    } catch (error) {
      console.error('Error downloading the file:', error);
      toast.error('Error downloading the file.')
    }
  };
  
  const parseTextToList = (text: string): string[] => {
  try {
    if (!text || typeof text !== 'string') return [];

    // Normalize newlines and trim
    const cleaned = text.trim().replace(/\r\n/g, '\n');

    // Split into lines and filter potential bullets
    const lines = cleaned.split('\n').map(line => line.trim());
    const bullets = lines.filter(line =>
      /^[-*•]\s+/.test(line) || /^\d+[\.\)]\s+/.test(line) // markdown bullets or numbered
    );

    // Remove bullet symbols and trim
    return bullets.length > 0
      ? bullets.map(line => line.replace(/^([-*•]|\d+[\.\)])\s+/, '').trim())
      : [cleaned]; // fallback to raw text in array
  } catch {
    return [text]; // fallback in case of unexpected input
  }
};

  const parsedDescription = useMemo(() => parseTextToList(description), [description]);
  const parsedPrecautions = useMemo(() => parseTextToList(precautions), [precautions]);

  const reportContent = (
    <ReportCard
      description={parsedDescription}
      precautions={parsedPrecautions}
      handleDownload={handleDownload}
    />
  );
//   return (
//     <>
//     {
//       !prediction ? (
//         <div className="shadow-input mx-auto w-full max-w-5xl rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-neutral-800">
//           <IconLock className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500 mb-4" stroke={1.5} />
//           <div className="text-center text-lg text-gray-700 dark:text-gray-300">
//             Please upload patient details to unlock the report.
//           </div>
//         </div>
//       ): (
//         <>
//           {/* <h2>Description</h2>
//           <p>{description}</p>
//           <h2>Precuations</h2>
//           <p>{precautions}</p>
//           <button onClick={handleDownload} className="px-4 py-2 bg-blue-500 text-white rounded">
//             Download Report
//           </button> */}
//           <div>
//           <ReportCard
//               description={parsedDescription}
//               precautions={parsedPrecautions}
//               handleDownload={handleDownload}
//             />
//           </div>
//           {/* <button
//             onClick={handleSendEmail}
//             disabled={loading || !email}
//             className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//           >
//             {loading ? 'Sending...' : 'Send Report via Email'}
//           </button>
//           {status && <p className="text-sm text-gray-700 mt-2">{status}</p>} */}
//         </>
//       )
//     }
//     </>
// );

  return (
    <>
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      hideProgressBar={false}
      // newestOnTop={true}
      closeOnClick
      // rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
    <LockableCard
      lockedText="Please unlock prediction before report."
      unlockedText="Click on the lock to unlock report."
      lockedIcon={<IconLock stroke={1.5} className="mx-auto h-16 w-16 mb-4 " />}
      unlockedIcon={<IconLockOpen stroke={1.5} size={40} className="mx-auto h-16 w-16 mb-4" />}
      content={reportContent}
      unlockCondition={predictionUnlocked}
      onUnlock={() => setReportUnlocked(true)}
      lockIconColor = "text-blue-400"
      lockIconColorDark = "dark:text-blue-400"
      unlockIconColor = "text-emerald-400"
      unlockIconColorDark = "dark:text-emerald-400"
    />
    </>
  );
}