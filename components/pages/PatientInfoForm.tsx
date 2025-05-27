"use client";
import React, { useState } from "react";
import axios from 'axios';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FileUpload } from "../ui/file-upload";
import { ImageUpload } from "../ui/image-upload";
import { cn } from "@/lib/utils";
import { MultiStepLoader as Loader } from "../ui/multi-step-loader";
import { IconSquareRoundedX } from "@tabler/icons-react";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { usePatientStore, PatientState } from "@/stores/usePatientStore";

const backendUrl = process.env.BACKEND_URL

const loadingStates = [
  { text: "Uploading Patient Info." },
  { text: "Uploading Image" },                     // Optional: if image upload is involved
  { text: "Preprocessing Image" },
  { text: "Analyzing with CNN" },
  { text: "Generating Heatmap" },
  { text: "Storing Data" },
  { text: "Summarizing Diagnosis" },
  { text: "Recommending Precautions" },
  { text: "Compiling Final Report" },
];

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
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [form, setForm] = useState({
    name: '',
    age: '',
    gender: '',
    email: 'email',
    symptoms: '',
    image: null as File | null,
  });

  type FormData = {
  name: string;
  age: string;
  gender: string;
  email: string;
  symptoms: string;
  image: File | null;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const validateForm = (form: FormData): FormErrors => {
  const errors: FormErrors = {};

  if (!form.name.trim()) errors.name = "Name is required";
  if (!form.age.trim()) errors.age = "Age is required";
  if (!form.gender.trim()) errors.gender = "Gender is required";
  if (!form.email.trim()) errors.email = "Email is required";
  if (!form.symptoms.trim()) errors.symptoms = "Symptoms are required";
  if (!form.image) errors.image = "Image is required";

  // toast.warning("Please fill required fields.")

  return errors;
};


  const [files, setFiles] = useState<File[]>([]);
  const handleFileUpload = (uploadedFiles: File[]) => {
  if (uploadedFiles.length === 0) return;

  const file = uploadedFiles[0]; // Since you're accepting only one file
  setForm((prev) => ({
    ...prev,
    image: file, // Adjust the field name as per your form structure
  }));
};

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (form: any) => {
    const errors = validateForm(form);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
    return; // Stop if there are validation errors
  }
    setLoading(true)
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
    if (value) formData.append(key, value as string | Blob);
  });


    try {
      // const res = await axios.post('http://localhost:8000/predict', formData);
      // const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL_LOCAL
      const res = await axios.post(`${backendUrl}/predict`, formData);
      setResult(res.data);

      const allowedKeys: (keyof PatientState)[] = [
        'name', 'age', 'gender', 'email', 'symptoms', 'prediction',
        'confidence', 'original_image', 'gradcam_image',
        'description', 'precautions', 'report_path'
      ];

      for (const [key, value] of Object.entries(res.data)) {
        if (allowedKeys.includes(key as keyof PatientState)) {
          setField(key as keyof PatientState, value as PatientState[keyof PatientState]);
        }
      }

    } catch (err) {
      // toast.error('Prediction failed. Check backend.');
      console.error(err);
    }
    setLoading(false)
    toast.success("Data Uploaded. Check Prediction!")
  };

  return (
    <div className="shadow-input mx-auto w-full max-w-5xl rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-neutral-800">
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
      <Loader loadingStates={loadingStates} loading={loading} duration={2000} />
      <div className="my-8 flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-2/3 space-y-4">
          <LabelInputContainer className="mb-4">
            <Label htmlFor="name">Name</Label>
            <Input name="name" placeholder="Your Name" type="text" value={(form as any)["name"]} onChange={handleChange} />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="age">Age</Label>
            <Input name="age" placeholder="0" type="number" value={(form as any)["age"]} onChange={handleChange} className={cn(formErrors.name && "border-red-500")}/>
            {formErrors.name && <p className="text-sm text-red-500">{formErrors.name}</p>}
          </LabelInputContainer>

          {/* <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input name="email" placeholder="example@email.com" type="email" value={(form as any)["email"]} onChange={handleChange} />
          </LabelInputContainer> */}
          
          <LabelInputContainer className="mb-4">
            <Label htmlFor="symptoms">Symptoms</Label>
            <Input name="symptoms" placeholder="Symptoms" type="text" value={(form as any)["symptoms"]} onChange={handleChange} className={cn(formErrors.symptoms && "border-red-500")}/>
            {formErrors.symptoms && <p className="text-sm text-red-500">{formErrors.symptoms}</p>}
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="gender">Gender</Label>
            <select id="gender" name="gender" 
              // className="text-sm font-medium text-black dark:text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 p-2 rounded border" 
              // shadow-input dark:placeholder-text-neutral-600 flex h-10 w-full rounded-md border-none bg-gray-50 px-3 py-2 text-base text-black transition duration-400 group-hover/input:shadow-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:ring-[2px] focus-visible:ring-neutral-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-800 dark:text-white dark:shadow-[0px_0px_1px_1px_#404040] dark:focus-visible:ring-neutral-600
              className={cn(
                `shadow-input dark:placeholder-text-neutral-600 flex h-10 w-full rounded-md border-none bg-gray-50 px-3 py-2 text-sm text-black transition duration-400 group-hover/input:shadow-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:ring-[2px] focus-visible:ring-neutral-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-800 dark:text-white dark:shadow-[0px_0px_1px_1px_#404040] dark:focus-visible:ring-neutral-600`,
              formErrors.gender && "border-red-500")}
              onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
            {formErrors.gender && <p className="text-sm text-red-500">{formErrors.gender}</p>}
          </LabelInputContainer>
        {/* <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
          <input className="hidden" type="file" name="image" accept="image/*" onChange={handleChange} />
        </div> */}
        </div>
        
        {/* <div className="w-full md:w-1/3 flex items-center justify-center">
            <input id="dropzone-file" className="hidden" type="file" name="image" accept="image/*" onChange={handleChange} />
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                </div>
            </label>
        </div>  */}

        {/* <div className="w-full md:w-1/3 flex items-center justify-center">
  <input 
    id="dropzone-file" 
    type="file" 
    className="hidden" 
    accept="image/*" 
    onChange={handleChange} 
  />
  <label
    htmlFor="dropzone-file"
    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 transition-colors duration-200"
  >
    <div className="flex flex-col items-center justify-center pt-5 pb-6">
      <svg
        className="w-10 h-10 mb-3 text-gray-400 dark:text-gray-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4"
        />
      </svg>
      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
        <span className="font-semibold">Click to upload</span> or drag and drop
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or GIF (max. 10MB)</p>
    </div>
  </label>
</div> */}


        <div className="w-full md:w-1/3 flex items-center justify-center">
          <ImageUpload onChange={handleFileUpload} />
          {formErrors.image && <p className="text-sm text-red-500">{formErrors.image}</p>}
        </div>
        
      </div>

      {/* Button Section */}
      <div className="my-8 text-center">
        <button
          onClick={() => handleSubmit(form)}
          className="px-8 py-2 rounded-md bg-blue-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-blue-500"
        >
          Predict
        </button>
      </div>
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