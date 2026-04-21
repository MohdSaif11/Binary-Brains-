from flask import Blueprint, request, jsonify

auth_bp = Blueprint("auth", __name__)

# 🧠 simple users DB
users = []

# ✅ SIGNUP
@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()

    user = {
        "email": data.get("email"),
        "password": data.get("password")
    }

    users.append(user)

    return jsonify({"message": "User registered"})


# ✅ LOGIN
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    for user in users:
        if user["email"] == email and user["password"] == password:
            return jsonify({"message": "Login successful"})

    return jsonify({"error": "Invalid credentials"}), 401