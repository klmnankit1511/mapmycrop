from pydantic import BaseModel, StrictStr, Field


class UserLogin(BaseModel):
    username: StrictStr
    password: StrictStr

class UserSignUp(BaseModel):
    username: StrictStr = Field(..., min_length=4, max_length=20)
    password: StrictStr = Field(..., min_length=8)
    name: StrictStr

