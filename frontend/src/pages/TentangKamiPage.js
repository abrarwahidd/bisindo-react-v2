// src/pages/TentangKamiPage.js
import React from "react";
import "./TentangKamiPage.css";
// Anda bisa menyiapkan foto profil di sini, contoh:
import profilePic from "../assets/images/logoo2.png";
import logoReact from "../assets/images/logo-react2.png";
import logoPython from "../assets/images/logo-python.png";
import logoMl from "../assets/images/logo-ml.png";

function TentangKamiPage() {
  return (
    <div className="tentang-kami-page">
      {/* Bagian Header */}
      <section className="tentang-header">
        <h1>Menghubungkan Dunia, Satu Isyarat demi Satu Isyarat</h1>
        <p>
          SignVision lahir dari keyakinan bahwa teknologi dapat menjadi jembatan
          untuk komunikasi yang lebih inklusif.
        </p>
      </section>

      {/* Bagian Visi & Misi */}
      <section className="visi-misi-section">
        <div className="visi-misi-container">
          <div className="visi-misi-item">
            <div className="item-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </div>
            <h3>Visi Kami</h3>
            <p>
              Menciptakan sebuah dunia di mana setiap individu, baik Tuli maupun
              dengar, dapat berkomunikasi dengan lancar tanpa hambatan,
              membangun pemahaman dan empati melalui kekuatan bahasa isyarat.
            </p>
          </div>
          <div className="visi-misi-item">
            <div className="item-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 11 12 14 22 4"></polyline>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
              </svg>
            </div>
            <h3>Misi Kami</h3>
            <ul>
              <li>
                Menyediakan platform belajar Abjad BISINDO yang gratis dan mudah
                diakses.
              </li>
              <li>
                Menggunakan AI untuk memberikan umpan balik secara real-time.
              </li>
              <li>
                Meningkatkan kesadaran terhadap Bahasa Isyarat Indonesia dan
                Budaya Tuli.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Bagian Teknologi */}
      <section className="teknologi-section">
        <div className="teknologi-container">
          <h2>Teknologi di Balik Layar</h2>
          <p className="teknologi-subtitle">
            Dibangun dengan alat-alat modern untuk performa dan pengalaman
            terbaik.
          </p>
          <div className="teknologi-grid">
            {/* --- KARTU REACT --- */}
            <div className="teknologi-card">
              <div className="teknologi-icon">
                {/* Ganti SVG dengan IMG */}
                <img src={logoReact} alt="React Logo" />
              </div>
              <h4>Frontend: React.js</h4>
            </div>

            {/* --- KARTU PYTHON --- */}
            <div className="teknologi-card">
              <div className="teknologi-icon">
                {/* Ganti SVG dengan IMG */}
                <img src={logoPython} alt="Python Logo" />
              </div>
              <h4>Backend: Python & FastAPI</h4>
            </div>

            {/* --- KARTU MACHINE LEARNING --- */}
            <div className="teknologi-card">
              <div className="teknologi-icon">
                {/* Ganti SVG dengan IMG */}
                <img src={logoMl} alt="Machine Learning Logo" />
              </div>
              <h4>ML: MediaPipe & Scikit-learn</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Bagian Pengembang */}
      <section className="pengembang-section">
        <div className="pengembang-container">
          <div className="profil-picture">
            {/* Ganti dengan tag <img> jika Anda punya foto */}
            <img src={profilePic} alt="[Nama Anda]" />
          </div>
          <div className="profil-info">
            <h2>Developer</h2>
            <h3>Abrar Wahid</h3>
            <h4>Mahasiswa Informatika | ML engineer / Web Developer</h4>
            <p className="profil-bio">
              seorang mahasiswa informatika yang memiliki ketertarikan besar di
              bidang teknologi, khususnya machine learning, web development, dan
              artificial intelligence (AI)
            </p>
            <div className="profil-links">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/abrarwahidd"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TentangKamiPage;
