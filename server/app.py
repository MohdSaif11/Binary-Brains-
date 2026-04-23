from flask import Flask
from flask_cors import CORS
from routes.auth import auth_bp
from routes.chat import chat_bp
from routes.customers import customers_bp
import os

app = Flask(__name__)
CORS(app)

app.register_blueprint(customers_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(chat_bp)

@app.route("/")
def home():
    return "Backend Running"

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
