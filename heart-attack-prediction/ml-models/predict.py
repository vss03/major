import sys
import json
import pickle
import numpy as np
import tensorflow as tf
import argparse

def preprocess_input(input_data, columns, scaler):
    """Preprocess the input data for heart attack prediction."""
    # Convert input data to correct format
    data_dict = {}
    for key, value in input_data.items():
        try:
            data_dict[key] = float(value)
        except:
            data_dict[key] = value
    
    # Create a feature array matching the required columns
    input_features = []
    for col in columns:
        if col in data_dict:
            input_features.append(data_dict[col])
        else:
            input_features.append(0)  # Default value if missing
    
    # Scale features
    input_features = np.array(input_features).reshape(1, -1)
    scaled_features = scaler.transform(input_features)
    
    return scaled_features

def preprocess_diet_input(input_data, health_indicators, diet_scaler, indicator_mapping):
    """Preprocess the input data for diet recommendation."""
    # Map heart attack features to diet features
    diet_data = {}
    for heart_key, diet_key in indicator_mapping.items():
        if heart_key in input_data:
            diet_data[diet_key] = float(input_data[heart_key])
    
    # Create a feature array matching the required columns
    input_features = []
    for indicator in health_indicators:
        if indicator in diet_data:
            input_features.append(diet_data[indicator])
        else:
            input_features.append(0)  # Default value if missing
    
    # Scale features
    input_features = np.array(input_features).reshape(1, -1)
    scaled_features = diet_scaler.transform(input_features)
    
    return scaled_features

def predict_heart_attack(input_data):
    """Predict heart attack risk using all models."""
    # Load necessary files
    with open('../public/data/columns.json', 'r') as f:
        columns = json.load(f)
    
    with open('../public/data/scaler.pkl', 'rb') as f:
        scaler = pickle.load(f)
    
    with open('../public/data/logistic_regression_model.pkl', 'rb') as f:
        lr_model = pickle.load(f)
    
    with open('../public/data/random_forest_model.pkl', 'rb') as f:
        rf_model = pickle.load(f)
    
    with open('../public/data/xgboost_model.pkl', 'rb') as f:
        xgb_model = pickle.load(f)
    
    with open('../public/data/model_results.json', 'r') as f:
        results = json.load(f)
    
    # Preprocess input
    print('DEBUG: Input data:', input_data)
    input_scaled = preprocess_input(input_data, columns, scaler)
    print('DEBUG: Preprocessed features:', input_scaled)
    
    # Make predictions
    lr_prob = float(lr_model.predict_proba(input_scaled)[0, 1])
    rf_prob = float(rf_model.predict_proba(input_scaled)[0, 1])
    xgb_prob = float(xgb_model.predict_proba(input_scaled)[0, 1])
    print('DEBUG: Model outputs:', {'lr': lr_prob, 'rf': rf_prob, 'xgb': xgb_prob})
    
    # Ensemble prediction (weighted by model accuracy)
    top_models = results['ensemble']['top_models']
    model_weights = {
        'logistic_regression': results['logistic_regression']['accuracy'],
        'random_forest': results['random_forest']['accuracy'],
        'xgboost': results['xgboost']['accuracy']
    }
    total_weight = sum(model_weights[model] for model in top_models)
    ensemble_prob = sum(
        model_weights[model] * (lr_prob if model == 'logistic_regression' else rf_prob if model == 'random_forest' else xgb_prob)
        for model in top_models
    ) / total_weight if total_weight > 0 else (lr_prob + rf_prob + xgb_prob) / 3
    
    predictions = {
        'logistic_regression': {
            'probability': lr_prob,
            'prediction': 1 if lr_prob >= 0.5 else 0
        },
        'random_forest': {
            'probability': rf_prob,
            'prediction': 1 if rf_prob >= 0.5 else 0
        },
        'xgboost': {
            'probability': xgb_prob,
            'prediction': 1 if xgb_prob >= 0.5 else 0
        },
        'ensemble': {
            'probability': ensemble_prob,
            'prediction': 1 if ensemble_prob >= 0.5 else 0
        }
    }
    print('DEBUG: Final predictions:', predictions)
    return predictions

def predict_diet(input_data):
    """Predict diet recommendation based on health parameters."""
    # Load necessary files
    with open('../public/data/diet_columns.json', 'r') as f:
        health_indicators = json.load(f)
    
    with open('../public/data/diet_scaler.pkl', 'rb') as f:
        diet_scaler = pickle.load(f)
    
    with open('../public/data/indicator_mapping.json', 'r') as f:
        indicator_mapping = json.load(f)
    
    with open('../public/data/meal_plan_mapping.json', 'r') as f:
        meal_plan_mapping = json.load(f)
    
    # Load the model
    ncf_model = tf.keras.models.load_model('../public/data/ncf_model')
    
    # Preprocess input
    input_scaled = preprocess_diet_input(input_data, health_indicators, diet_scaler, indicator_mapping)
    
    # Make prediction
    meal_plan_probabilities = ncf_model.predict(input_scaled)[0]
    predicted_meal_plan_id = int(np.argmax(meal_plan_probabilities))
    predicted_meal_plan = meal_plan_mapping[str(predicted_meal_plan_id)]
    
    # Get top 3 recommendations with probabilities
    top_indices = np.argsort(meal_plan_probabilities)[-3:][::-1]
    top_recommendations = [
        {
            'meal_plan': meal_plan_mapping[str(int(idx))],
            'probability': float(meal_plan_probabilities[idx])
        }
        for idx in top_indices
    ]
    
    diet_recommendation = {
        'predicted_meal_plan': predicted_meal_plan,
        'probability': float(meal_plan_probabilities[predicted_meal_plan_id]),
        'top_recommendations': top_recommendations
    }
    
    return diet_recommendation

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('--input', type=str, help='Path to input JSON file')
    args, unknown = parser.parse_known_args()

    if args.input:
        with open(args.input, 'r') as f:
            input_data = json.load(f)
    else:
        input_data = json.loads(sys.argv[1])

    print('DEBUG: Input data:', input_data)
    # Make predictions
    heart_attack_predictions = predict_heart_attack(input_data)
    diet_recommendation = predict_diet(input_data)

    # Return results
    results = {
        'heart_attack_predictions': heart_attack_predictions,
        'diet_recommendation': diet_recommendation
    }
    print('DEBUG: Final results:', results)
    print(json.dumps(results))