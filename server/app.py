from flask import Flask
from flask_cors import CORS

from routes.customers import customers_bp
from routes.health import health_bp
from routes.churn import churn_bp
from routes.chat import chat_bp
from routes.auth import auth_bp   # 🔥 IMPORTANT

app = Flask(__name__)
CORS(app)   # 🔥 MUST BE HERE

app.register_blueprint(customers_bp)
app.register_blueprint(health_bp)
app.register_blueprint(churn_bp)
app.register_blueprint(chat_bp)
app.register_blueprint(auth_bp)

@app.route("/")
def home():
    return "Backend Running 🚀"

if __name__ == "__main__":
    app.run(debug=True)