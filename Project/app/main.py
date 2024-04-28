from fastapi import FastAPI, Depends, HTTPException
from temperature import temperature
from userdata import signup, login
from Model import Temperature, UserSignUp, UserLogin
from auth import get_current_user
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # List of allowed origins
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],  # List of allowed HTTP methods
    allow_headers=["Authorization", "Content-Type"],  # List of allowed headers
)


@app.get("/", response_model=dict)
def get():
    return {"msg": "I am FastAPI. I welcome you"}


@app.post("/getweather")
async def get_weather(obj_in: Temperature, token: str = Depends(get_current_user)):
    # The token is automatically retrieved by Depends(get_current_user)

    # Call your function to get weather data
    res = temperature(obj_in.latitude, obj_in.longitude, obj_in.start_date, obj_in.end_date)
    return res


@app.post("/signup", response_model=dict)
async def create_new_user(obj_in: UserSignUp):

    response = signup(obj_in.username, obj_in.password, obj_in.name)
    return response

@app.post("/login/",response_model=dict)
async def check_user_login(obj_in: UserLogin):
    print(obj_in)
    response = login(obj_in.username, obj_in.password)
    return response