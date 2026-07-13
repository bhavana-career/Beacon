from google import genai
from app.config import GOOGLE_API_KEY
from app.prompts import BEACON_PROMPT

client = genai.Client(api_key=GOOGLE_API_KEY)


def ask_beacon(summary: str, question: str):

    prompt = f"""
{BEACON_PROMPT}

==============================
BUSINESS DATA
==============================

The following information was generated automatically from the uploaded spreadsheet.

Treat these values as factual.

{summary}

==============================
USER QUESTION
==============================

{question}

==============================
INSTRUCTIONS
==============================

Use ONLY the business data above.

Do NOT ask for additional sales history if Overall Sales Growth exists.

If Product Growth exists,
use it.

If Growing Products exist,
mention them.

If Declining Products exist,
mention them.

Always support your answer with numbers.

Do not invent information.

Answer as Beacon.
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    return response.text