from flask import Blueprint, request, jsonify
import requests
import os
from db import customers_collection

chat_bp = Blueprint("chat", __name__)

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

@chat_bp.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_message = data.get("message", "")

    customers = list(customers_collection.find({}, {
        "name": 1,
        "health_score": 1,
        "usage": 1,
        "tickets": 1,
        "churn_risk": 1
    }))

    for c in customers:
        c["_id"] = str(c["_id"])

    try:
        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {OPENAI_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": "mistralai/mistral-7b-instruct",
                "messages": [
                    {
                        "role": "system",
                        "content": f"""
You are an AI Customer Insights Assistant.

Analyze the data and give clear bullet-point insights.

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