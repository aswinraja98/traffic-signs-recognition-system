from fastapi import FastAPI, File, UploadFile
from tensorflow import keras
import numpy as np
from PIL import Image
import io
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

IMG_SIZE = 32
MODEL_PATH = "demo/traffic_signs_cnn.h5"
model = keras.models.load_model(MODEL_PATH)

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image_bytes = await file.read()
    img = Image.open(io.BytesIO(image_bytes)).resize((IMG_SIZE, IMG_SIZE))
    arr = np.array(img) / 255.0
    if arr.ndim == 2:
        arr = np.stack([arr]*3, axis=-1)
    arr = arr.reshape(1, IMG_SIZE, IMG_SIZE, 3)
    pred = model.predict(arr)
    class_id = int(np.argmax(pred))
    return {"class_id": class_id}