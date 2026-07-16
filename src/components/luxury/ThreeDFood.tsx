'use client';

import React, { useState } from 'react';

export default function ThreeDFood() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // 🍣 LUXURY SIGNATURE DISHES METADATA STACK
  const luxuryDishes = [
    { name: "Imperial Shahi Paneer", tag: "Signature Cream Matrix", price: "₹345", icon: "fa-bowl-food", glow: "rgba(245, 158, 11, 0.3)" },
    { name: "Artisanal Margherita Pizza", tag: "Woodfired Neapolitan", price: "₹395", icon: "fa-pizza-slice", glow: "rgba(239, 68, 68, 0.3)" },
    { name: "Aurelia Truffle Burger", tag: "Gold Flaked Brioche", price: "₹195", icon: "fa-hamburger", glow: "rgba(59, 130, 246, 0.3)" }
  ];

  return (
    <div style={{
      background: '#0B0F19',
      padding: '6rem 2rem',
      borderTop: '1px solid rgba(255,255,255,0.02)'
    }}>
      {/* 🔮 INTERACTIVE STYLE FOR 3D FLOATING HOVER EFFECTS */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .floating-card { transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1); transform-style: preserve-3d; }
        .floating-card:hover { transform: translateY(-15px) rotateX(10deg) rotateY(10deg); border-color: #F59E0B !important; }
        .inner-3d-element { transform: translateZ(50px); transition: all 0.5s; }
      `}} />

      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>

        {/* SECTION NAVIGATION HEADER */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <span style={{ color: '#F59E0B', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2rem' }}>Interactive Atelier</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', margin: '0.5rem 0', color: '#FFF' }}>
            3D Culinary Showcase
          </h2>
          <p style={{ color: '#9CA3AF', fontSize: '0.9rem', margin: 0 }}>Hover over our masterpieces to activate the dimensional sensory matrix.</p>
        </div>

        {/* 3D CARDS DISTRIBUTION GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
          {luxuryDishes.map((dish, index) => (
            <div
              key={index}
              className="floating-card"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                background: '#1F2937',
                borderRadius: '2.5rem',
                padding: '3rem 2rem',
                textAlign: 'center',
                border: '1px solid rgba(255,255,255,0.03)',
                boxShadow: hoveredIndex === index ? `0 30px 60px ${dish.glow}` : '0 20px 40px rgba(0,0,0,0.4)',
                cursor: 'pointer'
              }}
            >
              {/* INTERACTIVE FLOATING 3D ICON */}
              <div className="inner-3d-element" style={{
                background: 'rgba(255,255,255,0.02)',
                width: '5.5rem',
                height: '5.5rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 2rem auto',
                fontSize: '2.8rem',
                color: hoveredIndex === index ? '#F59E0B' : '#9CA3AF',
                border: hoveredIndex === index ? '1px solid rgba(245,158,11,0.2)' : '1px solid rgba(255,255,255,0.05)',
                transition: '0.3s'
              }}>
                <i className={`fa-solid ${dish.icon}`}></i>
              </div>

              {/* CARD TYPOGRAPHY DISPATCH */}
              <span style={{ fontSize: '0.75rem', color: '#F59E0B', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05rem' }}>{dish.tag}</span>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', margin: '0.5rem 0 1rem 0', color: '#FFF' }}>{dish.name}</h3>

              <div style={{
                fontSize: '1.6rem',
                fontWeight: 700,
                color: '#FFF',
                fontFamily: 'sans-serif',
                marginTop: '1.5rem',
                letterSpacing: '0.05rem'
              }}>
                {dish.price}
              </div>

              <div style={{ marginTop: '2rem', fontSize: '0.75rem', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                Explore Gastronomy <i className="fa-solid fa-chevron-right" style={{ fontSize: '0.65rem' }}></i>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
