# CardioCheck: Heart Attack Prediction System

CardioCheck is an advanced heart health assessment and diet recommendation web application powered by machine learning. The system analyzes various health indicators to predict heart attack risk and provides personalized recommendations based on the results.

![CardioCheck Screenshot](screenshot.png)

## Features

- **Heart Attack Risk Prediction**: Uses multiple machine learning models to provide accurate risk assessment
- **Model Comparison**: Interactive visualization of different ML models' performance metrics
- **Data Analysis**: Comprehensive visualization of the dataset and its key features
- **Personalized Recommendations**: Custom health advice based on individual risk factors
- **Responsive Design**: Optimized for both desktop and mobile devices

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- [npm](https://www.npmjs.com/) (v8.0.0 or higher)
- [Python](https://www.python.org/) (v3.8 or higher)
- [pip](https://pip.pypa.io/en/stable/installation/) (for Python package management)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/heart-attack-prediction.git
cd heart-attack-prediction
```

### 2. Install JavaScript Dependencies

```bash
npm install
```

### 3. Set Up Python Environment

It's recommended to use a virtual environment for Python dependencies:

```bash
# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

### 4. Install Python Dependencies

```bash
pip install -r requirements.txt
```

The `requirements.txt` file should include:

```
scikit-learn==1.2.2
pandas==2.0.0
numpy==1.24.3
matplotlib==3.7.1
xgboost==1.7.5
tensorflow==2.12.0
flask==2.3.2
```

### 5. Set Up Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
PYTHON_PATH=/path/to/your/python/executable
```

Replace `/path/to/your/python/executable` with the actual path to your Python executable (the one in your virtual environment).

## Running the Application

### Development Mode

```bash
# Start the development server
npm run dev
```

This will start the application in development mode with hot-reload. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Production Build

```bash
# Build the application
npm run build

# Start the production server
npm start
```

## Application Structure

### Frontend

The application is built with Next.js and organized as follows:

- `src/app/`: Contains the main pages and components
  - `page.tsx`: Homepage
  - `data-analysis/`: Data visualization and analysis page
  - `model-comparison/`: Model comparison and performance metrics
  - `prediction/`: Heart attack prediction form and results
  - `components/`: Reusable UI components
  - `utils/`: Utility functions

### Backend

The Python backend handles machine learning operations:

- `python/`: Python scripts for ML processing
  - `models/`: Trained machine learning models
  - `data/`: Dataset and preprocessing scripts
  - `prediction.py`: Heart attack prediction logic
  - `model_comparison.py`: Model evaluation and comparison

## Usage Guide

### Home Page

The home page provides an overview of the application and its features. From here, you can navigate to:

- **Health Assessment**: Complete the health assessment form to get your heart attack risk prediction
- **Data Analysis**: View visualizations and statistics about the heart attack dataset
- **Model Comparison**: Compare the performance of different machine learning models

### Health Assessment

1. Fill in your health parameters in the form:
   - Age, gender, blood pressure
   - Cholesterol levels
   - Blood sugar levels
   - ECG results
   - Heart rate
   - Lifestyle factors

2. Click "Submit" to process your data and see your results.

3. The system will display:
   - Your heart attack risk level
   - Key factors contributing to your risk
   - Personalized recommendations for diet and lifestyle changes

### Data Analysis

Explore the heart attack dataset with interactive visualizations:
- Distribution of heart attack cases
- Key feature statistics
- Correlation between different health factors

### Model Comparison

Compare the performance of different machine learning models:
- Accuracy, precision, recall, and F1 scores
- Model accuracy distribution
- Detailed performance metrics for each model

## Technologies Used

### Frontend
- **Next.js**: React framework for web applications
- **React**: JavaScript library for building user interfaces
- **Chart.js**: JavaScript library for data visualization
- **Custom CSS**: For styling components

### Backend
- **Python**: Programming language for machine learning
- **scikit-learn**: Machine learning library
- **TensorFlow**: Machine learning platform
- **XGBoost**: Gradient boosting framework
- **pandas**: Data manipulation and analysis

## Troubleshooting

### Common Issues

#### Python Integration Issues

If you encounter errors related to Python integration:

1. Ensure the Python path in your `.env.local` file is correct
2. Check that all Python dependencies are installed
3. Verify that the virtual environment is activated

```bash
# Verify Python installation
python --version

# Check if packages are installed
pip list
```

#### Chart Rendering Issues

If charts are not rendering properly:

1. Clear your browser cache
2. Ensure Chart.js is properly imported
3. Check the browser console for any JavaScript errors

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
