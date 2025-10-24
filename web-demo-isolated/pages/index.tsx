import React, { useState, useEffect } from "react";

export default function Home() {
  const [testImages, setTestImages] = useState<string[]>([]);
  const [current, setCurrent] = useState(0);
  const [predictedClass, setPredictedClass] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/images")
      .then((res) => res.json())
      .then((data) => {
        // Shuffle images for randomness
        const shuffled = [...data.testImages].sort(() => Math.random() - 0.5);
        setTestImages(shuffled);
      });
  }, []);

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % testImages.length);
    setPredictedClass(null);
  };

  const handlePredict = async () => {
    if (!testImages[current]) return;
    setLoading(true);
    try {
      // Fetch the image as blob
      const response = await fetch(testImages[current]);
      const blob = await response.blob();
      const formData = new FormData();
      formData.append("file", blob, testImages[current].split("/").pop());
      // Send to backend
      const res = await fetch("http://localhost:8000/predict", {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      setPredictedClass(data.class_id?.toString() || data.label?.toString() || null);
    } catch (err) {
      setPredictedClass(null);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <div className="container max-w-2xl mx-auto py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-[#06B6D4]/10 border border-[#06B6D4]/20">
              {/* Icon: traffic sign SVG or emoji */}
              <span className="text-2xl">🚦</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#06B6D4]">Traffic Sign Recognition Demo</h1>
              <p className="text-muted-foreground">Try out the AI-powered traffic sign recognition system</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/30 rounded px-2 py-1 text-xs font-medium">Interactive Demo</span>
            <span className="bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/30 rounded px-2 py-1 text-xs font-medium">Computer Vision</span>
            <span className="bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/30 rounded px-2 py-1 text-xs font-medium">Deep Learning</span>
          </div>
        </div>

        {/* About Card */}
        <div className="bg-[#06B6D4]/5 border border-[#06B6D4]/20 rounded-xl shadow p-4 mb-8">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-2 text-[#06B6D4]">About This Demo</h2>
          <p className="text-sm text-muted-foreground">
            This is a <strong>simplified frontend demo</strong> of the Traffic Sign Recognition System. The full system uses deep learning models trained on the GTSRB dataset. For the complete implementation with backend API, visit the{' '}
            <a
              href="https://github.com/aswinraja98/traffic-signs-recognition"
              target="_blank"
              className="text-[#06B6D4] hover:underline font-medium"
            >
              GitHub repository
            </a>.
          </p>
        </div>

        {/* Main Demo Area */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Test Image Card */}
          <div className="bg-[#06B6D4]/5 border border-[#06B6D4]/20 rounded-xl shadow p-6 flex flex-col">
            <h2 className="text-lg font-semibold mb-2 text-[#06B6D4]">Test Image</h2>
            <div className="flex-1 flex items-center justify-center">
              {testImages.length > 0 ? (
                <img
                  src={testImages[current]}
                  alt="Test Image"
                  className="w-full h-full rounded-lg bg-[#222] border border-[#06B6D4]/40"
                  style={{ width: '256px', height: '256px', objectFit: 'cover' }}
                />
              ) : (
                <div className="w-64 h-64 bg-[#222] rounded-lg border border-[#06B6D4]/40" />
              )}
            </div>
          </div>
          {/* Predicted Class Card */}
          <div className="bg-[#06B6D4]/5 border border-[#06B6D4]/20 rounded-xl shadow p-6 flex flex-col">
            <h2 className="text-lg font-semibold mb-2 text-[#06B6D4]">Predicted Class</h2>
            <div className="flex-1 flex items-center justify-center">
              {predictedClass ? (
                <img
                  src={`/predict-images/${predictedClass}.png`}
                  alt="Predicted Class"
                  className="w-64 h-64 object-contain rounded-lg bg-[#222] border border-[#06B6D4]/40"
                />
              ) : (
                <div className="w-64 h-64 bg-[#222] rounded-lg border border-[#06B6D4]/40 flex items-center justify-center text-muted-foreground text-sm">
                  Awaiting prediction...
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-4 justify-center mb-8">
          <button
            onClick={handleNext}
            className="px-6 py-2 text-base rounded-lg font-semibold bg-[#06B6D4] text-white shadow hover:bg-[#06B6D4]/90 transition"
            disabled={testImages.length === 0}
          >
            Next Image
          </button>
          <button
            onClick={handlePredict}
            className="px-6 py-2 text-base rounded-lg font-semibold bg-[#06B6D4] text-white shadow hover:bg-[#06B6D4]/90 transition"
            disabled={testImages.length === 0 || loading}
          >
            {loading ? "Predicting..." : "Predict"}
          </button>
        </div>

        {/* Technical Details */}
        <div className="bg-muted/30 border border-[#06B6D4]/10 rounded-xl p-4 text-sm text-muted-foreground mb-8">
          <h3 className="font-semibold text-foreground mb-2">Technical Implementation</h3>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li><strong>Deep Learning:</strong> CNN model trained on GTSRB dataset</li>
            <li><strong>Preprocessing:</strong> Image resizing, normalization</li>
            <li><strong>API:</strong> FastAPI backend for predictions</li>
            <li><strong>Frontend:</strong> Next.js + Tailwind CSS</li>
          </ul>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/30 rounded px-2 py-1 text-xs font-medium">Python</span>
            <span className="bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/30 rounded px-2 py-1 text-xs font-medium">FastAPI</span>
            <span className="bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/30 rounded px-2 py-1 text-xs font-medium">Next.js</span>
            <span className="bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/30 rounded px-2 py-1 text-xs font-medium">Tailwind CSS</span>
            <span className="bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/30 rounded px-2 py-1 text-xs font-medium">GTSRB</span>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Want to see the full implementation with production-ready code?
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://github.com/aswinraja98/traffic-signs-recognition"
              target="_blank"
              className="bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-white px-6 py-2 rounded-lg font-semibold shadow transition"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}