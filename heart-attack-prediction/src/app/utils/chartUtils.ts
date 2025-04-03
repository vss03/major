import { ChartData, ChartOptions } from 'chart.js';

// Create a bar chart for dataset statistics
export function createStatsBarChart(data: Record<string, { average: number; min: number; max: number }>): ChartData<'bar'> {
  // Extract feature names and their average values
  const features = Object.keys(data);
  const averages = features.map(feature => data[feature].average);

  return {
    labels: features,
    datasets: [
      {
        label: 'Average Values',
        data: averages,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };
}

// Create a pie chart for heart attack cases
export function createHeartAttackPieChart(heartAttackCases: number, noHeartAttackCases: number): ChartData<'pie'> {
  return {
    labels: ['Heart Attack', 'No Heart Attack'],
    datasets: [
      {
        data: [heartAttackCases, noHeartAttackCases],
        backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  };
}

// Create a bar chart for model accuracy comparison
export function createModelComparisonChart(
  models: string[],
  accuracies: number[],
  precisions: number[],
  recalls: number[],
  f1Scores: number[]
): ChartData<'bar'> {
  return {
    labels: models,
    datasets: [
      {
        label: 'Accuracy',
        data: accuracies,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Precision',
        data: precisions,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Recall',
        data: recalls,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'F1 Score',
        data: f1Scores,
        backgroundColor: 'rgba(255, 206, 86, 0.5)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
      },
    ],
  };
}

// Create a pie chart for model accuracy comparison
export function createModelAccuracyPieChart(models: string[], accuracies: number[]): ChartData<'pie'> {
  return {
    labels: models,
    datasets: [
      {
        data: accuracies,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
}

// Default chart options
export const defaultBarChartOptions: ChartOptions<'bar'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Data Analysis',
    },
    animation: {
      easing: 'easeOutQuart',
    },
  },
};

export const defaultPieChartOptions: ChartOptions<'pie'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Distribution',
    },
    animation: {
      easing: 'easeOutQuart',
    },
  },
}; 