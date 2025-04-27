import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder
import tensorflow as tf
from tensorflow.keras.layers import Input, Embedding, Flatten, Concatenate, Dense
from tensorflow.keras.models import Model

# Load dataset
df = pd.read_csv("../src/nutrition.csv")  # Corrected path for local execution

# Ensure necessary columns exist
required_columns = ['name', 'serving_size', 'calories']
assert all(col in df.columns for col in required_columns), "Dataset is missing required columns!"

# Step 1: Filter Heart-Healthy Foods
def is_heart_healthy(food_name):
    unhealthy_keywords = [
        'alcohol', 'beer', 'wine', 'whiskey', 'vodka', 'tequila',
        'beef', 'pork', 'bacon', 'sausage', 'fried', 'burger',
        'candy', 'cookies', 'cake', 'soda', 'syrup', 'sugar',
        'butter', 'cheese', 'cream', 'mayonnaise',
        'chips', 'crackers', 'fast food', 'processed'
    ]
    return not any(keyword in str(food_name).lower() for keyword in unhealthy_keywords)

df = df[df['name'].apply(is_heart_healthy)]
df = df.dropna()

# Encode food names as numerical IDs
food_encoder = LabelEncoder()
df['food_id'] = food_encoder.fit_transform(df['name'])

# Assign random user IDs (simulate 1000 users)
df['user_id'] = np.random.randint(0, 1000, df.shape[0])
df['user_id'] -= df['user_id'].min()  # Normalize to start from 0

# Implicit feedback (all 1s)
df['rating'] = 1

# Ensure correct types
df['user_id'] = df['user_id'].astype(int)
df['food_id'] = df['food_id'].astype(int)
df['rating'] = df['rating'].astype(float)

num_users = df['user_id'].max() + 1
num_food_items = df['food_id'].max() + 1

# Build NCF Model
user_input = Input(shape=(1,))
food_input = Input(shape=(1,))
user_embedding = Embedding(input_dim=num_users, output_dim=32)(user_input)
food_embedding = Embedding(input_dim=num_food_items, output_dim=32)(food_input)
user_vec = Flatten()(user_embedding)
food_vec = Flatten()(food_embedding)
concat = Concatenate()([user_vec, food_vec])
fc1 = Dense(128, activation='relu')(concat)
fc2 = Dense(64, activation='relu')(fc1)
fc3 = Dense(32, activation='relu')(fc2)
output = Dense(1, activation='sigmoid')(fc3)
model = Model(inputs=[user_input, food_input], outputs=output)
model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# Prepare data
user_ids = df['user_id'].values
food_ids = df['food_id'].values
labels = df['rating'].values.reshape(-1, 1)

# Train model
model.fit([user_ids, food_ids], labels, epochs=10, batch_size=16)

# Recommendation function
def recommend_foods(user_id, top_n=28):
    food_ids = np.array(range(num_food_items))
    scores = model.predict([np.array([user_id] * num_food_items), food_ids], verbose=0)
    food_scores = list(zip(food_ids, scores.flatten()))
    food_scores.sort(key=lambda x: x[1], reverse=True)
    recommended_foods = [food_encoder.inverse_transform([food_id])[0] for food_id, _ in food_scores[:top_n]]
    return recommended_foods

def generate_meal_plan(user_id):
    foods = recommend_foods(user_id, top_n=28)
    meal_plan = {
        f"Day {i+1}": {
            "Breakfast": foods[i*4],
            "Lunch": foods[i*4+1],
            "Snack": foods[i*4+2],
            "Dinner": foods[i*4+3]
        }
        for i in range(7)
    }
    return meal_plan

# Generate and print meal plan for user_id=10
meal_plan = generate_meal_plan(10)
for day, meals in meal_plan.items():
    print(f"\n{day}")
    for meal_type, food in meals.items():
        print(f"  {meal_type}: {food}") 