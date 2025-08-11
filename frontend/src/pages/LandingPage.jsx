import React from "react";
import { useNavigate } from "react-router-dom";
import logo from '../../logo.png';

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="landing-pattern w-full h-screen flex items-center justify-center" style={{background: '#fff'}}>
      <main className="text-center space-y-8 animate-fadeIn font-poppins">
        <img src={logo} alt="Logo" style={{width: '180px', margin: '0 auto'}} />
        <div style={{display: 'flex', justifyContent: 'center', gap: '1.5rem', margin: '1.5rem 0'}}>
          <label style={{display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '1rem', color: '#a32227'}}>
            <input type="checkbox" checked readOnly style={{accentColor: '#a32227', width: '18px', height: '18px'}} />
            Secure
          </label>
          <label style={{display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '1rem', color: '#a32227'}}>
            <input type="checkbox" checked readOnly style={{accentColor: '#a32227', width: '18px', height: '18px'}} />
            Fast
          </label>
          <label style={{display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '1rem', color: '#a32227'}}>
            <input type="checkbox" checked readOnly style={{accentColor: '#a32227', width: '18px', height: '18px'}} />
            Reliable
          </label>
        </div>
        <p style={{color: '#a32227'}} className="text-xl md:text-2xl font-semibold">Connect. Grow. Succeed.</p>
        <button
          onClick={() => navigate('/login')}
          style={{background: '#a32227', color: '#fff', fontWeight: 600, borderRadius: '9999px', padding: '1rem 2.5rem', fontSize: '1.25rem', boxShadow: '0 4px 24px rgba(163,34,39,0.08)'}}
          className="shadow-lg hover:opacity-90 transition transform hover:scale-105"
        >
          Login
        </button>
      </main>
    </div>
  );
}
