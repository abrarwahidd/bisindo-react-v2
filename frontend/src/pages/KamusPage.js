// src/pages/KamusPage.js
import React, { useState } from "react";
import {
  alphabetData,
  numberData,
  vocabularyData,
} from "../data/dictionaryData";
import "./KamusPage.css"; // Kita akan buat file CSS ini

// Komponen untuk item di grid (bisa gambar atau video)
const KamusItem = ({ item }) => {
  return (
    <div className="kamus-item">
      <div className="item-media">
        {item.imageUrl && (
          <img src={item.imageUrl} alt={item.char || item.term} />
        )}
        {item.videoUrl && (
          <video key={item.videoUrl} autoPlay loop muted playsInline>
            <source src={item.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
      <p className="item-label">{item.char || item.term}</p>
    </div>
  );
};

function KamusPage() {
  const [activeTab, setActiveTab] = useState("abjad");

  const renderContent = () => {
    switch (activeTab) {
      case "angka":
        return numberData.map((item) => (
          <KamusItem key={item.id} item={item} />
        ));
      case "kosakata":
        return vocabularyData.map((item) => (
          <KamusItem key={item.id} item={item} />
        ));
      case "abjad":
      default:
        return alphabetData.map((item) => (
          <KamusItem key={item.id} item={item} />
        ));
    }
  };

  return (
    <div className="kamus-page">
      <div className="kamus-header">
        <h1>Kamus BISINDO</h1>
        <p>
          Referensi visual untuk abjad, angka, dan kosakata sehari-hari dalam
          Bahasa Isyarat Indonesia.
        </p>
      </div>

      <div className="kamus-tabs">
        <button
          className={`kamus-tab-button ${
            activeTab === "abjad" ? "active" : ""
          }`}
          onClick={() => setActiveTab("abjad")}
        >
          Abjad
        </button>
        <button
          className={`kamus-tab-button ${
            activeTab === "angka" ? "active" : ""
          }`}
          onClick={() => setActiveTab("angka")}
        >
          Angka
        </button>
        <button
          className={`kamus-tab-button ${
            activeTab === "kosakata" ? "active" : ""
          }`}
          onClick={() => setActiveTab("kosakata")}
        >
          Kosakata
        </button>
      </div>

      <div className="kamus-grid">{renderContent()}</div>
    </div>
  );
}

export default KamusPage;
