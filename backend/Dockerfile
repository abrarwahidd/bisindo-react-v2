# backend/Dockerfile

# Gunakan image Python 3.11 yang ramping sebagai dasar
FROM python:3.11-slim

# Instal dependensi sistem yang diperlukan OpenCV SECARA EKSPLISIT
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Tentukan direktori kerja di dalam container
WORKDIR /app

# Salin file requirements terlebih dahulu untuk caching layer
COPY requirements.txt ./

# Instal dependensi Python
RUN pip install --no-cache-dir -r requirements.txt

# Salin seluruh kode aplikasi (termasuk folder models)
COPY . .

# Port yang akan digunakan oleh Uvicorn (Railway akan override dengan $PORT)
EXPOSE 8000 

# Perintah default untuk menjalankan aplikasi (Railway akan override dengan Start Command)
# CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"] 
# Kita bisa hapus CMD karena Railway akan menimpanya, tapi tidak masalah jika ada