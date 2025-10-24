# data_loader.py
"""
Module for loading and preprocessing the GTSRB dataset.
"""

import os
import numpy as np
import pandas as pd
import cv2
from sklearn.model_selection import train_test_split

IMG_SIZE = 32

def load_gtsrb_data(data_dir):
    """
    Loads GTSRB images and labels from the given directory.
    Assumes data_dir contains subfolders for each class.
    Returns: (X_train, X_test, y_train, y_test)
    """
    images = []
    labels = []
    # Sort class_dirs numerically to ensure correct label mapping
    class_dirs = [d for d in os.listdir(data_dir) if os.path.isdir(os.path.join(data_dir, d))]
    class_dirs = sorted(class_dirs, key=lambda x: int(x))
    for label, class_dir in enumerate(class_dirs):
        class_path = os.path.join(data_dir, class_dir)
        for img_name in os.listdir(class_path):
            img_path = os.path.join(class_path, img_name)
            img = cv2.imread(img_path)
            if img is not None:
                img = cv2.resize(img, (IMG_SIZE, IMG_SIZE))
                img = img / 255.0  # Normalize
                images.append(img)
                labels.append(label)
    X = np.array(images)
    y = np.array(labels)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
    return X_train, X_test, y_train, y_test
