import pytest
import requests

def test_api_predict():
    url = "http://localhost:8000/predict"
    # You can add a sample image path and test payload here
    # For now, just check if the endpoint is reachable
    response = requests.get(url)
    assert response.status_code in [200, 405]  # 405 if GET not allowed, 200 if allowed
