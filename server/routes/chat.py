from flask import Blueprint, request, jsonify
import requests
from db import customers_collection

chat_bp = Blueprint("chat", __name__)

OPENAI_API_KEY = "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"

@chat_bp.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_message = data.get("message", "")

    # 🔥 FETCH DATA FROM DB
    customers = list(customers_collection.find({}, {
        "name": 1,
        "health_score": 1,
        "usage": 1,
        "tickets": 1,
        "churn_risk": 1
    }))

    # Convert ObjectId → string
    for c in customers:
        c["_id"] = str(c["_id"])

    try:
        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {OPENAI_API_KEY}",
                "Content-Type": "application/json",
                "HTTP-Referer": "http://localhost:3000",
                "X-Title": "Customer Dashboard AI"
            },
            json={
                "model": "openai/gpt-4o-mini",
                "messages": [
    {
        "role": "system",
        "content": f"""
You are an AI Customer Insights Assistant.

You are given real customer data.

Your job:
- Analyze the data
- Give clear insights
- Be concise

Rules:
- Use bullet points
- Always include customer names
- Include numbers (usage %, tickets, health score)
- Highlight important insights (like high-risk customers)
- Avoid generic answers
- Prioritize most important insights first

Examples:

Top 3 high-risk customers:
• John – Usage 32%, Tickets 5
• Priya – Usage 28%, Tickets 6

Healthy customers:
• Alex – Health 90, Usage 85%

Customer Data:
{customers}
"""
    },
                    {
                        "role": "user",
                        "content": user_message
                    }
                ]
            }
        )

        result = response.json()

        if "choices" in result:
            reply = result["choices"][0]["message"]["content"]
        else:
            reply = str(result)

        return jsonify({"reply": reply})

    except Exception as e:
        return jsonify({"reply": f"Error: {str(e)}"})