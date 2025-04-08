from fastapi import FastAPI
from mangum import Mangum

from app.app import app as fastapi_app

handler = Mangum(fastapi_app)
