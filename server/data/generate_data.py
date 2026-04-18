import random

customers = []

names = ["Amit", "John", "Sara", "Mehak", "Ravi", "Priya"]

for i in range(15):
    customers.append({
        "id": i,
        "name": random.choice(names),
        "region": random.choice(["India", "US"]),
        "tickets": random.randint(1, 20),
        "usage": random.randint(10, 100),
        "nps": random.randint(1, 10),
        "contract": random.randint(1, 12)
    })