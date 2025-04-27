import pandas as pd
import numpy as np
import json
import pickle
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix
import xgboost as xgb

# Load the heart attack dataset
data_path = '../public/data/modified_heart_attack_dataset_split_bp.csv'
heart_data = pd.read_csv(data_path)

# Separate features and target
X = heart_data.drop(['Heart Attack Risk'], axis=1)
y = heart_data['Heart Attack Risk']

# Split the data into training, validation, and testing sets
X_trainval, X_test, y_trainval, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
X_train, X_val, y_train, y_val = train_test_split(X_trainval, y_trainval, test_size=0.2, random_state=42)

# Feature scaling
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_val_scaled = scaler.transform(X_val)
X_test_scaled = scaler.transform(X_test)

# Save scaler
with open('../public/data/scaler.pkl', 'wb') as f:
    pickle.dump(scaler, f)

# Model training and evaluation
models = {}
results = {}

# Logistic Regression
lr_model = LogisticRegression(max_iter=1000, random_state=42)
lr_model.fit(X_train_scaled, y_train)
lr_pred = lr_model.predict(X_test_scaled)
lr_pred_proba = lr_model.predict_proba(X_test_scaled)[:, 1]
lr_val_pred = lr_model.predict(X_val_scaled)
lr_val_pred_proba = lr_model.predict_proba(X_val_scaled)[:, 1]

models['logistic_regression'] = lr_model
results['logistic_regression'] = {
    'accuracy': accuracy_score(y_test, lr_pred),
    'precision': precision_score(y_test, lr_pred),
    'recall': recall_score(y_test, lr_pred),
    'f1_score': f1_score(y_test, lr_pred),
    'val_accuracy': accuracy_score(y_val, lr_val_pred),
    'val_precision': precision_score(y_val, lr_val_pred),
    'val_recall': recall_score(y_val, lr_val_pred),
    'val_f1_score': f1_score(y_val, lr_val_pred)
}

# Random Forest
rf_model = RandomForestClassifier(n_estimators=100, random_state=42)
rf_model.fit(X_train_scaled, y_train)
rf_pred = rf_model.predict(X_test_scaled)
rf_pred_proba = rf_model.predict_proba(X_test_scaled)[:, 1]
rf_val_pred = rf_model.predict(X_val_scaled)
rf_val_pred_proba = rf_model.predict_proba(X_val_scaled)[:, 1]

models['random_forest'] = rf_model
results['random_forest'] = {
    'accuracy': accuracy_score(y_test, rf_pred),
    'precision': precision_score(y_test, rf_pred),
    'recall': recall_score(y_test, rf_pred),
    'f1_score': f1_score(y_test, rf_pred),
    'val_accuracy': accuracy_score(y_val, rf_val_pred),
    'val_precision': precision_score(y_val, rf_val_pred),
    'val_recall': recall_score(y_val, rf_val_pred),
    'val_f1_score': f1_score(y_val, rf_val_pred)
}

# XGBoost
xgb_model = xgb.XGBClassifier(random_state=42)
xgb_model.fit(X_train_scaled, y_train)
xgb_pred = xgb_model.predict(X_test_scaled)
xgb_pred_proba = xgb_model.predict_proba(X_test_scaled)[:, 1]
xgb_val_pred = xgb_model.predict(X_val_scaled)
xgb_val_pred_proba = xgb_model.predict_proba(X_val_scaled)[:, 1]

models['xgboost'] = xgb_model
results['xgboost'] = {
    'accuracy': accuracy_score(y_test, xgb_pred),
    'precision': precision_score(y_test, xgb_pred),
    'recall': recall_score(y_test, xgb_pred),
    'f1_score': f1_score(y_test, xgb_pred),
    'val_accuracy': accuracy_score(y_val, xgb_val_pred),
    'val_precision': precision_score(y_val, xgb_val_pred),
    'val_recall': recall_score(y_val, xgb_val_pred),
    'val_f1_score': f1_score(y_val, xgb_val_pred)
}

# Print validation metrics for debug
print("Validation Metrics:")
for model_name in ['logistic_regression', 'random_forest', 'xgboost']:
    print(f"{model_name}: val_acc={results[model_name]['val_accuracy']:.3f}, val_f1={results[model_name]['val_f1_score']:.3f}")

# Determine the top 2 models based on accuracy
sorted_models = sorted(results.items(), key=lambda x: x[1]['accuracy'], reverse=True)
top_models = [model_name for model_name, _ in sorted_models[:2]]

# Create an ensemble model with the top 2 models
ensemble_pred_proba = np.zeros(len(y_test))
for model_name in top_models:
    if model_name == 'logistic_regression':
        ensemble_pred_proba += lr_pred_proba
    elif model_name == 'random_forest':
        ensemble_pred_proba += rf_pred_proba
    elif model_name == 'xgboost':
        ensemble_pred_proba += xgb_pred_proba

ensemble_pred_proba /= len(top_models)
ensemble_pred = (ensemble_pred_proba >= 0.5).astype(int)

results['ensemble'] = {
    'accuracy': accuracy_score(y_test, ensemble_pred),
    'precision': precision_score(y_test, ensemble_pred),
    'recall': recall_score(y_test, ensemble_pred),
    'f1_score': f1_score(y_test, ensemble_pred),
    'top_models': top_models
}

# Save models
for model_name, model in models.items():
    with open(f'../public/data/{model_name}_model.pkl', 'wb') as f:
        pickle.dump(model, f)

# Save results
with open('../public/data/model_results.json', 'w') as f:
    json.dump(results, f, indent=4)

# Save column names for future prediction
with open('../public/data/columns.json', 'w') as f:
    json.dump(list(X.columns), f)

# Generate dataset stats for visualization
stats = {
    'total_records': len(heart_data),
    'heart_attack_cases': int(heart_data['Heart Attack Risk'].sum()),
    'no_heart_attack_cases': int(len(heart_data) - heart_data['Heart Attack Risk'].sum()),
    'feature_stats': {}
}

# Calculate average values for numeric features
for column in heart_data.columns:
    if column != 'Heart Attack Risk' and heart_data[column].dtype in ['int64', 'float64']:
        stats['feature_stats'][column] = {
            'average': float(heart_data[column].mean()),
            'min': float(heart_data[column].min()),
            'max': float(heart_data[column].max())
        }

# Save stats
with open('../public/data/dataset_stats.json', 'w') as f:
    json.dump(stats, f, indent=4)

print("Training completed. Models and results saved.") 