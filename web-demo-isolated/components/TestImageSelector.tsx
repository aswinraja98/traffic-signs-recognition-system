"use client";

import React, { useState } from "react";
import { Sparkles, FileText, Image } from "lucide-react";

const STATIC_IMAGES: string[] = Array.from({ length: 10 }, (_, i) => `${(i + 1).toString().padStart(5, "0")}.png`);
const BADGE_STYLE = "bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/30 px-2 py-1 rounded text-xs font-medium";

interface TestImageSelectorProps {
  onSelect?: (img: string) => void;
}

const TestImageSelector: React.FC<TestImageSelectorProps> = ({ onSelect }) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (img: string) => {
    setSelected(img);
    if (onSelect) {
      onSelect(img);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-start py-8">
      <div className="w-full max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 rounded-lg bg-[#06B6D4]/10 border border-[#06B6D4]/20">
            <Image className="h-6 w-6 text-[#06B6D4]" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">Traffic Signs Recognition Demo</h2>
            <p className="text-muted-foreground">Try out the AI-powered traffic sign recognition system</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={BADGE_STYLE}>Interactive Demo</span>
          <span className={BADGE_STYLE}>Computer Vision</span>
          <span className={BADGE_STYLE}>Deep Learning</span>
        </div>
        <div className="mb-8 border-[#06B6D4]/20 bg-[#06B6D4]/5 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="h-5 w-5 text-[#06B6D4]" />
            <span className="font-semibold text-lg">About This Demo</span>
          </div>
          <p className="text-sm text-muted-foreground">
            This is a <strong>frontend demo</strong> of the Traffic Signs Recognition System. The full system uses a CNN model trained on the GTSRB dataset and a FastAPI backend for predictions. For the complete implementation, see the <a href="https://github.com/aswinraja98/Traffic-Signs-Recognition" target="_blank" className="text-[#06B6D4] hover:underline font-medium">GitHub repository</a>.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="border rounded-lg p-6 bg-background">
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[#06B6D4]" />
              <span className="font-semibold text-lg">Select a Test Image</span>
            </div>
            <div className="grid grid-cols-5 gap-6 mb-4">
              {STATIC_IMAGES.map((img) => (
                <div key={img} className="flex flex-col items-center">
                  <img
                    src={`/test-images/${img}`}
                    alt={img}
                    className={`w-24 h-24 object-contain border cursor-pointer rounded-lg transition-all duration-150 ${selected === img ? "ring-4 ring-[#06B6D4] scale-105" : "hover:ring-2 hover:ring-[#06B6D4]/50"}`}
                    onClick={() => handleSelect(img)}
                  />
                  <span className="mt-1 text-xs text-muted-foreground">{img}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestImageSelector;
