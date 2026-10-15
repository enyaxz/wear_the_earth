import React, { useEffect, useRef, useState } from 'react';

/* ── Animated counter ── */
const StatCounter = ({ value, label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
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
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div className="stat-counter parchment-card" ref={ref}>
      <h2 className="stat-number">{count}</h2>
      <p className="stat-label">{label}</p>
    </div>
  );
};

/* ── Scroll reveal ── */
const Reveal = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { threshold: 0.15 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

const DataPage = () => {
  return (
    <div className="data-container">
      {/* Intro counter */}
      <Reveal>
        <StatCounter value={121} label="Survey Responses" />
      </Reveal>

      {/* Intro narrative */}
      <Reveal delay={100}>
        <div className="parchment-card data-intro">
          <p>Different age groups — from teens to adults — shared their voices. Here’s what we learned…</p>
        </div>
      </Reveal>

      {/* info cards */}
      <Reveal delay={200}>
        <div className="parchment-card data-card">
          <p>Out of 121 participants, <strong>102 consider the sustainability of a brand to be important.</strong></p>
        </div>
      </Reveal>

      <Reveal delay={300}>
        <div className="parchment-card data-card">
          <p><strong>48.4%</strong> would switch to a more sustainable brand, while the remaining participants said they would most probably switch.</p>
        </div>
      </Reveal>

      <Reveal delay={400}>
        <div className="parchment-card data-card">
          <p><strong>49.2%</strong> find it difficult to access information about a brand’s sustainability.</p>
        </div>
      </Reveal>

      <Reveal delay={500}>
        <div className="parchment-card data-card">
          <p>For our tool’s features: <strong>42.6%</strong> wanted simple ratings and <strong>32.8%</strong> wanted impact information.</p>
        </div>
      </Reveal>

      <Reveal delay={600}>
        <div className="parchment-card data-card">
          <p>Product Quality and Environmental Impact were the main motivations behind buying from sustainable brands.</p>
        </div>
      </Reveal>

      <Reveal delay={700}>
        <div className="parchment-card data-card">
          <p>As for barriers in buying sustainable products: <strong>higher prices</strong> and <strong>lack of information</strong> were the two main barriers.</p>
        </div>
      </Reveal>

      <Reveal delay={800}>
        <div className="parchment-card data-card">
          <p>Over <strong>85%</strong> of participants were most likely to use this tool for future purchases.</p>
        </div>
      </Reveal>

      {/* Final card */}
      <Reveal delay={900}>
        <div className="parchment-card data-final">
          <h2>create. change. connect.</h2>
        </div>
      </Reveal>
    </div>
  );
};

export default DataPage;
