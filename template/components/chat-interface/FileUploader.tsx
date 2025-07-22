'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { FileUp, X, File as FileIcon } from 'lucide-react';

export default function FileUploader() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = () => {
    if (selectedFile) {
      // In a real implementation, you would upload the file to your server here
      alert(`File "${selectedFile.name}" would be uploaded in the real implementation.`);
    } else {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf,.csv,.xlsx,.xls,.doc,.docx"
      />
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => fileInputRef.current?.click()} 
        className="p-0 h-8 w-8"
        aria-label="Upload file"
      >
        <FileUp size={18} />
      </Button>
    </div>
  );
} 