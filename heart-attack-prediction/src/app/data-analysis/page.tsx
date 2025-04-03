'use client';

import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { getDatasetStats } from '../utils/pythonUtils';
import { createStatsBarChart, createHeartAttackPieChart, defaultBarChartOptions, defaultPieChartOptions } from '../utils/chartUtils';
import './styles.css';

// Register Chart.js components
Chart.register(...registerables);

export default function DataAnalysis() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const datasetStats = await getDatasetStats();
        setStats(datasetStats);
      } catch (err) {
        setError('Failed to load dataset statistics. Please try again later.');
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

  if (!stats) {
    return (
      <div className="page-container">
        <Header />
        <main className="main-content">
          <div className="warning-alert" role="alert">
            <strong className="alert-heading">Note: </strong>
            <span>No dataset statistics available. Please train the models first.</span>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const barChartData = createStatsBarChart(stats.feature_stats);
  const pieChartData = createHeartAttackPieChart(stats.heart_attack_cases, stats.no_heart_attack_cases);

  return (
    <div className="page-container">
      <Header />
      <main className="main-content">
        <h1 className="page-title">Heart Attack Dataset Analysis</h1>

        <div className="grid-layout">
          <div className="card">
            <h2 className="card-title">Dataset Overview</h2>
            <ul className="stats-list">
              <li><strong>Total Records:</strong> {stats.total_records}</li>
              <li><strong>Heart Attack Cases:</strong> {stats.heart_attack_cases}</li>
              <li><strong>No Heart Attack Cases:</strong> {stats.no_heart_attack_cases}</li>
              <li><strong>Heart Attack Rate:</strong> {((stats.heart_attack_cases / stats.total_records) * 100).toFixed(2)}%</li>
            </ul>
          </div>

          <div className="card">
            <h2 className="card-title">Heart Attack Distribution</h2>
            <div className="chart-container">
              <Pie data={pieChartData} options={defaultPieChartOptions} />
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="card-title">Feature Statistics</h2>
          <div className="feature-chart-container">
            <Bar data={barChartData} options={defaultBarChartOptions} />
          </div>
        </div>

        <div className="card">
          <h2 className="card-title">Key Features</h2>
          <div>
            <p className="info-text">
              The heart attack prediction dataset includes various health indicators such as age, 
              cholesterol levels, blood pressure, BMI, and lifestyle factors. The models analyze 
              these features to identify patterns associated with heart attack risk.
            </p>
            <div className="table-wrapper">
              <table className="stats-table">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>Average Value</th>
                    <th>Minimum</th>
                    <th>Maximum</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(stats.feature_stats).map(([feature, values]: [string, any]) => (
                    <tr key={feature}>
                      <td>{feature}</td>
                      <td>{values.average.toFixed(2)}</td>
                      <td>{values.min.toFixed(2)}</td>
                      <td>{values.max.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 