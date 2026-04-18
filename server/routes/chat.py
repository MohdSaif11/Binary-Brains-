from flask import Blueprint, request, jsonify
import openai

chat_bp = Blueprint("chat", __name__)

openai.api_key = "YOUR_API_KEY"  # 🔥 put your key here

@chat_bp.route("/chat", methods=["POST"])
def chat():
    msg = request.json.get("message")

    response = openai.ChatCompletion.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a customer success AI assistant."},
            {"role": "user", "content": msg}
        ]
    )

    reply = response["choices"][0]["message"]["content"]

    return jsonify({"reply": reply})