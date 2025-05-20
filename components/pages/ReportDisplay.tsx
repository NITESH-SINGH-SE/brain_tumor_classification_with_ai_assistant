"use client";

import { useState } from 'react';
import { usePatientStore } from "@/store/usePatientStore";
import axios from 'axios';

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

  const handleDownload = async () => {
    try {
      const response = await axios.get('http://localhost:8000/download_report', {
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
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };

  // const handleSendEmail = async () => {
  //   setLoading(true);
  //   setStatus('');

  //   try {
  //     const response = await axios.post('http://localhost:8000/email_report', null, {
  //       params: {
  //         email: email,
  //         path: report_path  // Update this with actual path on your server
  //       }
  //     });

  //     setStatus(response.data.message);
  //   } catch (error) {
  //     setStatus('Failed to send email.');
  //     console.error(error);
  //   }

  //   setLoading(false);
  // };
  return (
    <>
    {
      !prediction ? (
        <div>Here are our ReportDisplay</div>
      ): (
        <>
          <h2>Description</h2>
          <p>{description}</p>
          <h2>Precuations</h2>
          <p>{precautions}</p>
          <button onClick={handleDownload} className="px-4 py-2 bg-blue-500 text-white rounded">
            Download Report
          </button>
          {/* <button
            onClick={handleSendEmail}
            disabled={loading || !email}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            {loading ? 'Sending...' : 'Send Report via Email'}
          </button>
          {status && <p className="text-sm text-gray-700 mt-2">{status}</p>} */}
        </>
      )
    }
    </>
);
}