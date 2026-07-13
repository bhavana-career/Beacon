from google import genai
from app.config import GOOGLE_API_KEY
from app.prompts import BEACON_PROMPT

client = genai.Client(api_key=GOOGLE_API_KEY)


def ask_beacon(summary: str, question: str):

    prompt = f"""
{BEACON_PROMPT}

Business Summary:
{summary}

User Question:
{question}

Answer like Beacon.
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    return response.text