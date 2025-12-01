'use client';

import { useState, useRef } from 'react';
import { Avatar, IconButton } from '@mui/material';
import { CloudUpload as CloudUploadIcon, Delete as DeleteIcon } from '@mui/icons-material';

interface ImageDropzoneProps {
  currentImage?: string;
  userName?: string;
}

export default function ImageDropzone({ currentImage, userName }: ImageDropzoneProps) {
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <Avatar
          src={preview || undefined}
          alt={userName || 'User'}
          sx={{
            width: 120,
            height: 120,
            backgroundColor: 'var(--color-brand-crimson)',
            color: 'white',
            fontWeight: 700,
            fontSize: '2.5rem',
          }}
        >
          {!preview && getInitials(userName)}
        </Avatar>
        {preview && (
          <IconButton
            onClick={handleRemove}
            sx={{
              position: 'absolute',
              top: -8,
              right: -8,
              backgroundColor: 'white',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              '&:hover': {
                backgroundColor: '#f5f5f5',
              },
            }}
            size="small"
          >
            <DeleteIcon fontSize="small" sx={{ color: 'var(--color-brand-crimson)' }} />
          </IconButton>
        )}
      </div>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`w-full max-w-md border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
          isDragging
            ? 'border-[var(--color-brand-crimson)] bg-[rgba(165,28,48,0.04)]'
            : 'border-gray-300 hover:border-[var(--color-brand-crimson)] hover:bg-gray-50'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <CloudUploadIcon
          sx={{
            fontSize: 48,
            color: isDragging ? 'var(--color-brand-crimson)' : 'var(--color-subtle)',
            mb: 2,
          }}
        />
        <p className="text-sm font-medium mb-1" style={{ color: 'var(--color-heading)' }}>
          Click to upload or drag and drop
        </p>
        <p className="text-xs" style={{ color: 'var(--color-subtle)' }}>
          PNG, JPG, GIF up to 10MB
        </p>
      </div>
    </div>
  );
}
