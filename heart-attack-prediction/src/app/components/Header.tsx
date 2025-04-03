import React, { useState } from 'react';
import Link from 'next/link';
import './Header.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-container">
          <Link href="/" className="logo">
            <svg xmlns="http://www.w3.org/2000/svg" className="logo-icon" width="32" height="32" viewBox="0 0 20 20" fill="#0ea5e9">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            <span>
              CardioCheck
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="nav-container">
          <ul className="desktop-nav-list">
            <li className="nav-item">
              <Link href="/" className="nav-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor" style={{ marginRight: '0.25rem' }}>
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/data-analysis" className="nav-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor" style={{ marginRight: '0.25rem' }}>
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
                Data Analysis
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/prediction" className="nav-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor" style={{ marginRight: '0.25rem' }}>
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                Health Check
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/model-comparison" className="nav-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor" style={{ marginRight: '0.25rem' }}>
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-14a3 3 0 00-3 3v2H7a1 1 0 000 2h1v1a1 1 0 01-1 1 1 1 0 100 2 3 3 0 003-3v-2h1a1 1 0 100-2h-1V7a1 1 0 011-1 1 1 0 100-2z" clipRule="evenodd" />
                </svg>
                Model Comparison
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile menu button */}
        <button
          className="mobile-menu-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="mobile-menu">
          <ul className="mobile-nav-list">
            <li className="nav-item">
              <Link 
                href="/" 
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                href="/data-analysis" 
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Data Analysis
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                href="/prediction" 
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Health Check
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                href="/model-comparison" 
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Model Comparison
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
} 