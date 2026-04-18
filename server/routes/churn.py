from flask import Blueprint, jsonify
from data.generate_data import customers

churn_bp = Blueprint("churn", __name__)

@churn_bp.route("/churn/<int:id>")
def churn(id):
    c = customers[id]

    risk = c["tickets"] > 10 or c["usage"] < 30 or c["nps"] < 5

    return jsonify({
        "churn": "Yes" if risk else "No"
    })