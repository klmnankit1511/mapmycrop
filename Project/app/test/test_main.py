import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

@pytest.mark.asyncio
async def test_get_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"msg": "I am FastAPI. I welcome you"}

# You can add more test cases for other endpoints similarly
