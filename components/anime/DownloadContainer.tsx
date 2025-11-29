"use client";

import { useState } from "react";
import { DownloadBox, DownloadItem } from "./DownloadBox";
import { QualitySelector } from "./QualitySelector";

interface DownloadContainerProps {
  items: DownloadItem[];
  qualities?: string[];
}

export function DownloadContainer({ items, qualities = ["480", "720", "1080"] }: DownloadContainerProps) {
  const [selectedQuality, setSelectedQuality] = useState(qualities[qualities.length - 1]); // Default to highest (last)

  // Filter items based on selected quality
  // Assuming items have a 'resolution' or we filter by 'quality' text if it matches.
  // For this mock, we'll assume 'quality' might contain the resolution or we add a resolution field to DownloadItem.
  // Let's look at the previous mock data: { quality: "WebRip", size: "545-520", ... }
  // It didn't have explicit resolution. I added `resolution?: string` to the interface in DownloadBox.tsx.
  
  const filteredItems = items.filter(item => 
    item.resolution ? item.resolution === selectedQuality : true
  );

  return (
    <div className="space-y-8">
       <QualitySelector 
         qualities={qualities} 
         selected={selectedQuality} 
         onChange={setSelectedQuality} 
       />
       <DownloadBox items={filteredItems.length > 0 ? filteredItems : items} />
    </div>
  );
}

