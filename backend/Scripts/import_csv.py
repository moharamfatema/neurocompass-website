from pathlib import Path
import csv
from pymongo import MongoClient

# Establish a connection to MongoDB
IP_ADDRESS = '0.0.0.0' # replace with IP address of the host machine
client = MongoClient(f'mongodb://{IP_ADDRESS}:27017')


try:
    client.admin.command('ping')
    print("Connected to MongoDB!")
except Exception as e:
    print(f"Connection failed: {e}")
    exit()


# Select the database and collection
db = client['neurocompass']

# collection = db['X-y-dataset']

# path = Path(__file__).resolve().parents[1] / "assets/data/processed_data.csv"
# # Read and insert CSV data into MongoDB
# with open(path, 'r') as file:
#     csv_data = csv.DictReader(file) # Automatically uses the first row as header
#     for row in csv_data:
#         collection.insert_one(row)

# print("Data imported successfully!")

# collection = db['merged-dataset']

# path = Path(__file__).resolve().parents[1] / "assets/data/merged_df.csv"
# # Read and insert CSV data into MongoDB
# with open(path, 'r') as file:
#     csv_data = csv.DictReader(file) # Automatically uses the first row as header
#     for row in csv_data:
#         collection.insert_one(row)

# print("Data imported successfully!")


# Close the connection
client.close()