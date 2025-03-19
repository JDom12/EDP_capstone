import random
import pandas as pd
import random

data = list(range(1000))
role = ["Manager", "Analyst", "CSR", "HR", "Finance", "Security", "Developer"]
location = ["Hartford, CT", "New York City, NY", "Atlanta, GA", "Boston, MA", "Los Angeles, CA"]
#generating fake data to use for prediction model
data = [{"role": random.choice(role), "location": random.choice(location), "salary": random.randint(10000, 100000)} for _ in data]

data = pd.DataFrame(data)

#creates csv file
data.to_csv('sample_data.csv', index=False)

