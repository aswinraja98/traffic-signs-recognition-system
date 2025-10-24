import os
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image

MODEL_PATH = "traffic_signs_cnn.h5"
UPLOAD_DIR = "uploaded_images"

# Load the trained model
model = load_model(MODEL_PATH)

# List all images in the uploaded_images directory
image_files = [f for f in os.listdir(UPLOAD_DIR) if f.lower().endswith('.png') or f.lower().endswith('.jpg')]

results = []

for img_file in sorted(image_files):
    img_path = os.path.join(UPLOAD_DIR, img_file)
    try:
        img = image.load_img(img_path, target_size=(32, 32))
        x = image.img_to_array(img)
        x = x / 255.0
        x = np.expand_dims(x, axis=0)
        preds = model.predict(x)
        pred_class = np.argmax(preds, axis=1)[0]
        results.append(f"{img_file}: {pred_class}")
    except Exception as e:
        results.append(f"{img_file}: ERROR - {str(e)}")

# Write results to a file
with open("uploaded_inference_results.txt", "w") as f:
    for line in results:
        f.write(line + "\n")

print("Inference complete. Results written to uploaded_inference_results.txt")