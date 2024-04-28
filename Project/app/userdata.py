from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from passlib.context import CryptContext
from dotenv import load_dotenv
import os
from jose import jwt
import pymysql




load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
DB_HOST = os.getenv("MYSQL_HOST")
DB_USER = os.getenv("MYSQL_USER")
DB_PASSWORD = os.getenv("MYSQL_PASSWORD")
DB_NAME = os.getenv("MYSQL_DB")



connection = pymysql.connect(
    host=DB_HOST,
    user=DB_USER,
    password=DB_PASSWORD,
    database=DB_NAME,
)



app = FastAPI()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: int):
    to_encode = data.copy()
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def signup(username: str, password: str, name: str):
    password = hash_password(password)
    

    try:
        with connection.cursor() as cursor:
            # return {"msg":"connect done"}
            cursor.execute("SELECT * FROM user WHERE username = %s", (username,))
            result = cursor.fetchall()


            if result:  # Check if any rows were fetched
                return {"msg": "Username is already taken"}

            cursor.execute("INSERT INTO user (username, password, name) VALUES (%s, %s, %s)", (username.lower(), password, name.lower()))
            connection.commit()  # Commit the transaction

            return {"msg": "User created successfully"}
        
    except Exception as e:  # Adjust the exception type based on the database library you're using
        return {"msg": f"Error creating user: {e}"}

def login(username: str, password: str):
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM user WHERE username = %s", (username,))
            result = cursor.fetchall()  # Fetch a single row
        
            if not result:  # Check if any row was fetched
                return {"msg": "User doesn't exists"}

            stored_password = result[0][2]  # Access the password from the fetched row

            if not verify_password(password, stored_password):
                return {"msg": "User password in wrong"}
            
            access_token_expires = 10  # Token expires in 1 hour
            access_token = create_access_token(
                data={"sub": username}, expires_delta=access_token_expires
            )

            return {"access_token": access_token, "token_type": "bearer"}
    except Exception as e:  # Adjust the exception type based on the database library you're using
        return {"msg": f"Error on checking credentials table: {e}"}
    

