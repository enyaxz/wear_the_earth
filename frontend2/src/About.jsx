import React, { useEffect, useRef, useState } from 'react';

/* ── Animated counter for stats ── */
const StatCounter = ({ value, label, symbol = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 1600;
          const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * value));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div className="stat-item" ref={ref}>
      <span className="stat-number">{count}{symbol}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
};

/* ── Scroll-reveal wrapper ── */
const Reveal = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

/* ── Feature card ── */
const FeatureCard = ({ icon, title, description, delay }) => (
  <Reveal delay={delay}>
    <div className="feature-card">
      <div className="feature-icon">{icon}</div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-desc">{description}</p>
    </div>
  </Reveal>
);

const About = () => {
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeaderVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="about-container">

      {/* ── Hero Header ── */}
      <header className={`about-header parchment-card ${headerVisible ? 'about-header--visible' : ''}`}>
        <div className="about-header-glow" aria-hidden="true" />
        <div className="about-header-icon">🌍</div>
        <h1 className="about-title">About Wear The Earth</h1>
        <p className="about-tagline">
          Empowering conscious fashion choices through transparency and data.
        </p>
        <div className="about-header-divider" />
      </header>

      {/* ── Stats strip ── */}
      <Reveal delay={100}>
        <div className="about-stats parchment-card">
          <StatCounter value={121} label="Survey Responses" />
          <div className="stat-divider" />
          <StatCounter value={3} label="Verdict Types" />
          <div className="stat-divider" />
          <StatCounter value={1} label="Solo Project" />
        </div>
      </Reveal>

      {/* ── Mission ── */}
      <Reveal delay={150}>
        <section className="about-section parchment-card about-mission">
          <div className="section-icon">🎯</div>
          <div className="section-body">
            <h2>Our Mission</h2>
            <p>
              Wear The Earth was created to help consumers make ethical fashion
              decisions by providing clear sustainability insights on brands.
              We believe that transparency drives change, and every choice matters.
            </p>
          </div>
        </section>
      </Reveal>

      {/* ── Story ── */}
      <Reveal delay={200}>
        <section className="about-section parchment-card about-story">
          <div className="section-icon">📖</div>
          <div className="section-body">
            <h2>Our Story</h2>
            <p>
              Born from a vision to honor sacrifice and legacy, this project
              transforms raw data into accessible insights. It bridges the gap
              between consumer awareness and brand accountability, ensuring that
              sustainability is more than a buzzword.
            </p>
          </div>
        </section>
      </Reveal>

      {/* ── Core Features (cards grid) ── */}
      <section className="about-features-section">
        <Reveal>
          <h2 className="features-heading">Core Features</h2>
        </Reveal>
        <div className="features-grid">
          <FeatureCard
            icon="🏷️"
            title="Brand Verdicts"
            description="Clear rulings: Sustainable, Unsustainable, or Questionable."
            delay={0}
          />
          <FeatureCard
            icon="📊"
            title="Impact Insights"
            description="Scores on sourcing practices, recycling programs, and transparency."
            delay={100}
          />
          <FeatureCard
            icon="🌿"
            title="Ethical Alternatives"
            description="Category-based recommendations so you always have a better option."
            delay={200}
          />
        </div>
      </section>

      {/* ── Footer CTA ── */}
      <Reveal delay={100}>
        <footer className="about-footer parchment-card">
          <div className="footer-leaf" aria-hidden="true">🍃</div>
          <p>
            Together, we can wear the earth responsibly and drive meaningful change.
          </p>
          <div className="footer-dots" aria-hidden="true">
            <span /><span /><span />
          </div>
        </footer>
      </Reveal>

    </div>
  );
};

export default About;
