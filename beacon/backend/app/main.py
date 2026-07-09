from fastapi import FastAPI

app = FastAPI(
    title="🧭 Beacon API",
    description="Turning business data into better decisions.",
    version="1.0.0"
)

@app.get("/")
def home():
    return {
        "message": "Welcome to Beacon!"
    }