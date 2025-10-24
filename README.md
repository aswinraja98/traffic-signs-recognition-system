# 🚦 Traffic Sign Recognition System

[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org/downloads/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15.5.6-blue.svg)](https://nextjs.org/)

A production-ready traffic sign recognition system using deep learning (CNN) and a modern Next.js/Tailwind CSS frontend. Built for robust, real-time traffic sign classification and demo presentation.

## 🚗 Interactive Demo
![Taffic Signs Recognition DEMO GIF](https://github.com/user-attachments/assets/d97b46ee-ebd1-4ef2-a862-288d568f1dbb)

Try the live demo interface to see the recognition system in action! The demo provides a user-friendly web interface where you can test images and get instant predictions.

📍 **[View Demo Interface](./web-demo-isolated/)** - Next.js/React frontend for interactive traffic sign recognition

> **Note**: The `web-demo-isolated` folder contains a web interface that can be integrated with the Python backend to create a full-stack application. See `web-demo-isolated/README.md` for integration instructions.

## 🎯 Problem Statement

Automated traffic sign recognition is essential for modern driver assistance systems and autonomous vehicles. The system must:
- Accurately classify traffic signs from images
- Work in real-time and handle various lighting/angle conditions
- Be easy to integrate and extend

## 💡 Solution

This project implements a deep learning-based traffic sign recognition system:

### 1. **CNN Model**
- Trained on the GTSRB dataset
- Robust to image variations
- High accuracy for real-world signs

### 2. **FastAPI Backend**
- REST API for image prediction
- Handles image uploads and returns class predictions

### 3. **Next.js Frontend**
- Modern, responsive UI with Tailwind CSS
- Interactive demo for testing predictions

## 🛠️ Tech Stack

- **Python 3.8+** - Backend and model training
- **PyTorch / TensorFlow** - Deep learning frameworks
- **FastAPI** - REST API backend
- **Next.js 15+** - Frontend framework
- **Tailwind CSS** - UI styling
- **GTSRB** - German Traffic Sign Recognition Benchmark dataset

## 📊 Results & Performance

| Model | Accuracy | Inference Time |
|-------|----------|---------------|
| CNN (GTSRB) | 98% | ~0.2s |

*Tested on GTSRB test set with NVIDIA GPU (RTX 3060)*

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/traffic-signs-recognition.git
cd traffic-signs-recognition

# Backend setup
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Frontend setup
cd ../web-demo-isolated
pnpm install
pnpm dev
```

## 📁 Project Structure

```
traffic-signs-recognition/
│
├── backend/                  # FastAPI backend, model, scripts
├── web-demo-isolated/        # Next.js/Tailwind frontend demo
├── data/                     # Data and sample images
├── model/                    # Trained models
├── notebooks/                # Jupyter notebooks for experiments
├── tests/                    # Test scripts
├── README.md                 # Project documentation
└── LICENSE                   # License file
```

## 🧪 Testing

```bash
# Run backend tests
pytest tests/

# Test specific module
pytest tests/test_backend.py -v
```

## 🎓 Learning Resources

- [GTSRB Dataset](https://benchmark.ini.rub.de/gtsrb_news.html)
- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Ashwin Rajakannan**
- Medium: [@aswinraja98](https://medium.com/@aswinraja98)
- LinkedIn: [Ashwin Rajakannan](https://www.linkedin.com/in/ashwin-rajakannan)
- Email: aswinraja98@gmail.com

---

⭐ **Star this repo** if you find it helpful!
