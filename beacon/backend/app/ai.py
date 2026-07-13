from google import genai
from app.config import GOOGLE_API_KEY
from app.prompts import BEACON_PROMPT

client = genai.Client(api_key=GOOGLE_API_KEY)


def ask_beacon(summary: str):
    prompt = f"""
{BEACON_PROMPT}

Business Data:

{summary}
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    return response.text