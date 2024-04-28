import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

@pytest.mark.asyncio
async def test_login_endpoint():
    data = {
        "username": "semank12",
        "password": "semank12"
    }
    response = client.post("/login", json=data)
    assert response.status_code == 200
    assert "access_token" in response.json()
    assert "access_token" is not None
