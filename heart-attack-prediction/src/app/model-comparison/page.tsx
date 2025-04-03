'use client';

import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './styles.css';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { getModelResults } from '../utils/pythonUtils';
import { createModelComparisonChart, createModelAccuracyPieChart, defaultBarChartOptions, defaultPieChartOptions } from '../utils/chartUtils';

// Register Chart.js components
Chart.register(...registerables);

export default function ModelComparison() {
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const modelResults = await getModelResults();
        setResults(modelResults);
      } catch (err) {
        setError('Failed to load model results. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="page-container">
        <Header />
        <main className="main-content">
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <Header />
        <main className="main-content">
          <div className="error-alert" role="alert">
            <strong className="alert-heading">Error: </strong>
            <span>{error}</span>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!results) {
    return (
      <div className="page-container">
        <Header />
        <main className="main-content">
          <div className="error-alert" role="alert">
            <strong className="alert-heading">Note: </strong>
            <span>No model results available. Please train the models first.</span>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Prepare data for charts
  const modelNames = Object.keys(results).filter(name => name !== 'ensemble');
  modelNames.push('ensemble'); // Add ensemble at the end
  
  const metrics = {
    accuracy: modelNames.map(name => results[name].accuracy),
    precision: modelNames.map(name => results[name].precision),
    recall: modelNames.map(name => results[name].recall),
    f1_score: modelNames.map(name => results[name].f1_score)
  };

  const barChartData = createModelComparisonChart(
    modelNames,
    metrics.accuracy,
    metrics.precision,
    metrics.recall,
    metrics.f1_score
  );

  const pieChartData = createModelAccuracyPieChart(
    modelNames,
    metrics.accuracy
  );

  return (
    <div className="page-container">
      <Header />
      <main className="main-content">
        <h1 className="page-title">Model Comparison</h1>

        <div className="grid-layout">
          <div className="card">
            <h2 className="card-title">Model Accuracy Distribution</h2>
            <div style={{ height: '500px', width: '500px', margin: '0 auto' }}>
              <Pie data={pieChartData} options={defaultPieChartOptions} />
            </div>
          </div>

          <div className="card">
            <h2 className="card-title">Top Models for Ensemble</h2>
            <div className="p-4">
              <h3 className="font-semibold mb-2">The ensemble model combines:</h3>
              <ul className="list-disc list-inside space-y-1">
                {results.ensemble.top_models.map((model: string) => (
                  <li key={model} className="capitalize">{model.replace('_', ' ')}</li>
                ))}
              </ul>
              <div className="mt-4">
                <p><strong>Ensemble Accuracy:</strong> {(results.ensemble.accuracy * 100).toFixed(2)}%</p>
                <p><strong>Ensemble F1 Score:</strong> {(results.ensemble.f1_score * 100).toFixed(2)}%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="card-title">Performance Metrics Comparison</h2>
          <div className="chart-container">
            <Bar data={barChartData} options={defaultBarChartOptions} />
          </div>
        </div>

        <div className="card">
          <h2 className="card-title">Model Performance Details</h2>
          <div className="table-container">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Model</th>
                  <th>Accuracy</th>
                  <th>Precision</th>
                  <th>Recall</th>
                  <th>F1 Score</th>
                </tr>
              </thead>
              <tbody>
                {modelNames.map(model => (
                  <tr key={model} className={model === 'ensemble' ? 'bg-green-50' : ''}>
                    <td className="capitalize">{model.replace('_', ' ')}</td>
                    <td>{(results[model].accuracy * 100).toFixed(2)}%</td>
                    <td>{(results[model].precision * 100).toFixed(2)}%</td>
                    <td>{(results[model].recall * 100).toFixed(2)}%</td>
                    <td>{(results[model].f1_score * 100).toFixed(2)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 