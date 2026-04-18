from flask import Blueprint, jsonify
from data.generate_data import customers

health_bp = Blueprint("health", __name__)

@health_bp.route("/health/<int:id>")
def health(id):
    c = customers[id]

    score = (100 - c["tickets"]*2 + c["usage"] + c["nps"]*10) / 3

    return jsonify({
        "score": round(score, 2),
        "status": "Good" if score > 70 else "Risk"
    })