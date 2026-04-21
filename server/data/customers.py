from flask import Blueprint, request, jsonify

customers_bp = Blueprint("customers", __name__)

# 🧠 In-memory DB
customers = [
    {"id": 1, "name": "John", "region": "US", "usage": 70, "tickets": 2, "devices": []},
    {"id": 2, "name": "Sara", "region": "India", "usage": 55, "tickets": 1, "devices": []},
    {"id": 3, "name": "Amit", "region": "India", "usage": 65, "tickets": 3, "devices": []},
    {"id": 4, "name": "Priya", "region": "UK", "usage": 40, "tickets": 5, "devices": []},
    {"id": 5, "name": "Alex", "region": "US", "usage": 80, "tickets": 0, "devices": []},
]

# 📌 GET ALL
@customers_bp.route("/customers", methods=["GET"])
def get_customers():
    return jsonify(customers)

# ➕ ADD CUSTOMER
@customers_bp.route("/customers", methods=["POST"])
def add_customer():
    data = request.get_json()

    if not data:
        return jsonify({"error": "No data received"}), 400

    new_customer = {
        "id": len(customers) + 1,
        "name": data.get("name", "Unknown"),
        "region": data.get("region", "Unknown"),
        "usage": 50,
        "tickets": 0,
        "devices": []
    }

    customers.append(new_customer)

    return jsonify({
        "message": "Customer added",
        "customer": new_customer
    })
# ✏️ UPDATE CUSTOMER
@customers_bp.route("/customers/<int:id>", methods=["PUT"])
def update_customer(id):
    data = request.json
    for c in customers:
        if c["id"] == id:
            c["name"] = data.get("name", c["name"])
            c["region"] = data.get("region", c["region"])
            c["usage"] = data.get("usage", c["usage"])
            return jsonify({"message": "Updated"})
    return jsonify({"error": "Not found"}), 404

# ❌ DELETE CUSTOMER
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

@customers_bp.route("/test", methods=["GET"])
def test():
    return "Customers route working ✅"