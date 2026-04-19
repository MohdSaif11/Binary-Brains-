from flask import Blueprint, request, jsonify
from data.customers import customers

chat_bp = Blueprint("chat", __name__)

@chat_bp.route("/chat", methods=["POST"])
def chat():
    msg = request.json.get("message", "").lower()

    # 🔍 Find risky customers
    risky = [c for c in customers if c["tickets"] > 5 or c["usage"] < 40]

    if "risk" in msg:
        if risky:
            names = ", ".join([c["name"] for c in risky])
            reply = f"These customers are at risk: {names}. This is due to high tickets or low usage."
        else:
            reply = "No customers are currently at high risk."

    elif "churn" in msg:
        reply = "Customers with low usage and high support tickets are more likely to churn."

    elif "improve" in msg:
        reply = "To improve customer health, increase engagement and reduce support issues."

    elif "customer" in msg:
        details = ", ".join([f"{c['name']} ({c['region']})" for c in customers])
        reply = f"Here are your customers: {details}"

    else:
        reply = "Try asking about risk, churn, or customer insights."

    return jsonify({"reply": reply})