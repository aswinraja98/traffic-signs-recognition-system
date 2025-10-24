import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const testDir = path.join(process.cwd(), "public", "test-images");
  const predictDir = path.join(process.cwd(), "public", "predict-images");

  const testImages = fs.existsSync(testDir)
    ? fs.readdirSync(testDir).filter((f) => f.match(/\.(png|jpg|jpeg|gif)$/i))
    : [];
  const predictImages = fs.existsSync(predictDir)
    ? fs.readdirSync(predictDir).filter((f) => f.match(/\.(png|jpg|jpeg|gif)$/i))
    : [];

  res.status(200).json({
    testImages: testImages.map((f) => `/test-images/${f}`),
    predictImages: predictImages.map((f) => `/predict-images/${f}`)
  });
}
