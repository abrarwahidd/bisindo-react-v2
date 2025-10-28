// src/pages/BelajarPage.js
import React, { useState, useRef, useEffect, useCallback } from "react";
import useWindowSize from "../hooks/useWindowSize"; // Pastikan path ini benar
import "./BelajarPage.css"; // Pastikan CSS halaman belajar diimpor
import VideoDisplay from "../components/VIdeoDisplay"; // Periksa nama file VideoDisplay.js
import Controls from "../components/Controls";
import Tabs from "../components/Tabs";
import FreeDetectPane from "../components/FreeDetectPane";
import ExamPane from "../components/ExamPane";
import DictionaryPane from "../components/DictionaryPane";
import InstructionModal from "../components/InstructionModal"; // Impor modal

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function BelajarPage() {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [prediction, setPrediction] = useState("-");
  const [activePane, setActivePane] = useState("free-detect");
  const [currentInstructionChar, setCurrentInstructionChar] = useState("?");
  const [feedback, setFeedback] = useState({
    message: "Menunggu jawaban...",
    className: "feedback-text",
  });
  const [showInstructions, setShowInstructions] = useState(false); // State untuk modal

  const videoRef = useRef(null);
  const socketRef = useRef(null);
  const streamRef = useRef(null);
  const intervalRef = useRef(null);
  const nextQuestionTimerRef = useRef(null);
  const latestState = useRef({});
  latestState.current = { activePane, currentInstructionChar, feedback }; // Simpan state terbaru di ref

  const { width } = useWindowSize();
  const isMobile = width <= 768;

  // --- Fungsi-fungsi ---
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraOn(true);
      // Panggil generateNewQuestion hanya jika memang di mode ujian
      if (latestState.current.activePane === "exam") {
        generateNewQuestion();
      }
      socketRef.current = new WebSocket("ws://localhost:8000/ws"); // Ganti URL jika perlu
      socketRef.current.onopen = () => {
        console.log("WebSocket terhubung.");
        // Pastikan interval tidak dibuat ulang jika sudah ada
        if (!intervalRef.current) {
          intervalRef.current = setInterval(sendFrame, 100);
        }
      };
      socketRef.current.onmessage = (event) => {
        const receivedPrediction = event.data;
        // Gunakan state terbaru dari ref di dalam callback
        const {
          activePane: currentPane,
          currentInstructionChar: instruction,
          feedback: currentFeedback,
        } = latestState.current;
        if (currentPane === "exam") {
          checkAnswer(receivedPrediction, instruction, currentFeedback);
        } else {
          setPrediction(receivedPrediction); // Update state prediksi
        }
      };
      socketRef.current.onclose = () => {
        console.log("WebSocket terputus.");
        // Hentikan interval saat koneksi ditutup
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };
      socketRef.current.onerror = (error) => {
        console.error("WebSocket error:", error);
        alert("Koneksi ke server gagal. Pastikan server backend berjalan.");
        stopCamera(); // Hentikan kamera jika ada error koneksi
      };
    } catch (err) {
      console.error("Error mengakses kamera:", err);
      alert("Tidak dapat mengakses kamera. Pastikan Anda memberikan izin.");
    }
  };

  const stopCamera = useCallback(() => {
    // <-- Bungkus dengan useCallback
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraOn(false); // Pastikan setIsCameraOn ada di dalam jika perlu
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
    }
    if (nextQuestionTimerRef.current) {
      clearTimeout(nextQuestionTimerRef.current);
      nextQuestionTimerRef.current = null;
    }
    setPrediction("-"); // Pastikan setPrediction ada di dalam jika perlu
    resetExamState(); // Pastikan resetExamState ada di dalam jika perlu
  }, []); // <-- Tambahkan dependency array kosong

  const sendFrame = () => {
    // Pastikan semua referensi valid sebelum mengirim frame
    if (
      !socketRef.current ||
      socketRef.current.readyState !== WebSocket.OPEN ||
      !videoRef.current ||
      videoRef.current.paused ||
      videoRef.current.ended ||
      videoRef.current.readyState < 3
    ) {
      return;
    }
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const context = canvas.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(
      (blob) => {
        // Periksa lagi koneksi sebelum mengirim
        if (
          blob &&
          socketRef.current &&
          socketRef.current.readyState === WebSocket.OPEN
        ) {
          socketRef.current.send(blob);
        }
      },
      "image/jpeg",
      0.8
    );
  };

  const generateNewQuestion = () => {
    if (nextQuestionTimerRef.current)
      clearTimeout(nextQuestionTimerRef.current);
    const randomIndex = Math.floor(Math.random() * ALPHABET.length);
    const newChar = ALPHABET[randomIndex];
    setCurrentInstructionChar(newChar);
    setFeedback({ message: "Menunggu jawaban...", className: "feedback-text" });
  };

  const checkAnswer = (predictedChar, currentInstruction, currentFeedback) => {
    // Gunakan state langsung jika memungkinkan, fallback ke ref jika perlu
    const instruction =
      currentInstruction || latestState.current.currentInstructionChar;
    const feedbackState = currentFeedback || latestState.current.feedback;

    if (feedbackState.className === "feedback-text correct") return;
    if (!instruction || instruction === "?") return;
    if (predictedChar === "Tidak Terdeteksi") return;

    if (predictedChar.toUpperCase() === instruction.toUpperCase()) {
      setFeedback({ message: "Benar!", className: "feedback-text correct" });
      nextQuestionTimerRef.current = setTimeout(() => {
        generateNewQuestion();
      }, 1500);
    } else {
      setFeedback({
        message: "Salah, coba lagi.",
        className: "feedback-text incorrect",
      });
    }
  };

  const resetExamState = () => {
    setCurrentInstructionChar("?");
    setFeedback({ message: "Menunggu jawaban...", className: "feedback-text" });
  };

  const handleTabSwitch = (pane) => {
    // Hanya stop kamera di desktop saat pindah ke kamus
    if (pane === "dictionary" && isCameraOn && !isMobile) {
      stopCamera();
    }
    setActivePane(pane);
    // Jika beralih ke mode ujian saat kamera sudah nyala
    if (pane === "exam" && isCameraOn) {
      generateNewQuestion();
    } else if (activePane === "exam" && pane !== "exam") {
      // Reset jika beralih DARI mode ujian
      resetExamState();
    }
  };

  // --- Hooks ---
  useEffect(() => {
    // Cleanup effect utama saat komponen dilepas
    return () => {
      stopCamera(); // Pastikan kamera dan koneksi berhenti saat pindah halaman
    };
  }, [stopCamera]); // Hanya dijalankan sekali saat mount dan unmount

  // Hook untuk menampilkan instruksi di mobile saat pertama kali buka
  useEffect(() => {
    if (isMobile) {
      setShowInstructions(true);
      // Hapus penyimpanan ke sessionStorage
      // sessionStorage.setItem('hasSeenLearnInstructions', 'true');
    } else {
      // Opsional: Pastikan modal tidak muncul jika beralih dari mobile ke desktop
      setShowInstructions(false);
    }
  }, [isMobile]);

  // Fungsi untuk menutup modal
  const handleCloseInstructions = () => {
    setShowInstructions(false);
  };

  // --- Render ---

  // Tampilan khusus MOBILE
  if (isMobile) {
    return (
      <div
        className={`belajar-mobile-wrapper ${
          activePane === "dictionary" ? "dictionary-mode" : ""
        }`}
      >
        {showInstructions && (
          <InstructionModal onClose={handleCloseInstructions} />
        )}

        {activePane !== "dictionary" ? (
          <>
            {/* 1. Kontainer untuk Tabs (paling atas) */}
            <div className="mobile-tabs-container">
              <Tabs activePane={activePane} onTabSwitch={handleTabSwitch} />
            </div>

            {/* 2. Kontainer untuk Tombol Kamera */}
            <div className="mobile-controls-container">
              <Controls
                onStart={startCamera}
                onStop={stopCamera}
                isCameraOn={isCameraOn}
              />
            </div>

            {/* 3. Area Tampilan Utama (Video + Hasil) */}
            <div className="mobile-display-unit">
              <div className="video-panel-mobile">
                <VideoDisplay ref={videoRef} />
              </div>
              <div className="info-pane-mobile">
                {activePane === "free-detect" && (
                  <FreeDetectPane prediction={prediction} />
                )}
                {activePane === "exam" && (
                  <ExamPane
                    instructionChar={currentInstructionChar}
                    feedback={feedback}
                  />
                )}
              </div>
            </div>
          </>
        ) : (
          // Tampilan Kamus
          <div className="dictionary-pane-mobile">
            <Tabs activePane={activePane} onTabSwitch={handleTabSwitch} />
            <DictionaryPane />
          </div>
        )}
      </div>
    );
  }

  // Tampilan khusus DESKTOP (Struktur Asli)
  return (
    <div
      className={`belajar-workspace ${
        activePane === "dictionary" ? "dictionary-mode" : ""
      }`}
    >
      <div className="video-panel">
        <VideoDisplay ref={videoRef} />
      </div>
      <div className="control-panel">
        <div className="control-panel-header">
          <h2>Ruang Belajar Abjad Interaktif</h2>
          <p>Nyalakan kamera dan pilih mode untuk memulai sesi belajar Anda.</p>
        </div>
        <Controls
          onStart={startCamera}
          onStop={stopCamera}
          isCameraOn={isCameraOn}
        />
        <Tabs activePane={activePane} onTabSwitch={handleTabSwitch} />
        {/* Konten kamus di desktop */}
        {activePane === "dictionary" && (
          <div className="dictionary-pane-desktop-wrapper">
            <DictionaryPane />
          </div>
        )}
      </div>
      {/* Panel Hasil hanya ditampilkan jika bukan mode kamus */}
      {activePane !== "dictionary" && (
        <div className="info-pane">
          {activePane === "free-detect" && (
            <FreeDetectPane prediction={prediction} />
          )}
          {activePane === "exam" && (
            <ExamPane
              instructionChar={currentInstructionChar}
              feedback={feedback}
              onNextQuestion={generateNewQuestion}
              isCameraOn={isCameraOn}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default BelajarPage;
