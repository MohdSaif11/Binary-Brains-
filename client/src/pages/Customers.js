from flask import Blueprint, jsonify
from data.generate_data import customers

customers_bp = Blueprint("customers", __name__)

@customers_bp.route("/customers", methods=["GET"])
def get_customers():
    return jsonify(customers)