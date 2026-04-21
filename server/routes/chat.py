from flask import Blueprint, request, jsonify
from routes.customers import customers

chat_bp = Blueprint("chat", __name__)

@chat_bp.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    message = data.get("message", "").lower()

    at_risk = [c for c in customers if c["usage"] < 50 or c["tickets"] > 3]
    healthiest = max(customers, key=lambda c: c["usage"])
    worst = min(customers, key=lambda c: c["usage"])

    # 🔥 SMART RESPONSES

    if "risk" in message:
        if at_risk:
            names = ", ".join([c["name"] for c in at_risk])
            return jsonify({"reply": f"⚠️ {names} are at risk due to low usage or high tickets."})
        return jsonify({"reply": "✅ No customers at risk."})

    elif "action" in message or "what should" in message:
        actions = []
        for c in at_risk:
            if c["usage"] < 50:
                actions.append(f"{c['name']}: Increase engagement")
            if c["tickets"] > 3:
                actions.append(f"{c['name']}: Needs support follow-up")

        return jsonify({"reply": "\n".join(actions) if actions else "All customers are healthy ✅"})

    elif "best" in message or "healthiest" in message:
        return jsonify({"reply": f"🏆 {healthiest['name']} is the healthiest customer ({healthiest['usage']}% usage)."})

    elif "worst" in message:
        return jsonify({"reply": f"⚠️ {worst['name']} needs attention ({worst['usage']}% usage)."})

    elif "insight" in message:
        avg = sum(c["usage"] for c in customers) / len(customers)
        tickets = sum(c["tickets"] for c in customers)

        return jsonify({
            "reply": f"📊 Avg usage: {avg:.1f}%\n🎫 Tickets: {tickets}\n⚠️ Risk: {len(at_risk)} customers"
        })

    else:
        return jsonify({
            "reply": "Try asking about risk, actions, insights, or best/worst customer."
        })