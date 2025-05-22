import { create } from 'zustand';

export interface PatientState {
  name: string;
  age: number;
  gender: string;
  email: string;
  symptoms: string;
  prediction: string;
  confidence: number;
  original_image: string;
  gradcam_image: string;
  description: string;
  precautions: string;
  report_path: string;
  setField: <K extends keyof PatientState>(field: K, value: PatientState[K]) => void;
  reset: () => void;
}

export const usePatientStore = create<PatientState>((set) => ({
  name: '',
  age: 0,
  gender: '',
  email: '',
  symptoms: '',
  prediction: '',
  confidence: 0,
  original_image: '',
  gradcam_image: '',
  description: '',
  precautions: '',
  report_path: '',
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
  reset: () =>
    set({
      name: '',
      age: 0,
      gender: '',
      email: '',
      symptoms: '',
      prediction: '',
      confidence: 0,
      original_image: '',
      gradcam_image: '',
      description: '',
      precautions: '',
      report_path: '',
      setField: () => {}, // will be overwritten immediately
      reset: () => {},    // will be overwritten immediately
    }),
}));
