from flask import Blueprint, request, jsonify
from db import customers_collection
from bson import ObjectId
from bson.errors import InvalidId
import random

customers_bp = Blueprint("customers", __name__)

#  HEALTH FUNCTION
def calculate_health(customer):
    usage_score = customer["usage"]
    ticket_penalty = customer["tickets"] * 5
    health = usage_score - ticket_penalty
    return max(0, min(100, health))


def calculate_churn(customer):
    if customer["usage"] < 40 or customer["tickets"] > 4:
        return "High"
    elif customer["usage"] < 60:
        return "Medium"
    else:
        return "Low"


#  AUTO SEED (VERY IMPORTANT)
def seed_if_empty():
    if customers_collection.count_documents({}) == 0:
        names = ["John", "Sara", "Amit", "Priya", "Alex", "Ravi", "Neha"]
        regions = ["India", "US", "UK", "Germany", "Canada"]

        data = []

        for i in range(1, 201):
            customer = {
                "name": random.choice(names) + str(i),
                "region": random.choice(regions),
                "usage": random.randint(20, 100),
                "tickets": random.randint(0, 6),
                "devices": []
            }

            customer["health_score"] = calculate_health(customer)
            customer["churn_risk"] = calculate_churn(customer)

            data.append(customer)

        customers_collection.insert_many(data)


#  GET ALL CUSTOMERS
@customers_bp.route("/customers", methods=["GET"])
def get_customers():
    seed_if_empty()  # 🔥 AUTO LOAD DATA

    customers = []

    for c in customers_collection.find():
        customers.append({
            "id": str(c["_id"]),
            "name": c["name"],
            "region": c["region"],
            "usage": c.get("usage", 0),
            "tickets": c.get("tickets", 0),
            "devices": c.get("devices", []),
            "health_score": c.get("health_score", 0),
            "churn_risk": c.get("churn_risk", "Low")
        })

    return jsonify(customers)


# ➕ ADD CUSTOMER
@customers_bp.route("/customers", methods=["POST"])
def add_customer():
    data = request.json

    new_customer = {
        "name": data["name"],
        "region": data["region"],
        "usage": random.randint(30, 80),
        "tickets": 0,
        "devices": []
    }

    new_customer["health_score"] = calculate_health(new_customer)
    new_customer["churn_risk"] = calculate_churn(new_customer)

    customers_collection.insert_one(new_customer)

    return jsonify({"message": "Customer added"})


#  DELETE CUSTOMER
@customers_bp.route("/customers/<id>", methods=["DELETE"])
def delete_customer(id):
    try:
        customers_collection.delete_one({"_id": ObjectId(id)})
        return jsonify({"message": "Deleted"})
    except InvalidId:
        return jsonify({"error": "Invalid ID"}), 400


#  ADD TICKET
@customers_bp.route("/customers/<id>/ticket", methods=["POST"])
def add_ticket(id):
    try:
        customer = customers_collection.find_one({"_id": ObjectId(id)})
    except InvalidId:
        return jsonify({"error": "Invalid ID"}), 400

    if customer:
        updated_tickets = customer.get("tickets", 0) + 1

        updated_customer = {
            **customer,
            "tickets": updated_tickets
        }

        updated_customer["health_score"] = calculate_health(updated_customer)
        updated_customer["churn_risk"] = calculate_churn(updated_customer)

        customers_collection.update_one(
            {"_id": ObjectId(id)},
            {"$set": {
                "tickets": updated_customer["tickets"],
                "health_score": updated_customer["health_score"],
                "churn_risk": updated_customer["churn_risk"]
            }}
        )

        return jsonify({"message": "Ticket added"})

    return jsonify({"error": "Not found"}), 404


#  ADD DEVICE
@customers_bp.route("/customers/<id>/device", methods=["POST"])
def add_device(id):
    try:
        data = request.json

        customers_collection.update_one(
            {"_id": ObjectId(id)},
            {"$push": {"devices": data["device"]}}
        )

        return jsonify({"message": "Device added"})

    except InvalidId:
        return jsonify({"error": "Invalid ID"}), 400


#  CUSTOMER SUMMARY
@customers_bp.route("/customers/<id>/summary", methods=["GET"])
def get_summary(id):
    try:
        c = customers_collection.find_one({"_id": ObjectId(id)})
    except InvalidId:
        return jsonify({"error": "Invalid ID"}), 400

    if c:
        summary = f"""
 Customer Report

Name: {c['name']}
Region: {c['region']}

 Usage: {c['usage']}%
 Tickets: {c['tickets']}
 Health Score: {c['health_score']}
 Churn Risk: {c['churn_risk']}

 Recommendation:
"""

        if c["churn_risk"] == "High":
            summary += "Customer is at high risk. Increase engagement and resolve issues immediately."
        elif c["churn_risk"] == "Medium":
            summary += "Monitor customer and improve product usage."
        else:
            summary += "Customer is healthy. Maintain engagement."

        return jsonify({"summary": summary})

    return jsonify({"error": "Customer not found"}), 404