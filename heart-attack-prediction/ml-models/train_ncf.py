import pandas as pd
import numpy as np
import json
import pickle
import tensorflow as tf
from sklearn.preprocessing import LabelEncoder, StandardScaler
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Input, Embedding, Flatten, Dense, Concatenate, Dropout
from tensorflow.keras.optimizers import Adam
from sklearn.model_selection import train_test_split

# Load the diet recommendation dataset
diet_data = pd.read_csv('../public/data/Personalized_Diet_Recommendations.csv')

# Extract features relevant to both heart attack and diet datasets
# Common health indicators between the two datasets
health_indicators = [
    'Age', 'BMI', 'Cholesterol_Level',
    'Blood_Pressure_Systolic', 'Blood_Pressure_Diastolic', 
    'Sleep_Hours', 'Alcohol_Consumption', 'Smoking_Habit'
]

# Map Alcohol_Consumption and Smoking_Habit to binary values
diet_data['Alcohol_Consumption'] = diet_data['Alcohol_Consumption'].map({'Yes': 1, 'No': 0})
diet_data['Smoking_Habit'] = diet_data['Smoking_Habit'].map({'Yes': 1, 'No': 0})

# Target variable: recommended meal plan
meal_plans = diet_data['Recommended_Meal_Plan'].unique()
diet_data['Meal_Plan_ID'] = LabelEncoder().fit_transform(diet_data['Recommended_Meal_Plan'])

# User features
user_features = diet_data[health_indicators]

# Scale user features
user_scaler = StandardScaler()
user_features_scaled = user_scaler.fit_transform(user_features)

# Save the scaler
with open('../public/data/diet_scaler.pkl', 'wb') as f:
    pickle.dump(user_scaler, f)

# Save mapping from Meal_Plan_ID to actual meal plan
meal_plan_mapping = {
    id: plan for id, plan in zip(
        diet_data['Meal_Plan_ID'].unique(),
        diet_data['Recommended_Meal_Plan'].unique()
    )
}

with open('../public/data/meal_plan_mapping.json', 'w') as f:
    json.dump(meal_plan_mapping, f)

# Split the data
X_train, X_test, y_train, y_test = train_test_split(
    user_features_scaled, 
    diet_data['Meal_Plan_ID'], 
    test_size=0.2, 
    random_state=42
)

# NCF Model
n_factors = 16
n_users = len(diet_data)
n_meal_plans = len(meal_plans)

# User features input
user_input = Input(shape=(len(health_indicators),), name='user_features')

# Dense layers for processing user features
user_dense = Dense(32, activation='relu')(user_input)
user_dense = Dropout(0.2)(user_dense)
user_dense = Dense(16, activation='relu')(user_dense)

# Output layer
output = Dense(n_meal_plans, activation='softmax')(user_dense)

# Create and compile the model
ncf_model = Model(inputs=user_input, outputs=output)
ncf_model.compile(
    optimizer=Adam(learning_rate=0.001),
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

# Train the model
history = ncf_model.fit(
    X_train, y_train,
    validation_data=(X_test, y_test),
    epochs=10,
    batch_size=32
)

# Save the model
ncf_model.save('../public/data/ncf_model')

# Save the training history
history_dict = {
    'loss': [float(val) for val in history.history['loss']],
    'val_loss': [float(val) for val in history.history['val_loss']],
    'accuracy': [float(val) for val in history.history['accuracy']],
    'val_accuracy': [float(val) for val in history.history['val_accuracy']]
}

with open('../public/data/ncf_history.json', 'w') as f:
    json.dump(history_dict, f)

# Map health indicators from heart attack dataset to diet dataset
indicator_mapping = {
    'Age': 'Age',
    'BMI': 'BMI',
    'Cholesterol': 'Cholesterol_Level',
    'Systolic': 'Blood_Pressure_Systolic',
    'Diastolic': 'Blood_Pressure_Diastolic',
    'Sleep Hours Per Day': 'Sleep_Hours',
    'Alcohol Consumption': 'Alcohol_Consumption',
    'Smoking': 'Smoking_Habit'
}

with open('../public/data/indicator_mapping.json', 'w') as f:
    json.dump(indicator_mapping, f)

# Save column names for future prediction
with open('../public/data/diet_columns.json', 'w') as f:
    json.dump(health_indicators, f)

print("NCF model training completed. Model and results saved.") 