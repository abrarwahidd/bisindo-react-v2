// src/pages/TentangBisindoPage.js
import React from "react";
import { Link } from "react-router-dom";
import "./ArticleDetailPage.css"; // Kita bisa gunakan style yang sama dengan detail artikel

function TentangBisindoPage() {
  return (
    <div className="article-detail-page">
      {/* Kita gunakan style yang mirip dengan detail artikel untuk konsistensi */}
      <div
        className="article-content-wrapper"
        style={{ maxWidth: "800px", paddingTop: "6rem" }}
      >
        <div className="article-body">
          <h2>Mengenal Bahasa Isyarat Indonesia (BISINDO)</h2>
          <p>
            BISINDO adalah bahasa isyarat yang tumbuh dan berkembang secara
            alami di kalangan komunitas Tuli di Indonesia. Berbeda dengan SIBI
            (Sistem Isyarat Bahasa Indonesia) yang merupakan isyarat buatan,
            BISINDO memiliki keragaman dialek dan ekspresi yang kaya,
            menjadikannya cerminan sejati dari budaya Tuli.
          </p>

          {/* --- Anda bisa menambahkan tulisan lebih detail di sini --- */}
          <h2>Bahasa yang Hidup dan Beragam</h2>
          <p>
            Setiap daerah di Indonesia, seperti Jakarta, Yogyakarta, dan
            Makassar, memiliki variasi atau "dialek" isyaratnya sendiri.
            Keberagaman ini dipengaruhi oleh interaksi sosial, budaya lokal, dan
            kebutuhan komunikasi sehari-hari. Ini membuktikan bahwa BISINDO
            adalah bahasa yang hidup, dinamis, dan terus berevolusi bersama
            komunitas penggunanya.
          </p>
          <h2>Perjuangan untuk Pengakuan</h2>
          <p>
            Selama bertahun-tahun, komunitas Tuli berjuang agar BISINDO diakui
            sebagai bahasa utama mereka dalam segala aspek kehidupan. Pengakuan
            ini penting tidak hanya untuk identitas budaya, tetapi juga untuk
            memastikan akses yang setara terhadap informasi, pendidikan, dan
            layanan publik. Berbagai organisasi dan aktivis terus mengadvokasi
            penggunaan BISINDO secara luas di ruang publik dan media.
          </p>
        </div>
        <Link to="/" className="back-link">
          &larr; Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}

export default TentangBisindoPage;
