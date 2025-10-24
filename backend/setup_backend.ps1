# PowerShell script to automate backend setup and training
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install --upgrade pip
pip install -r requirements.txt
python train.py
Write-Host "Backend setup and model training complete. Model saved as traffic_signs_cnn.h5."
