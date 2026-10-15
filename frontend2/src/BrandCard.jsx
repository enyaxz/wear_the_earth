import React from 'react';

const BrandCard = ({ data, ethicalAlternatives }) => {
  return (
    <div className="brand-card parchment-card fade-in">
      <h2 className="brand-name">{data.Brand}</h2>

      <div className="brand-info">
        <p><strong>Sustainability:</strong> {data.Sustainability}</p>
        <p><strong>Issues:</strong> {data.Issues}</p>
        <p><strong>Material Sourcing:</strong> {data.MaterialSourcing}</p>
        <p><strong>Recycling Efforts:</strong> {data.Recycling}</p>
        <p><strong>Sustainability Pledges:</strong> {data.SustainabilityPledges}</p>
        <p><strong>Transparency Score:</strong> {data.TransparencyScore}</p>
        <p><strong>Category:</strong> {data.Category}</p>
      </div>

      {data.Alternatives && data.Alternatives.length > 0 && (
        <div className="alternatives parchment-card mini-section">
          <h4>Smarter Alternatives (Manual)</h4>
          <ul>
            {data.Alternatives.map((alt, i) => (
              <li key={i}>{alt}</li>
            ))}
          </ul>
        </div>
      )}

      {ethicalAlternatives && ethicalAlternatives.length > 0 && (
        <div className="alternatives parchment-card mini-section">
          <h4>Ethical Alternatives (Same Category, Better Tag)</h4>
          <ul>
            {ethicalAlternatives.map((alt, i) => (
              <li key={i}>{alt}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BrandCard;
