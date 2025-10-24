import React, { useRef } from 'react';

interface UploadImageProps {
  onUpload: (file: File) => void;
}

export default function UploadImage({ onUpload }: UploadImageProps) {
  const fileInput = useRef<HTMLInputElement | null>(null);

  return (
    <div className="mb-4">
      <button
        className="px-3 py-1 bg-gray-700 text-gray-200 rounded text-sm"
        onClick={() => fileInput.current && fileInput.current.click()}
      >
        Upload Your Own Image
      </button>
      <input
        type="file"
        accept="image/*"
        ref={fileInput}
        style={{ display: 'none' }}
        onChange={e => {
          const files = e.target.files;
          if (files && files[0]) onUpload(files[0]);
        }}
      />
    </div>
  );
}
