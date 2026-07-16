'use client';

import React, { useState } from 'react';

export default function WinePairing() {
  const [selectedDish, setSelectedDish] = useState('paneer');

  // 🍷 LUXURY SOMMELIER MATRIX DATA
  const pairingData: Record<string, { wine: string; year: string; notes: string; origin: string }> = {
    paneer: {
      wine: "Château d'Yquem Premier Cru",
      year: "2015 Vintage",
      notes: "Rich, honeyed sweetness beautifully cuts through the creamy texture and aromatic spices of Shahi Paneer.",
      origin: "Sauternes, France"
    },
    makhani: {
      wine: "Domaine de la Romanée-Conti Grand Cru",
      year: "2018 Vintage",
      notes: "An elegant, silky Pinot Noir that balances the deep, slow-cooked buttery richness of Dal Makhani.",
      origin: "Burgundy, France"
    },
    pizza: {
      wine: "Tignanello Toscana IGT",
      year: "2019 Vintage",
      notes: "Crisp Sangiovese acidity perfectly harmonizes with the woodfired crust and fresh mozzarella fats.",
      origin: "Tuscany, Italy"
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(180deg, #111827 0%, #0B0F19 100%)',
      padding: '6rem 2rem',
      borderTop: '1px solid rgba(255,255,255,0.02)',
      borderBottom: '1px solid rgba(255,255,255,0.02)'
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* SECTION HEADER */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ color: '#F59E0B', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2rem' }}>Royal Sommelier Guide</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', margin: '0.5rem 0', color: '#FFF' }}>
            Interactive Wine & Fine Dine Pairing
          </h2>
          <p style={{ color: '#9CA3AF', fontSize: '0.9rem', margin: 0 }}>Select your exquisite dish to unlock its perfect vintage companion.</p>
        </div>

        {/* INTERACTIVE ROW LAYOUT */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>

          {/* DISH CONTROLLER BUTTONS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <button
              onClick={() => setSelectedDish('paneer')}
              style={{
                background: selectedDish === 'paneer' ? 'rgba(245,158,11,0.08)' : '#1F2937',
                border: selectedDish === 'paneer' ? '1px solid #F59E0B' : '1px solid rgba(255,255,255,0.03)',
                padding: '1.5rem', borderRadius: '1.5rem', color: '#FFF', textAlign: 'left', cursor: 'pointer', transition: '0.3s'
              }}
            >
              <h4 style={{ margin: '0 0 0.2rem 0', fontSize: '1.1rem' }}>👑 Shahi Paneer Pairing</h4>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#9CA3AF' }}>Royal North Indian Cream Delicacy</p>
            </button>

            <button
              onClick={() => setSelectedDish('makhani')}
              style={{
                background: selectedDish === 'makhani' ? 'rgba(245,158,11,0.08)' : '#1F2937',
                border: selectedDish === 'makhani' ? '1px solid #F59E0B' : '1px solid rgba(255,255,255,0.03)',
                padding: '1.5rem', borderRadius: '1.5rem', color: '#FFF', textAlign: 'left', cursor: 'pointer', transition: '0.3s'
              }}
            >
              <h4 style={{ margin: '0 0 0.2rem 0', fontSize: '1.1rem' }}>🏺 Dal Makhani Pairing</h4>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#9CA3AF' }}>Slow-cooked Black Lentil Masterpiece</p>
            </button>

            <button
              onClick={() => setSelectedDish('pizza')}
              style={{
                background: selectedDish === 'pizza' ? 'rgba(245,158,11,0.08)' : '#1F2937',
                border: selectedDish === 'pizza' ? '1px solid #F59E0B' : '1px solid rgba(255,255,255,0.03)',
                padding: '1.5rem', borderRadius: '1.5rem', color: '#FFF', textAlign: 'left', cursor: 'pointer', transition: '0.3s'
              }}
            >
              <h4 style={{ margin: '0 0 0.2rem 0', fontSize: '1.1rem' }}>🍕 Woodfired Pizza Pairing</h4>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#9CA3AF' }}>Artisanal Mozzarella Margherita</p>
            </button>
          </div>

          {/* DYNAMIC SOMMELIER CELL DISPLAY */}
          <div style={{
            background: '#1F2937',
            padding: '3rem 2.5rem',
            borderRadius: '2.5rem',
            border: '1px solid rgba(245,158,11,0.15)',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
            position: 'relative'
          }}>
            <i className="fa-solid fa-wine-glass" style={{ position: 'absolute', top: '2rem', right: '2.5rem', fontSize: '2.5rem', color: 'rgba(245,158,11,0.15)' }}></i>

            <span style={{ fontSize: '0.75rem', color: '#F59E0B', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.1rem', display: 'block', marginBottom: '0.5rem' }}>
              {pairingData[selectedDish].year} • {pairingData[selectedDish].origin}
            </span>
            <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.8rem', fontFamily: "'Playfair Display', serif", color: '#FFF' }}>
              {pairingData[selectedDish].wine}
            </h3>

            <p style={{ margin: 0, fontSize: '0.9rem', color: '#D1D5DB', lineHeight: '1.7', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem' }}>
              <i className="fa-solid fa-quote-left" style={{ color: '#F59E0B', marginRight: '0.5rem' }}></i>
              {pairingData[selectedDish].notes}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
