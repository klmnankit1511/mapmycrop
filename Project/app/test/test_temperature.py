import pytest
from app.temperature import temperature

@pytest.mark.asyncio
async def test_temperature_function():
    # Write test cases for your temperature function
    # Example:
    result = temperature(23.787322, 86.250088, "2024-04-22", "2024-04-23")
    assert isinstance(result, list)
    assert len(result) == 48
