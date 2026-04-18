from flask import Blueprint, request, jsonify
import json, os

auth_bp = Blueprint("auth", __name__)
FILE = "users.json"

def load_users():
    if not os.path.exists(FILE):
        return []
    return json.load(open(FILE))

def save_users(users):
    json.dump(users, open(FILE, "w"))

@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.json
    users = load_users()
    users.append(data)
    save_users(users)
    return jsonify({"message": "User created"})

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    users = load_users()

    for u in users:
        if u["email"] == data["email"] and u["password"] == data["password"]:
            return jsonify({"success": True})

    return jsonify({"success": False})