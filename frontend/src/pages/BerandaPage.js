// src/pages/BerandaPage.js
import React from "react";
import { Link } from "react-router-dom";
import "./BerandaPage.css";
// Pastikan path ke ilustrasi Anda sudah benar
import heroIllustration from "../assets/images/fiksbangett.png";
import artikelImage from "../assets/images/artikel-image.jpg";

function BerandaPage() {
  return (
    <div className="beranda-wrapper new-design">
      <section className="hero-section">
        {/* Elemen Dekoratif SVG (BARU) */}
        <div className="hero-bg-shape hero-bg-shape-1"></div>
        <div className="hero-bg-shape hero-bg-shape-2"></div>
        <div className="hero-bg-shape hero-bg-shape-3"></div>

        <div className="beranda-container">
          <div className="hero-content">
            <h1 className="animate-fade-in-up">
              Pelajari Bahasa Isyarat Lebih Menyenangkan
            </h1>
            <p className="animate-fade-in-up delay-1">
              Platform edukasi interaktif untuk menguasai Abjad Bahasa Isyarat
              Indonesia (BISINDO) dengan mudah dan percaya diri.
            </p>
            <div className="animate-fade-in-up delay-2">
              <Link to="/belajar" className="hero-button">
                Mulai Belajar &rarr;
              </Link>
            </div>
          </div>

          {/* GAMBAR SEKARANG DIPINDAHKAN KE LUAR .hero-content */}
          <div className="hero-image animate-scale-in">
            <img
              src={heroIllustration}
              alt="Orang-orang berkomunikasi dengan bahasa isyarat"
            />
          </div>
        </div>
      </section>

      {/* Bagian lain dari halaman beranda (artikel, quote) bisa tetap di sini */}
      {/* Artikel Singkat Section */}
      <section className="info-section">
        <div className="beranda-container">
          {/* Judul sekarang menjadi elemen terpisah */}
          <h2 className="info-title animate-fade-in-up">
            Mengenal Bahasa Isyarat Indonesia (BISINDO)
          </h2>

          <div className="info-image animate-scale-in">
            <img src={artikelImage} alt="Mengenal BISINDO" />
          </div>

          <div className="info-content animate-fade-in-up delay-1">
            {/* Hanya berisi paragraf */}
            <p>
              Bahasa Isyarat Indonesia (BISINDO) adalah bahasa visual yang
              digunakan oleh teman-teman Tuli di Indonesia untuk berkomunikasi.
              Berbeda dengan bahasa lisan yang mengandalkan suara, BISINDO
              menggunakan gerakan tangan, ekspresi wajah, dan posisi tubuh
              sebagai media utama penyampaian makna. Melalui kombinasi gerakan
              tersebut, pengguna BISINDO dapat mengekspresikan kata, kalimat,
              dan emosi dengan cara yang unik dan penuh makna.
            </p>
            <Link to="/tentang-bisindo" className="read-more-link">
              Baca Selengkapnya &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Blockquote Section */}
      <section className="quote-section">
        <div className="beranda-container">
          <p>
            "Dengan memahami bahasa isyarat, kita membuka jendela untuk
            berdialog tanpa batas suara."
          </p>
          <span className="quote-author">- A</span>
        </div>
      </section>
    </div>
  );
}

export default BerandaPage;
