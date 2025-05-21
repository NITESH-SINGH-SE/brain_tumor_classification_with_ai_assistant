import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { IconUpload } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";

export const ImageUpload = ({
  onChange,
}: {
  onChange?: (files: File[]) => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (files: File[]) => {
    const file = files[0];
    if (!file) return;

    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    onChange?.([file]); // 🔁 always return File[] for consistency
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const { getRootProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    multiple: false,
    noClick: true,
    onDrop: handleFileChange,
    onDropRejected: (err) => {
      console.error("Rejected:", err);
    },
  });

  return (
    <div className="w-full" {...getRootProps()}>
      <motion.div
        onClick={handleClick}
        whileHover={{ scale: 1.02 }}
        className={cn(
          "p-10 group/image block rounded-lg cursor-pointer w-full relative overflow-hidden border border-dashed border-gray-300 dark:border-neutral-700",
          isDragActive && "border-sky-500 bg-blue-50 dark:bg-neutral-800"
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center text-center">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview"
              className="max-h-48 rounded-md object-contain"
            />
          ) : (
            <>
              <IconUpload className="w-8 h-8 text-neutral-500 dark:text-neutral-300 mb-2" />
              <p className="text-neutral-700 dark:text-neutral-300 font-medium">
                Click or drag to upload image
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                JPG, PNG, GIF up to 5MB
              </p>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};
