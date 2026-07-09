from fastapi import FastAPI
from app.routes import router
app = FastAPI(
    title="🧭 Beacon API",
    description="Turning business data into better decisions.",
    version="1.0.0"
)

app.include_router(router)

@app.get("/")
def home():
    return {
        "message": "Welcome to Beacon!"
    }