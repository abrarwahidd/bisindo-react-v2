// src/data/dictionaryData.js

export const alphabetData = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  .split("")
  .map((char) => ({
    id: char,
    char: char,
    imageUrl: `/images/${char}.jpg`,
  }));

export const numberData = [
  { id: "0", char: "0", imageUrl: "/images/numbers/angka.jpg" },
  { id: "1", char: "1", imageUrl: "/images/numbers/angka.jpg" },
  { id: "2", char: "2", imageUrl: "/images/numbers/angka.jpg" },
  { id: "3", char: "3", imageUrl: "/images/numbers/angka.jpg" },
  { id: "4", char: "4", imageUrl: "/images/numbers/angka.jpg" },
  { id: "5", char: "5", imageUrl: "/images/numbers/angka.jpg" },
  { id: "6", char: "6", imageUrl: "/images/numbers/angka.jpg" },
  { id: "7", char: "7", imageUrl: "/images/numbers/angka.jpg" },
  { id: "8", char: "8", imageUrl: "/images/numbers/angka.jpg" },
  { id: "9", char: "9", imageUrl: "/images/numbers/angka.jpg" },
  // Tambahkan angka lain jika ada
];

export const vocabularyData = [
  {
    id: 1,
    term: "Terima Kasih",
    videoUrl: "/videos/vocabulary/terima-kasih.mp4",
  },
  {
    id: 2,
    term: "Selamat Pagi",
    videoUrl: "/videos/vocabulary/selamat-pagi.mp4",
  },
  {
    id: 3,
    term: "Siapa Nama Kamu?",
    videoUrl: "/videos/vocabulary/siapa-nama-kamu.mp4",
  },
  { id: 4, term: "Maaf", videoUrl: "/videos/vocabulary/maaf.mp4" },
  { id: 5, term: "Tolong", videoUrl: "/videos/vocabulary/tolong.mp4" },
  { id: 6, term: "Ya", videoUrl: "/videos/vocabulary/ya.mp4" },
  // Tambahkan kosakata lain di sini
];
