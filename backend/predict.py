# predict.py
"""
Script for making predictions on new images using the trained model.
"""

import os
import random
import cv2
import numpy as np
from tensorflow import keras

IMG_SIZE = 32
MODEL_PATH = "demo/traffic_signs_cnn.h5"
TEST_DIR = "E:/Files/Projects/Traffic-Signs-Recognition/gtsrb_archive/Test"

def preprocess_image(image_path):
    img = cv2.imread(image_path)
    img = cv2.resize(img, (IMG_SIZE, IMG_SIZE))
    img = img / 255.0
    img = np.expand_dims(img, axis=0)
    return img

def get_random_test_image(test_dir):
    images = [os.path.join(test_dir, f) for f in os.listdir(test_dir) if f.lower().endswith(('.png', '.jpg', '.jpeg'))]
    if not images:
        raise FileNotFoundError(f"No image files found in {test_dir}")
    return random.choice(images)

def main():
    print(f"Loading model from {MODEL_PATH}...")
    model = keras.models.load_model(MODEL_PATH)

    image_path = get_random_test_image(TEST_DIR)
    print(f"Selected random test image: {image_path}")
    img = preprocess_image(image_path)


    print("Predicting...")
    pred = model.predict(img)
    class_id = np.argmax(pred)
    print(f"Predicted class: {class_id}")

    import matplotlib.pyplot as plt
    from matplotlib.widgets import Button

    import functools
    # Store the current test image path
    state = {'image_path': get_random_test_image(TEST_DIR)}

    def show_test_image(ax1, ax2):
        test_img = cv2.imread(state['image_path'])
        test_img = cv2.cvtColor(test_img, cv2.COLOR_BGR2RGB)
        ax1.clear()
        ax2.clear()
        ax1.imshow(test_img)
        ax1.set_title('Test Image')
        ax1.axis('off')
        ax2.set_title('Predicted Class')
        ax2.axis('off')
        plt.draw()

    def next_image(event, ax1, ax2):
        state['image_path'] = get_random_test_image(TEST_DIR)
        print(f"Selected random test image: {state['image_path']}")
        show_test_image(ax1, ax2)

    def predict_image(event, ax1, ax2):
        img = preprocess_image(state['image_path'])
        pred = model.predict(img)
        class_id = np.argmax(pred)
        print(f"Predicted class ID: {class_id} for image: {state['image_path']}")
        test_img = cv2.imread(state['image_path'])
        test_img = cv2.cvtColor(test_img, cv2.COLOR_BGR2RGB)
        meta_dir = "E:/Files/Projects/Traffic-Signs-Recognition/gtsrb_archive/Meta"
        # Try to find a matching image for the predicted class in Meta
        meta_img_candidates = [f for f in os.listdir(meta_dir) if f.startswith(str(class_id)) and f.lower().endswith(('.png', '.jpg', '.jpeg'))]
        if meta_img_candidates:
            ref_img_path = os.path.join(meta_dir, meta_img_candidates[0])
            ref_img = cv2.imread(ref_img_path)
            ref_img = cv2.cvtColor(ref_img, cv2.COLOR_BGR2RGB)
        else:
            ref_img = np.zeros_like(test_img)
        ax1.clear()
        ax2.clear()
        ax1.imshow(test_img)
        ax1.set_title('Test Image')
        ax1.axis('off')
        ax2.imshow(ref_img)
        ax2.set_title(f'Predicted Class {class_id}')
        ax2.axis('off')
        plt.draw()

    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(8, 4))
    plt.subplots_adjust(bottom=0.2)

    ax_next = plt.axes([0.3, 0.05, 0.15, 0.075])
    ax_predict = plt.axes([0.55, 0.05, 0.15, 0.075])
    btn_next = Button(ax_next, 'Next')
    btn_predict = Button(ax_predict, 'Predict')

    btn_next.on_clicked(functools.partial(next_image, ax1=ax1, ax2=ax2))
    btn_predict.on_clicked(functools.partial(predict_image, ax1=ax1, ax2=ax2))

    show_test_image(ax1, ax2)
    plt.show()

if __name__ == "__main__":
    main()
