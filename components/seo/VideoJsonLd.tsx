import React from 'react';

interface VideoSchemaProps {
  title: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string; // ISO 8601 format (YYYY-MM-DD)
  contentUrl: string; // لینک فایل ویدیو
}

export default function VideoJsonLd({ title, description, thumbnailUrl, uploadDate, contentUrl }: VideoSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": title,
    "description": description,
    "thumbnailUrl": [thumbnailUrl],
    "uploadDate": uploadDate,
    "contentUrl": contentUrl,
    // اگر مدت زمان را دارید، اینجا اضافه کنید (ISO 8601 duration format)
    // "duration": "PT24M", 
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}