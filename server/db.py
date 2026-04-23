from pymongo import MongoClient

MONGO_URI = "mongodb+srv://Mehak:admin123@cluster0.lhkfpzf.mongodb.net/?retryWrites=true&w=majority"

client = MongoClient(MONGO_URI)

db = client["customer_db"]

customers_collection = db["customers"]
