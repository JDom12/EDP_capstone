import pandas as pd
import pickle
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.metrics import accuracy_score

#loading data from csv into a dataframe
with open ('model_sample_data.csv', 'rb') as file:
    df = pd.read_csv(file)

#saving X and y values to use to make model that takes role and location and predicts salary
print(df)
X = df[['role', 'location']]
y = df['salary']

#creating pipeline
categorical_features = ['role', 'location']
categorical_transformer = Pipeline(steps=[
    ('encoder', OneHotEncoder())
])

preprocessor = ColumnTransformer(
    transformers=[
        ('cat', categorical_transformer, categorical_features)
    ])

linearReg_pipeline = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('classifier', LinearRegression())
])

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

#training linear regression model
linearReg_pipeline.fit(X_train, y_train)

#testing
# Predict frequent losers for the test set
y_pred = linearReg_pipeline.predict(X_test)

print(y_pred)

with open ('model.pkl', 'wb') as file:
    pickle.dump(linearReg_pipeline, file)