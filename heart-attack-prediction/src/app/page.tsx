'use client';

import React from 'react';
import Link from 'next/link';
import Header from './components/Header';
import Footer from './components/Footer';
import './page.css';

export default function Home() {
  return (
    <div className="page-container">
      <Header />
      <main className="main-content">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-container">
            <h1 className="hero-title">
              Heart Health Assessment & Personalized Diet Plan
            </h1>
            <p className="hero-subtitle">
              Get accurate heart attack risk predictions and personalized diet recommendations using our advanced AI-powered system.
            </p>
            <div>
              <Link href="/prediction" className="cta-button">
                Take Health Assessment
              </Link>
              <Link href="/data-analysis" className="cta-button-secondary">
                Explore Data
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="how-it-works-section">
          <div className="steps-container">
            <h2 className="section-title">How It Works</h2>
            <p className="hero-subtitle">
              Our system uses advanced machine learning to assess your heart health and provide personalized recommendations.
            </p>

            <div className="step-item">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3 className="step-title">Enter Your Health Data</h3>
                <p className="step-description">
                  Fill in your health parameters in our secure form to begin your assessment.
                </p>
              </div>
            </div>

            <div className="step-item">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3 className="step-title">AI Processing</h3>
                <p className="step-description">
                  Our machine learning models analyze your data using multiple algorithms for accuracy.
                </p>
              </div>
            </div>

            <div className="step-item">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3 className="step-title">Get Personalized Results</h3>
                <p className="step-description">
                  Receive your heart attack risk assessment along with customized diet recommendations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Models Section */}
        <section className="models-section">
          <h2 className="section-title">Our Prediction Models</h2>
          <p className="hero-subtitle">
            We use multiple machine learning models to ensure the highest prediction accuracy.
          </p>

          <div className="models-grid">
            <div className="model-card">
              <h3 className="model-title">Logistic Regression</h3>
              <p className="model-description">
                A statistical model that uses a logistic function to model a binary outcome.
              </p>
              <div className="model-accuracy">Accuracy: 75%</div>
            </div>

            <div className="model-card">
              <h3 className="model-title">Random Forest</h3>
              <p className="model-description">
                An ensemble learning method that constructs multiple decision trees during training.
              </p>
              <div className="model-accuracy">Accuracy: 82%</div>
            </div>

            <div className="model-card">
              <h3 className="model-title">XGBoost</h3>
              <p className="model-description">
                An optimized distributed gradient boosting library designed for efficiency and performance.
              </p>
              <div className="model-accuracy">Accuracy: 88%</div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <h2 className="section-title">Key Features</h2>
          
          <div className="features-container">
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="feature-title">Multiple ML Models</h3>
                <p className="feature-description">
                  We combine multiple machine learning algorithms to provide the most accurate predictions possible.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="feature-title">Customized Recommendations</h3>
                <p className="feature-description">
                  Receive personalized diet and lifestyle recommendations based on your health profile.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="feature-title">Privacy & Security</h3>
                <p className="feature-description">
                  Your health data is processed securely and we never share your personal information.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
} 