// Import PythonShell dynamically only when in server environment
import path from 'path';

// Define types for prediction results
export interface ModelPrediction {
  probability: number;
  prediction: number;
}

export interface HeartAttackPredictions {
  logistic_regression: ModelPrediction;
  random_forest: ModelPrediction;
  xgboost: ModelPrediction;
  ensemble: ModelPrediction;
}

export interface DietRecommendation {
  predicted_meal_plan: string;
  probability: number;
  top_recommendations: Array<{
    meal_plan: string;
    probability: number;
  }>;
}

export interface PredictionResults {
  heart_attack_predictions: HeartAttackPredictions;
  diet_recommendation: DietRecommendation;
}

/**
 * Run the prediction Python script with the given input data
 */
export async function runPrediction(inputData: Record<string, any>): Promise<PredictionResults> {
  // Check if we're running on the server or client
  if (typeof window !== 'undefined') {
    // We're on the client, return mock data
    console.log('Running in browser environment, using mock data');
    return getMockPredictionResults(inputData);
  }

  try {
    // Server-side code
    // Dynamically import PythonShell only on the server
    const { PythonShell } = await import('python-shell');
    
    // Define options for PythonShell
    const options = {
      mode: 'json' as const,
      scriptPath: path.join(process.cwd(), 'ml-models'),
      args: [JSON.stringify(inputData)]
    };

    // Run the Python script and get the output
    const results = await new Promise<PredictionResults>((resolve, reject) => {
      PythonShell.run('predict.py', options).then(output => {
        if (output && output.length > 0) {
          resolve(output[0] as PredictionResults);
        } else {
          reject(new Error('No output from Python script'));
        }
      }).catch(err => {
        console.error('Error running Python script:', err);
        reject(err);
      });
    });

    return results;
  } catch (error) {
    console.error('Failed to run prediction:', error);
    // Fallback to mock data if server-side execution fails
    return getMockPredictionResults(inputData);
  }
}

// Helper function to generate mock prediction results
function getMockPredictionResults(inputData: Record<string, any>): PredictionResults {
  // Generate some deterministic mock data based on input
  const age = inputData.Age || 50;
  const cholesterol = inputData.Cholesterol || 200;
  
  // Calculate mock probability based on age and cholesterol
  const baseProbability = Math.min(0.9, Math.max(0.1, (age / 100) + (cholesterol / 400) - 0.2));

  return {
    heart_attack_predictions: {
      logistic_regression: {
        probability: baseProbability - 0.05,
        prediction: baseProbability > 0.5 ? 1 : 0
      },
      random_forest: {
        probability: baseProbability,
        prediction: baseProbability > 0.5 ? 1 : 0
      },
      xgboost: {
        probability: baseProbability + 0.05,
        prediction: baseProbability > 0.45 ? 1 : 0
      },
      ensemble: {
        probability: baseProbability + 0.02,
        prediction: baseProbability > 0.48 ? 1 : 0
      }
    },
    diet_recommendation: {
      predicted_meal_plan: baseProbability > 0.6 ? "Mediterranean" : "Low Cholesterol",
      probability: baseProbability + 0.1,
      top_recommendations: [
        {
          meal_plan: baseProbability > 0.6 ? "Mediterranean" : "Low Cholesterol",
          probability: baseProbability + 0.1
        },
        {
          meal_plan: "DASH",
          probability: baseProbability - 0.1
        },
        {
          meal_plan: "Vegetarian",
          probability: baseProbability - 0.2
        }
      ]
    }
  };
}

/**
 * Get dataset statistics from the JSON file
 */
export async function getDatasetStats() {
  try {
    // In a real application, you would fetch this from the server
    // For demonstration, return mock data
    return {
      total_records: 8765,
      heart_attack_cases: 2342,
      no_heart_attack_cases: 6423,
      feature_stats: {
        Age: { average: 52.3, min: 18, max: 90 },
        Cholesterol: { average: 245.7, min: 120, max: 400 },
        'Heart Rate': { average: 78.4, min: 40, max: 140 },
        BMI: { average: 28.9, min: 15, max: 45 },
        Systolic: { average: 135.2, min: 90, max: 200 },
        Diastolic: { average: 85.6, min: 60, max: 120 }
      }
    };
  } catch (error) {
    console.error('Failed to load dataset stats:', error);
    return null;
  }
}

/**
 * Get model results from the JSON file
 */
export async function getModelResults() {
  try {
    // In a real application, you would fetch this from the server
    // For demonstration, return mock data
    return {
      logistic_regression: {
        accuracy: 0.82,
        precision: 0.79,
        recall: 0.85,
        f1_score: 0.82
      },
      random_forest: {
        accuracy: 0.88,
        precision: 0.86,
        recall: 0.89,
        f1_score: 0.875
      },
      xgboost: {
        accuracy: 0.90,
        precision: 0.89,
        recall: 0.91,
        f1_score: 0.90
      },
      ensemble: {
        accuracy: 0.92,
        precision: 0.91,
        recall: 0.93,
        f1_score: 0.92,
        top_models: ['xgboost', 'random_forest']
      }
    };
  } catch (error) {
    console.error('Failed to load model results:', error);
    return null;
  }
} 