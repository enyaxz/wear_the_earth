import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';
import BrandCard from './BrandCard';
import './App.css';
import About from './About';
import DataPage from './DataPage'; 

/* ── leaf particles (50-50 chance of this working) ── */
const LeafParticles = () => {
  const leaves = Array.from({ length: 18 }, (_, i) => i);
  return (
    <div className="leaf-field" aria-hidden="true">
      {leaves.map((i) => (
        <span
          key={i}
          className="leaf"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 12}s`,
            animationDuration: `${10 + Math.random() * 14}s`,
            fontSize: `${0.7 + Math.random() * 1.4}rem`,
            opacity: 0.08 + Math.random() * 0.18,
          }}
        >
          {['🌿', '🍃', '🌱', '✦', '◈'][Math.floor(Math.random() * 5)]}
        </span>
      ))}
    </div>
  );
};

/* ── page wrapper ── */
const PageTransition = ({ children }) => {
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 40);
    return () => clearTimeout(t);
  }, [location.pathname]);
  return (
    <div className={`page-transition ${visible ? 'page-visible' : ''}`}>
      {children}
    </div>
  );
};

/* ── Nav link ── */
const NavLink = ({ to, children }) => (
  <Link to={to} className="nav-link">
    <span className="nav-link-text">{children}</span>
    <span className="nav-link-bar" />
  </Link>
);

const App = () => {
  const [brandData, setBrandData] = useState(null);
  const [ethicalAlternatives, setEthicalAlternatives] = useState([]);
  const [error, setError] = useState('');
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setTitleVisible(true), 120);
    return () => clearTimeout(t);
  }, []);

  const handleSearch = (data) => {
    if (data.error) {
      setError(data.error);
      setBrandData(null);
      setEthicalAlternatives([]);
    } else {
      setError('');
      setBrandData(data);
      setEthicalAlternatives(data.ethicalAlternatives || []);
    }
  };

  return (
    <Router>
      {/* Atmospheric background */}
      <div className="bg-orb bg-orb--1" aria-hidden="true" />
      <div className="bg-orb bg-orb--2" aria-hidden="true" />
      <div className="bg-orb bg-orb--3" aria-hidden="true" />
      <LeafParticles />

      <div className="app-container">
        {/* Navigation ABOVE title */}
        <nav className="navbar">
          <div className="navbar-inner">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/data">Data</NavLink> {/* new link */}
          </div>
        </nav>

        {/* Title with font */}
        <h1 className={`app-title ${titleVisible ? 'title-visible' : ''}`}>
          Wear The Earth
        </h1>

        {/* Subtitle tagline */}
        <p className={`app-tagline ${titleVisible ? 'tagline-visible' : ''}`}>
          Discover the ethics behind every label
        </p>

        {/* Routes */}
        <Routes>
          <Route
            path="/"
            element={
              <PageTransition>
                <SearchBar onSearch={handleSearch} />
                {error && (
                  <p className="error-message">
                    <span className="error-icon">⚠</span> {error}
                  </p>
                )}
                {brandData ? (
                  <div className="brand-card-wrapper">
                    <BrandCard
                      data={brandData}
                      ethicalAlternatives={ethicalAlternatives}
                    />
                  </div>
                ) : (
                  <div className="empty-state">
                    <div className="empty-icon">🌍</div>
                    <p className="empty-text">Brand info will appear here</p>
                  </div>
                )}
              </PageTransition>
            }
          />
          <Route
            path="/about"
            element={
              <PageTransition>
                <About />
              </PageTransition>
            }
          />
          <Route
            path="/data"
            element={
              <PageTransition>
                <DataPage /> {/* new route */}
              </PageTransition>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
