import React from 'react';
import Link from 'next/link';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="logo-container">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 20 20" fill="#0ea5e9" style={{ marginRight: '0.5rem' }}>
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              <span className="logo">
                CardioCheck
              </span>
            </div>
            <p className="footer-description">
              Advanced heart health assessment and diet recommendations powered by machine learning.
            </p>
            <div className="social-links">
              <a href="#" className="social-link">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="social-link">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="social-link">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-heading">
              Services
            </h3>
            <ul className="footer-link-list">
              <li className="footer-link-item">
                <Link href="/prediction" className="footer-link">
                  Health Check
                </Link>
              </li>
              <li className="footer-link-item">
                <Link href="/data-analysis" className="footer-link">
                  Data Analysis
                </Link>
              </li>
              <li className="footer-link-item">
                <Link href="/model-comparison" className="footer-link">
                  Model Comparison
                </Link>
              </li>
              <li className="footer-link-item">
                <a href="#" className="footer-link">
                  Diet Planning
                </a>
              </li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-heading">
              Resources
            </h3>
            <ul className="footer-link-list">
              <li className="footer-link-item">
                <a href="#" className="footer-link">
                  Blog
                </a>
              </li>
              <li className="footer-link-item">
                <a href="#" className="footer-link">
                  Heart Health Guide
                </a>
              </li>
              <li className="footer-link-item">
                <a href="#" className="footer-link">
                  Nutrition Facts
                </a>
              </li>
              <li className="footer-link-item">
                <a href="#" className="footer-link">
                  Research Papers
                </a>
              </li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-heading">
              Contact Us
            </h3>
            <p className="footer-description">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ display: 'inline-block', marginRight: '0.5rem' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              support@cardiocheck.com
            </p>
            <p className="footer-description">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ display: 'inline-block', marginRight: '0.5rem' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              (123) 456-7890
            </p>
          </div>
        </div>
        
        <div className="copyright">
          <p>
            &copy; {new Date().getFullYear()} CardioCheck. All rights reserved.
          </p>
          <p style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>
            This tool is intended for informational purposes only and should not replace professional medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
} 