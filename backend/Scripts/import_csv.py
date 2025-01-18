from pathlib import Path
import csv
from pymongo import MongoClient

# Establish a connection to MongoDB
client = MongoClient('mongodb://localhost:27017/')


try:
    client.admin.command('ping')
    print("Connected to MongoDB!")
except Exception as e:
    print(f"Connection failed: {e}")


# Select the database and collection
db = client['db']
collection = db['col']

# path = "../assets/data/merged_df.csv"
path = Path(__file__).resolve().parents[1] / "assets/data/merged_df.csv"
# Read and insert CSV data into MongoDB
with open(path, 'r') as file:
    csv_data = csv.DictReader(file) # Automatically uses the first row as header
    for row in csv_data:
        collection.insert_one(row)


# Close the connection
client.close()