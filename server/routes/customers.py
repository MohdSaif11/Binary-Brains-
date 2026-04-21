from flask import Blueprint, request, jsonify
import random

customers_bp = Blueprint("customers", __name__)

# 🧠 HEALTH FUNCTION
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

# 🔥 DATA
names = ["John", "Sara", "Amit", "Priya", "Alex", "Ravi", "Neha"]
regions = ["India", "US", "UK", "Germany", "Canada"]

customers = []

# 🔥 GENERATE 200 CUSTOMERS
for i in range(1, 201):
    customer = {
        "id": i,
        "name": random.choice(names) + str(i),
        "region": random.choice(regions),
        "usage": random.randint(20, 100),
        "tickets": random.randint(0, 6),
        "devices": [],
        "health_score": 0,
        "churn_risk": ""
    }

    # ✅ APPLY HEALTH
    customer["health_score"] = calculate_health(customer)
    customer["churn_risk"] = calculate_churn(customer)

    customers.append(customer)


# 📌 GET
@customers_bp.route("/customers", methods=["GET"])
def get_customers():
    return jsonify(customers)


# ➕ ADD CUSTOMER
@customers_bp.route("/customers", methods=["POST"])
def add_customer():
    data = request.json

    new_customer = {
        "id": len(customers) + 1,
        "name": data["name"],
        "region": data["region"],
        "usage": random.randint(30, 80),
        "tickets": 0,
        "devices": [],
        "health_score": 0,
        "churn_risk": ""
    }

    new_customer["health_score"] = calculate_health(new_customer)
    new_customer["churn_risk"] = calculate_churn(new_customer)

    customers.append(new_customer)
    return jsonify({"message": "Customer added"})


# ❌ DELETE
@customers_bp.route("/customers/<int:id>", methods=["DELETE"])
def delete_customer(id):
    global customers
    customers = [c for c in customers if c["id"] != id]
    return jsonify({"message": "Deleted"})


# 🎫 ADD TICKET
@customers_bp.route("/customers/<int:id>/ticket", methods=["POST"])
def add_ticket(id):
    for c in customers:
        if c["id"] == id:
            c["tickets"] += 1

            # ✅ UPDATE HEALTH
            c["health_score"] = calculate_health(c)
            c["churn_risk"] = calculate_churn(c)


            return jsonify({"message": "Ticket added"})

    return jsonify({"error": "Not found"}), 404


# 💻 ADD DEVICE
@customers_bp.route("/customers/<int:id>/device", methods=["POST"])
def add_device(id):
    data = request.json

    for c in customers:
        if c["id"] == id:
            c["devices"].append(data["device"])
            return jsonify({"message": "Device added"})

    return jsonify({"error": "Not found"}), 404

@customers_bp.route("/customers/<int:id>/summary", methods=["GET"])
def get_summary(id):
    for c in customers:
        if c["id"] == id:

            summary = f"""
📧 Customer Report

Name: {c['name']}
Region: {c['region']}

📊 Usage: {c['usage']}%
🎫 Tickets: {c['tickets']}
💚 Health Score: {c['health_score']}
⚠️ Churn Risk: {c['churn_risk']}

🧠 Recommendation:
"""

            # 🔥 Smart suggestions
            if c["churn_risk"] == "High":
                summary += "Customer is at high risk. Increase engagement and resolve issues immediately."
            elif c["churn_risk"] == "Medium":
                summary += "Monitor customer and improve product usage."
            else:
                summary += "Customer is healthy. Maintain engagement."

            return jsonify({"summary": summary})

    return jsonify({"error": "Customer not found"}), 404