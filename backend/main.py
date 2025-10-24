from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
import numpy as np
import cv2
from tensorflow.keras.models import load_model
import io

app = FastAPI()

# Allow CORS for local frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Load your trained model (update path as needed)
model = load_model("E:/Files/Projects/Traffic-Signs-Recognition/demo/traffic_signs_cnn.h5")
class_names = [str(i) for i in range(43)]  # Update with actual class names if available

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    import os
    contents = await file.read()
    # Save uploaded image for inspection
    save_dir = "uploaded_images"
    os.makedirs(save_dir, exist_ok=True)
    save_path = os.path.join(save_dir, file.filename)
    with open(save_path, "wb") as f:
        f.write(contents)
    print(f"Saved uploaded image to {save_path}")

    npimg = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(npimg, cv2.IMREAD_COLOR)
    if img is None:
        print("Error: cv2.imdecode failed, image is None")
        return JSONResponse({"error": "Image decode failed"}, status_code=400)
    img = cv2.resize(img, (32, 32))
    img = img / 255.0
    img = np.expand_dims(img, axis=0)
    preds = model.predict(img)
    label_idx = int(np.argmax(preds))
    confidence = float(np.max(preds))
    label = class_names[label_idx]
    print(f"Predicted class: {label} (index: {label_idx}), confidence: {confidence}")
    return JSONResponse({"label": label, "confidence": confidence})

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
