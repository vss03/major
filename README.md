# Heart Attack Prediction System

A machine learning-based system for predicting heart attack risk and providing personalized diet recommendations based on health parameters.

## Features

- **Data Analysis**: Explore dataset features, visualize distributions, and understand key indicators of heart attack risk
- **Heart Attack Prediction**: Get predictions of heart attack risk using multiple machine learning models (Logistic Regression, Random Forest, XGBoost)
- **Diet Recommendations**: Receive personalized diet recommendations based on health profile
- **Model Comparison**: Compare performance metrics of different machine learning models

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Data Visualization**: Chart.js, react-chartjs-2
- **Machine Learning**: Python, scikit-learn, pandas, numpy, XGBoost
- **Integration**: Python-Shell for Node.js to Python communication

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/heart-attack-prediction.git
   cd heart-attack-prediction
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Python environment (requires Python 3.7+):
   ```bash
   # Create a virtual environment
   python -m venv venv
   
   # Activate the virtual environment
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   
   # Install Python dependencies
   pip install -r requirements.txt
   ```

## Running the Application

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
heart-attack-prediction/
├── app/                      # Next.js app directory
│   ├── components/           # React components
│   ├── data-analysis/        # Data Analysis page
│   ├── model-comparison/     # Model Comparison page
│   ├── prediction/           # Prediction page
│   ├── utils/                # Utility functions
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page
├── public/                   # Static assets
├── python/                   # Python scripts for ML models
│   ├── dataset/              # Heart attack dataset
│   ├── models/               # Saved ML models
│   ├── train.py              # Script to train models
│   └── predict.py            # Script to make predictions
├── .gitignore                # Git ignore file
├── next.config.js            # Next.js configuration
├── package.json              # NPM package configuration
├── postcss.config.js         # PostCSS configuration
├── requirements.txt          # Python dependencies
├── tailwind.config.js        # Tailwind CSS configuration
└── tsconfig.json             # TypeScript configuration
```

## Model Information

### Machine Learning Models

1. **Logistic Regression**: A statistical model that uses a logistic function to model a binary dependent variable
2. **Random Forest**: An ensemble learning method that constructs multiple decision trees during training
3. **XGBoost**: An optimized distributed gradient boosting library designed for efficiency and performance
4. **Ensemble Model**: A combined approach that leverages the strengths of all three models

### Dataset Features

- Age, Sex, Cholesterol, Heart Rate, Diabetes, Family History, Smoking, Obesity
- Alcohol Consumption, Exercise Hours, Diet, Previous Heart Problems
- Medication Use, Stress Level, Sedentary Hours, BMI, Triglycerides
- Physical Activity Days, Sleep Hours, Blood Pressure (Systolic/Diastolic)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgements

- Heart Disease Dataset from UCI Machine Learning Repository
- Various research papers on heart attack prediction and diet recommendations 