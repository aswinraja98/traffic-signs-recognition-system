# Traffic Signs Recognition - Training Script

import os
import matplotlib.pyplot as plt
from data_loader import load_gtsrb_data
from model import build_model

DATA_DIR = "E:/Files/Projects/Traffic-Signs-Recognition/gtsrb_archive/Train"  # Correct class folder path
MODEL_PATH = "demo/traffic_signs_cnn.h5"
IMG_SIZE = 32

def main():
    print("Loading data...")
    X_train, X_test, y_train, y_test = load_gtsrb_data(DATA_DIR)
    print(f"Train samples: {len(X_train)}, Test samples: {len(X_test)}")

    input_shape = (IMG_SIZE, IMG_SIZE, 3)
    num_classes = len(set(y_train))
    print(f"Number of classes: {num_classes}")

    print("Building model...")
    model = build_model(input_shape, num_classes)

    print("Training model...")
    history = model.fit(X_train, y_train, epochs=15, batch_size=64, validation_data=(X_test, y_test))

    print("Saving model...")
    model.save(MODEL_PATH)

    print("Plotting training history...")
    plt.figure(figsize=(10,4))
    plt.subplot(1,2,1)
    plt.plot(history.history['accuracy'], label='Train Acc')
    plt.plot(history.history['val_accuracy'], label='Val Acc')
    plt.title('Accuracy')
    plt.legend()
    plt.subplot(1,2,2)
    plt.plot(history.history['loss'], label='Train Loss')
    plt.plot(history.history['val_loss'], label='Val Loss')
    plt.title('Loss')
    plt.legend()
    plt.tight_layout()
    plt.savefig('demo/training_history.png')
    plt.show()

if __name__ == "__main__":
    main()
