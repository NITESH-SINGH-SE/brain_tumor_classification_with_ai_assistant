"use client";
import React, { useState } from "react";
import axios from 'axios';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";

import { usePatientStore, PatientState } from "@/store/usePatientStore";

export default function PatientInfoForm() {
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

  const [result, setResult] = useState<any>(null);
  const [form, setForm] = useState({
    name: '',
    age: '',
    gender: '',
    email: '',
    symptoms: '',
    image: null as File | null,
  });

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (form: any) => {
    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      if (form[key]) {
        formData.append(key, form[key]);
      }
    });

    try {
      const res = await axios.post('http://localhost:8000/predict', formData);
      setResult(res.data);

      const allowedKeys: (keyof PatientState)[] = [
        'name', 'age', 'gender', 'email', 'symptoms', 'prediction',
        'confidence', 'original_image', 'gradcam_image',
        'description', 'precautions', 'report_path'
      ];

      for (const [key, value] of Object.entries(res.data)) {
        if (allowedKeys.includes(key as keyof PatientState)) {
          setField(key as keyof PatientState, value);
        }
      }

    } catch (err) {
      alert('Prediction failed. Check backend.');
      console.error(err);
    }
  };

  return (
    <div className="shadow-input mx-auto w-full max-w-5xl rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Patient Information
      </h2>
      <div className="my-8 flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-2/3 space-y-4">
          <LabelInputContainer className="mb-4">
            <Label htmlFor="name">Name</Label>
            <Input name="name" placeholder="Your Name" type="text" value={(form as any)["name"]} onChange={handleChange} />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="age">Age</Label>
            <Input name="age" placeholder="0" type="number" value={(form as any)["age"]} onChange={handleChange} />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input name="email" placeholder="example@email.com" type="email" value={(form as any)["email"]} onChange={handleChange} />
          </LabelInputContainer>
          
          <LabelInputContainer className="mb-4">
            <Label htmlFor="symptoms">Symptoms</Label>
            <Input name="symptoms" placeholder="Symptoms" type="text" value={(form as any)["symptoms"]} onChange={handleChange} />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="gender">Gender</Label>
            <select id="gender" name="gender" className="text-sm font-medium text-black dark:text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 p-2 rounded border" onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </LabelInputContainer>
        {/* <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
          <input className="hidden" type="file" name="image" accept="image/*" onChange={handleChange} />
        </div> */}
        </div>
        
        <div className="w-full md:w-1/3 flex items-center justify-center">
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    {/* <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p> */}
                </div>
                <input type="file" name="image" accept="image/*" onChange={handleChange} />
            </label>
        </div> 

      </div>
      <button
          onClick={() => handleSubmit(form)}
          className="px-8 py-2 rounded-md bg-blue-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-blue-500"
        >
          Predict
      </button>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};
 
const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};