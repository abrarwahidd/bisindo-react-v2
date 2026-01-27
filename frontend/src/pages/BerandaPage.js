// src/pages/BerandaPage.js
import React from "react";
import { Link } from "react-router-dom";
import "./BerandaPage.css";
// Menggunakan ilustrasi yang sudah ada
import heroIllustration from "../assets/images/fiksbangett.png";

function BerandaPage() {
  return (
    <div className="beranda-wrapper dewantara-theme">
      
      {/* ===== HERO SECTION ===== */}
      <section className="hero-section">
        {/* Dekorasi Latar Belakang (Pink Blobs) */}
        <div className="hero-shape shape-pink-1"></div>
        <div className="hero-shape shape-pink-2"></div>
        <div className="hero-shape shape-dots"></div>

        <div className="beranda-container">
          <div className="hero-content">
            <h4 className="brand-subtitle animate-fade-in-up">DEWANTARA</h4>
            <h1 className="hero-title animate-fade-in-up delay-1">
              Deteksi Wajah dan Tangan Alfabet Real-Time untuk Anak Tunarungu
            </h1>
            <p className="hero-desc animate-fade-in-up delay-2">
              Mendukung pendidikan inklusif di wilayah jauh dari SLB. 
              Solusi berbasis AI untuk literasi mandiri dan komunikasi tanpa hambatan.
            </p>
            <div className="animate-fade-in-up delay-3">
              <Link to="/belajar" className="primary-button">
                Mulai Deteksi &rarr;
              </Link>
            </div>
          </div>

          <div className="hero-image animate-scale-in">
            <img
              src={heroIllustration}
              alt="Ilustrasi Dewantara Belajar Bahasa Isyarat"
            />
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION (Menggantikan Info Section Lama) ===== */}
      <section className="features-section">
        <div className="beranda-container">
          <div className="section-header">
            <h2 className="section-title">Mengapa DEWANTARA?</h2>
            <p className="section-subtitle">Teknologi AI untuk Pendidikan Inklusif Berkualitas</p>
          </div>

          <div className="features-grid">
            {/* Kartu 1: Pendidikan Inklusif */}
            <div className="feature-card animate-fade-in-up">
              <div className="icon-circle">
                {/* Ikon User/Group SVG */}
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
              <h3>Pendidikan Inklusif</h3>
              <p>Menjangkau anak tunarungu di wilayah terpencil yang jauh dari SLB. Akses literasi untuk semua.</p>
            </div>

            {/* Kartu 2: Teknologi AI */}
            <div className="feature-card animate-fade-in-up delay-1">
              <div className="icon-circle">
                {/* Ikon Camera/AI SVG */}
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
              </div>
              <h3>Teknologi AI Real-Time</h3>
              <p>Deteksi alfabet bahasa isyarat secara otomatis dengan MediaPipe dan Random Forest. Feedback instan.</p>
            </div>

            {/* Kartu 3: Akses Gratis */}
            <div className="feature-card animate-fade-in-up delay-2">
              <div className="icon-circle">
                {/* Ikon Clock/Access SVG */}
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              </div>
              <h3>Akses Gratis & Mandiri</h3>
              <p>Tanpa biaya, mudah digunakan, dan dapat diakses kapan saja. Memberdayakan pembelajaran mandiri.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SDG BANNER SECTION (Menggantikan Quote Section Lama) ===== */}
      <section className="sdg-section">
        <div className="beranda-container">
          <h2 className="sdg-title">Mendukung SDG 4 & 10</h2>
          <p className="sdg-desc">
            DEWANTARA berkontribusi pada <strong>Sustainable Development Goals</strong> untuk Pendidikan Berkualitas (SDG 4) 
            dan Pengurangan Ketimpangan (SDG 10). Kami percaya setiap anak berhak mendapat akses pendidikan yang setara.
          </p>

          <div className="stats-grid">
            <div className="stat-item">
              <h3>100%</h3>
              <p>Gratis untuk Semua</p>
            </div>
            <div className="stat-item">
              <h3>Real-Time</h3>
              <p>Deteksi Instan</p>
            </div>
            <div className="stat-item">
              <h3>Inklusif</h3>
              <p>Jangkauan Luas</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA BOTTOM SECTION (Baru, sesuai gambar) ===== */}
      <section className="cta-section">
        <div className="beranda-container">
          <h2>Siap Memulai Perjalanan Belajar?</h2>
          <p>Bergabunglah dengan gerakan pendidikan inklusif untuk masa depan yang lebih baik.</p>
          <Link to="/belajar" className="primary-button">
            Mulai Deteksi Sekarang &rarr;
          </Link>
        </div>
      </section>

    </div>
  );
}

export default BerandaPage;