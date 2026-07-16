'use client';

import React from 'react';

export default function Hero() {
  return (
    <div style={{
      position: 'relative',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      background: '#070a13'
    }}>
      {/* 📹 LIVE CULINARY VIDEO BACKGROUND SYNC */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: 'translate(-50%, -50%)',
          zIndex: 1,
          opacity: 0.45 // आलीशान सिनेमाई डार्क लुक के लिए ओपेसिटी
        }}
      >
        <source src="/assets/videos/hero-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 🖤 LUXURY OVERLAY INJECTION */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to bottom, rgba(11,15,25,0.4) 0%, rgba(11,15,25,0.95) 100%)',
        zIndex: 2
      }}></div>

      {/* 👑 IMPERIAL BRAND TYPOGRAPHY LAYER */}
      <div style={{
        position: 'relative',
        zIndex: 3,
        textAlign: 'center',
        padding: '0 2rem',
        maxWidth: '1000px',
        boxSizing: 'border-box'
      }}>
        <span style={{
          color: '#F59E0B',
          fontSize: '0.9rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.4rem',
          display: 'block',
          marginBottom: '1rem',
          animation: 'fadeInDown 1s ease'
        }}>
          Welcome to Palatial Gastronomy
        </span>

        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '4.5rem',
          fontWeight: 700,
          color: '#FFFFFF',
          margin: '0 0 1.5rem 0',
          letterSpacing: '0.3rem',
          lineHeight: '1.2'
        }}>
          AURELIA
        </h1>

        <p style={{
          color: '#E5E7EB',
          fontSize: '1.1rem',
          maxWidth: '650px',
          margin: '0 auto 3rem auto',
          lineHeight: '1.8',
          fontWeight: 300,
          letterSpacing: '0.05rem'
        }}>
          Experience the pinnacle of 7-Star fine dining. Secured by RestaurantOS Network and synergized with real-time culinary dispatch cores.
        </p>

        {/* INTERACTIVE CALL TO ACTIONS */}
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
            style={{ background: '#F59E0B', color: '#111827', border: 'none', padding: '1rem 2.5rem', borderRadius: '5rem', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1rem', cursor: 'pointer', boxShadow: '0 4px 20px rgba(245,158,11,0.3)', transition: '0.3s' }}
          >
            Book Royal Table
          </button>
          <a
            href="/login"
            style={{ background: 'rgba(255,255,255,0.05)', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.15)', padding: '1rem 2.5rem', borderRadius: '5rem', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1rem', transition: '0.3s', textDecoration: 'none', display: 'inline-block' }}
          >
            Staff Terminal Login
          </a>
        </div>
      </div>
    </div>
  );
}
