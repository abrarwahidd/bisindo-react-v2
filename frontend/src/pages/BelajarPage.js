// src/pages/BelajarPage.js

import React, { useState, useRef, useEffect } from "react";
import "./BelajarPage.css";
import VideoDisplay from "../components/VIdeoDisplay";
import Controls from "../components/Controls";
import Tabs from "../components/Tabs";
import FreeDetectPane from "../components/FreeDetectPane";
import ExamPane from "../components/ExamPane";
import DictionaryPane from "../components/DictionaryPane";

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

  // ... (semua state dan ref lainnya biarkan sama) ...
  const videoRef = useRef(null);
  const socketRef = useRef(null);
  const streamRef = useRef(null);
  const intervalRef = useRef(null);
  const nextQuestionTimerRef = useRef(null);
  const latestState = useRef({});
  latestState.current = { activePane, currentInstructionChar, feedback };

  // ... (semua fungsi seperti startCamera, stopCamera, dll biarkan sama) ...
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
      if (latestState.current.activePane === "exam") {
        generateNewQuestion();
      }
      socketRef.current = new WebSocket("ws://localhost:8000/ws");
      socketRef.current.onopen = () => {
        console.log("WebSocket terhubung.");
        intervalRef.current = setInterval(sendFrame, 100);
      };
      socketRef.current.onmessage = (event) => {
        const receivedPrediction = event.data;
        const {
          activePane: currentPane,
          currentInstructionChar: instruction,
          feedback: currentFeedback,
        } = latestState.current;
        if (currentPane === "exam") {
          checkAnswer(receivedPrediction, instruction, currentFeedback);
        } else {
          setPrediction(receivedPrediction);
        }
      };
      socketRef.current.onclose = () => console.log("WebSocket terputus.");
      socketRef.current.onerror = (error) => {
        console.error("WebSocket error:", error);
        alert("Koneksi ke server gagal. Pastikan server backend berjalan.");
        stopCamera();
      };
    } catch (err) {
      console.error("Error mengakses kamera:", err);
      alert("Tidak dapat mengakses kamera. Pastikan Anda memberikan izin.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraOn(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (socketRef.current) socketRef.current.close();
    if (nextQuestionTimerRef.current)
      clearTimeout(nextQuestionTimerRef.current);
    setPrediction("-");
    resetExamState();
  };

  const sendFrame = () => {
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN)
      return;
    if (!videoRef.current || videoRef.current.paused || videoRef.current.ended)
      return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const context = canvas.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(
      (blob) => {
        if (blob) socketRef.current.send(blob);
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
    if (currentFeedback.className === "feedback-text correct") return;
    if (!currentInstruction || currentInstruction === "?") return;
    if (predictedChar === "Tidak Terdeteksi") return;

    if (predictedChar.toUpperCase() === currentInstruction.toUpperCase()) {
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
    if (pane === "dictionary" && isCameraOn) {
      stopCamera();
    }
    setActivePane(pane);
    if (pane === "exam" && isCameraOn) {
      generateNewQuestion();
    } else if (activePane === "exam" && pane !== "exam") {
      resetExamState();
    }
  };

  useEffect(() => {
    return () => {
      if (socketRef.current) socketRef.current.close();
      if (streamRef.current)
        streamRef.current.getTracks().forEach((track) => track.stop());
      if (nextQuestionTimerRef.current)
        clearTimeout(nextQuestionTimerRef.current);
    };
  }, []);

  return (
    // Class dinamis ini akan mengontrol semua animasi
    <div
      className={`belajar-workspace ${
        activePane === "dictionary" ? "dictionary-mode" : ""
      }`}
    >
      {/* Kolom Kiri: Tampilan Video (SEKARANG SELALU ADA) */}
      <div className="video-panel">
        <VideoDisplay ref={videoRef} />
      </div>

      {/* Kolom Kanan: Panel Kontrol & Informasi */}
      <div className="control-panel">
        {/* Header dan Kontrol Kamera (SEKARANG DIKONTROL OLEH CSS) */}
        <div className="control-panel-main-content">
          <div className="control-panel-header">
            <h2>Ruang Belajar Abjad Interaktif</h2>
            <p>
              Nyalakan kamera dan pilih mode untuk memulai sesi belajar Anda.
            </p>
          </div>
          <Controls
            onStart={startCamera}
            onStop={stopCamera}
            isCameraOn={isCameraOn}
          />
        </div>

        <Tabs activePane={activePane} onTabSwitch={handleTabSwitch} />

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
          {activePane === "dictionary" && <DictionaryPane />}
        </div>
      </div>
    </div>
  );
}

export default BelajarPage;
