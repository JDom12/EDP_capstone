import random
from faker import Faker
import pandas as pd

fake = Faker()

data = list(range(1000))

#generating fake data to use for both prediction model and to put into Postgres DB for employees
data = [{"name": fake.name(), "phone": fake.phone_number(), "location": fake.city(), "role": fake.job(), "salary": random.randint(10000, 100000), "manager_id": random.randint(1, 100)} for _ in data]

data = pd.DataFrame(data)

#creates csv file
data.to_csv('sample_data.csv', index=False)

