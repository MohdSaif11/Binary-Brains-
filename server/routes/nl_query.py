from flask import Blueprint, request, jsonify
import openai

nl_bp = Blueprint("nl", __name__)
openai.api_key = "YOUR_API_KEY"

@nl_bp.route("/nl-query", methods=["POST"])
def nl_query():
    query = request.json.get("query")

    prompt = f"Convert this into a database filter: {query}"

    response = openai.ChatCompletion.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}]
    )

    return jsonify({
        "result": response.choices[0].message.content
    })