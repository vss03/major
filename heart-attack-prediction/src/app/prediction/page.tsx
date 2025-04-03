'use client';

import React, { useState, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { runPrediction } from '../utils/pythonUtils';
import { PredictionResults } from '../utils/pythonUtils';
import './styles.css';

// Define the input fields for the prediction form
const formFields = [
  { name: 'Age', type: 'number', min: 18, max: 100, required: true },
  { name: 'Sex', type: 'select', options: [{ value: 0, label: 'Female' }, { value: 1, label: 'Male' }], required: true },
  { name: 'Cholesterol', type: 'number', min: 100, max: 400, required: true },
  { name: 'Heart Rate', type: 'number', min: 40, max: 200, required: true },
  { name: 'Diabetes', type: 'select', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes' }], required: true },
  { name: 'Family History', type: 'select', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes' }], required: true },
  { name: 'Smoking', type: 'select', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes' }], required: true },
  { name: 'Obesity', type: 'select', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes' }], required: true },
  { name: 'Alcohol Consumption', type: 'select', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes' }], required: true },
  { name: 'Exercise Hours Per Week', type: 'number', min: 0, max: 40, step: 0.5, required: true },
  { name: 'Diet', type: 'select', options: [{ value: 0, label: 'Poor' }, { value: 0.5, label: 'Average' }, { value: 1, label: 'Good' }], required: true },
  { name: 'Previous Heart Problems', type: 'select', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes' }], required: true },
  { name: 'Medication Use', type: 'select', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes' }], required: true },
  { name: 'Stress Level', type: 'number', min: 1, max: 10, required: true },
  { name: 'Sedentary Hours Per Day', type: 'number', min: 0, max: 24, step: 0.5, required: true },
  { name: 'BMI', type: 'number', min: 15, max: 50, step: 0.1, required: true },
  { name: 'Triglycerides', type: 'number', min: 50, max: 800, required: true },
  { name: 'Physical Activity Days Per Week', type: 'number', min: 0, max: 7, required: true },
  { name: 'Sleep Hours Per Day', type: 'number', min: 1, max: 12, step: 0.5, required: true },
  { name: 'Systolic', type: 'number', min: 90, max: 200, required: true },
  { name: 'Diastolic', type: 'number', min: 60, max: 120, required: true }
];

// Group form fields into sections for a better UX
const formSections = [
  {
    title: "Basic Information",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    fields: ['Age', 'Sex', 'BMI', 'Cholesterol', 'Heart Rate', 'Systolic', 'Diastolic', 'Triglycerides']
  },
  {
    title: "Medical History",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m-6-8h6M5 5h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
      </svg>
    ),
    fields: ['Diabetes', 'Family History', 'Previous Heart Problems', 'Medication Use']
  },
  {
    title: "Lifestyle",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    fields: ['Smoking', 'Obesity', 'Alcohol Consumption', 'Exercise Hours Per Week', 'Diet', 'Stress Level', 'Sedentary Hours Per Day', 'Physical Activity Days Per Week', 'Sleep Hours Per Day']
  }
];

export default function Prediction() {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [results, setResults] = useState<PredictionResults | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentSection, setCurrentSection] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // For demonstration purposes, we'll return mock data
      // In a real application, we would call the API
      // const results = await runPrediction(formData);
      
      // Mock data for demonstration
      const mockResults: PredictionResults = {
        heart_attack_predictions: {
          logistic_regression: { probability: 0.32, prediction: 0 },
          random_forest: { probability: 0.45, prediction: 0 },
          xgboost: { probability: 0.38, prediction: 0 },
          ensemble: { probability: 0.41, prediction: 0 }
        },
        diet_recommendation: {
          predicted_meal_plan: 'Low-Carb Diet',
          probability: 0.78,
          top_recommendations: [
            { meal_plan: 'Low-Carb Diet', probability: 0.78 },
            { meal_plan: 'Balanced Diet', probability: 0.15 },
            { meal_plan: 'High-Protein Diet', probability: 0.07 }
          ]
        }
      };
      
      setResults(mockResults);
      
      // Scroll to the results
      setTimeout(() => {
        const resultsElement = document.getElementById('results-section');
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (err) {
      setError('Failed to make prediction. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const nextSection = () => {
    if (currentSection < formSections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const renderResultCard = (
    title: string, 
    value: number, 
    description: string, 
    prediction: number
  ) => {
    const color = prediction === 1 
      ? "from-red-500 to-red-600" 
      : value > 0.4 
        ? "from-yellow-500 to-yellow-600" 
        : "from-green-500 to-green-600";
    
    const textColor = prediction === 1 ? "text-red-600" : value > 0.4 ? "text-yellow-600" : "text-green-600";
    const bgColor = prediction === 1 ? "bg-red-50" : value > 0.4 ? "bg-yellow-50" : "bg-green-50";
    
    return (
      <div className={`bg-white rounded-xl shadow-md overflow-hidden`}>
        <div className={`h-2 bg-gradient-to-r ${color}`}></div>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
          <div className={`text-3xl font-bold mb-2 ${textColor}`}>{(value * 100).toFixed(1)}%</div>
          <p className="text-gray-600 text-sm">{description}</p>
          <div className={`mt-4 ${bgColor} px-4 py-2 rounded-lg inline-block`}>
            <span className={`font-medium ${textColor}`}>
              {prediction === 1 
                ? "High Risk" 
                : value > 0.4 
                  ? "Moderate Risk" 
                  : "Low Risk"}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const getFormField = (fieldName: string) => {
    return formFields.find(field => field.name === fieldName);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Heart Health Assessment</h1>
            <p className="text-lg text-center max-w-2xl mx-auto opacity-90">
              Complete the form below to get your personalized heart health risk assessment and diet recommendations
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-5xl mx-auto">
            {!results ? (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-blue-50 p-4 border-b border-blue-100">
                  <div className="flex items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      {formSections[currentSection].icon}
                    </div>
                    <h2 className="ml-4 text-xl font-semibold text-gray-800">
                      {formSections[currentSection].title}
                    </h2>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between mb-1 text-sm text-gray-600">
                      <span>Progress</span>
                      <span>{Math.round(((currentSection + 1) / formSections.length) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                        style={{ width: `${((currentSection + 1) / formSections.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    {formSections[currentSection].fields.map(fieldName => {
                      const field = getFormField(fieldName);
                      if (!field) return null;
                      
                      return (
                        <div key={field.name} className="mb-4">
                          <label className="block text-gray-700 mb-2 font-medium" htmlFor={field.name}>
                            {field.name}
                          </label>
                          {field.type === 'select' ? (
                            <select
                              id={field.name}
                              name={field.name}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                              onChange={handleInputChange}
                              required={field.required}
                              value={formData[field.name] || ''}
                            >
                              <option value="">Select...</option>
                              {field.options?.map(option => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <input
                              type={field.type}
                              id={field.name}
                              name={field.name}
                              min={field.min}
                              max={field.max}
                              step={field.step}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                              onChange={handleInputChange}
                              required={field.required}
                              value={formData[field.name] || ''}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="mt-8 flex justify-between">
                    {currentSection > 0 && (
                      <button
                        type="button"
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={prevSection}
                      >
                        Back
                      </button>
                    )}
                    
                    {currentSection < formSections.length - 1 ? (
                      <button
                        type="button"
                        className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        onClick={nextSection}
                      >
                        Continue
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
                        disabled={loading}
                      >
                        {loading ? (
                          <div className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </div>
                        ) : (
                          "Get Results"
                        )}
                      </button>
                    )}
                  </div>
                </form>

                {error && (
                  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
                    <p className="font-bold">Error</p>
                    <p>{error}</p>
                  </div>
                )}
              </div>
            ) : (
              <div id="results-section" className="space-y-8">
                <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
                  <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Your Heart Health Results
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Based on your input, our AI model has analyzed your risk factors and generated the following assessment. Remember, this is not a medical diagnosis but an informational tool.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {renderResultCard(
                      "Overall Risk Assessment",
                      results.heart_attack_predictions.ensemble.probability,
                      "Our ensemble model combines multiple algorithms for maximum accuracy",
                      results.heart_attack_predictions.ensemble.prediction
                    )}
                    
                    {renderResultCard(
                      "Logistic Regression",
                      results.heart_attack_predictions.logistic_regression.probability,
                      "Statistical model that estimates probabilities using a logistic function",
                      results.heart_attack_predictions.logistic_regression.prediction
                    )}
                    
                    {renderResultCard(
                      "Random Forest",
                      results.heart_attack_predictions.random_forest.probability,
                      "Ensemble learning method using multiple decision trees",
                      results.heart_attack_predictions.random_forest.prediction
                    )}
                    
                    {renderResultCard(
                      "XGBoost",
                      results.heart_attack_predictions.xgboost.probability,
                      "Optimized gradient boosting algorithm for higher precision",
                      results.heart_attack_predictions.xgboost.prediction
                    )}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                    </svg>
                    Personalized Diet Recommendations
                  </h2>
                  
                  <div className="p-6 bg-green-50 rounded-xl mb-6 border border-green-100">
                    <div className="flex flex-col md:flex-row justify-between md:items-center">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                          Recommended Diet Plan: {results.diet_recommendation.predicted_meal_plan}
                        </h3>
                        <p className="text-gray-600">
                          Confidence: {(results.diet_recommendation.probability * 100).toFixed(1)}%
                        </p>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                          Top Recommendation
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-4 text-gray-800">Alternative Recommendations</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {results.diet_recommendation.top_recommendations.slice(1).map((rec, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <h4 className="font-medium text-gray-800 mb-1">{rec.meal_plan}</h4>
                        <p className="text-sm text-gray-600">
                          Confidence: {(rec.probability * 100).toFixed(1)}%
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="text-sm text-gray-600">
                      <strong className="text-blue-700">Note:</strong> These recommendations are based on your input data and general health guidelines. For a personalized diet plan, please consult with a healthcare professional or registered dietitian.
                    </p>
                  </div>
                  
                  <div className="mt-8 flex justify-between">
                    <button
                      onClick={() => setResults(null)}
                      className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Start Over
                    </button>
                    
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Download Report
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 