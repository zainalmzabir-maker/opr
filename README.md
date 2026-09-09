# Sistem Pelaporan & Dashboard Kokurikulum SMK Kamarul Ariffin

Web App moden berasaskan **Google Apps Script**, **Google Sheets**, dan **Google Drive** untuk pelaporan aktiviti kokurikulum mingguan, analisis data analitik secara visual, penyimpanan imej automatik, dan cetakan laporan rasmi berformat PDF.

---

## 🌟 Ciri-ciri Utama

1. **Borang Pelaporan Digital**:
   - Nama Guru Pelapor, Tajuk Aktiviti, Tarikh Aktiviti, Hari (Auto-Kira).
   - Penerangan Ringkas dan Dapatan / Impak Aktiviti.
   - **Muat Naik Sehingga 4 Keping Gambar**:
     - Dilengkapi **Auto-Compression berasaskan HTML5 Canvas** (mengecilkan imej kamera telefon secara automatik sebelum dihantar bagi mengelakkan ralat had kuota saiz muatan).
2. **Dashboard Rumusan & Analisis Masa Nyata**:
   - **Kad Metrik Pantas (KPI)**: Jumlah Aktiviti, Bilangan Guru Terlibat, Jumlah Foto di Drive, dan Aktiviti Terkini.
   - **Carta Kekerapan Aktiviti Mengikut Hari** (Chart.js Bar Chart).
   - **Carta Pecahan Laporan Mengikut Guru** (Chart.js Doughnut Chart).
   - **Jadual Statistik & Ranking Penglibatan Guru Penasihat**.
3. **Senarai Rekod & Carian Pintar**:
   - Penapisan langsung (*live search*) mengikut tajuk aktiviti atau nama guru.
4. **Pratonton & Cetakan PDF Rasmi**:
   - Kepala surat (*letterhead*) rasmi sekolah lengkap dengan **Logo Sekolah SMK Kamarul Ariffin**.
   - Galeri foto terperinci dan ruang tandatangan Guru Penasihat serta Penolong Kanan Kokurikulum.
   - Sedia untuk butang *Print / Save as PDF*.
5. **Integrasi Google Sites**:
   - Sedia untuk disemat (*embed*) tanpa sempadan (*borderless*) ke dalam portal Google Sites sekolah.

---

## 📂 Struktur Fail Repositori

```
smkka-kokurikulum-webapp/
│
├── Code.gs             # Backend Google Apps Script (DriveApp & SpreadsheetApp API)
├── index.html          # Antaramuka Pengguna (Tailwind CSS, Chart.js & Client Scripts)
├── appsscript.json     # Manifest konfigurasi Google Apps Script (Zon Waktu KL & Akses)
├── iframe_embed.html   # Kod HTML iFrame untuk sematan lancar ke Google Sites
├── LICENSE             # Lesen Open Source MIT
└── README.md           # Panduan lengkap dokumentasi & penggunaan
```

---

## 🚀 Panduan Pemasangan (Setup)

### Langkah 1: Sediakan Google Drive & Google Sheets
1. Buka [Google Drive](https://drive.google.com).
2. Cipta folder baharu khas untuk menyimpan imej aktiviti. 
3. Buka folder tersebut dan salin **Folder ID** daripada URL pelayar:
   ```
   https://drive.google.com/drive/folders/[ID_FOLDER_ANDA]
   ```
   *(Contoh ID Folder lalai sekolah: `1HzUxltr6sTjDtwYd4TNJHfTmnGqL2hm2`)*
4. Cipta satu fail **Google Sheets** baharu (namakan `Rekod Kokurikulum SMK Kamarul Ariffin`).

### Langkah 2: Masukkan Kod ke Google Apps Script
1. Di dalam Google Sheets tadi, klik menu **Extensions (Sambungan)** > **Apps Script**.
2. Buka fail `Code.gs`, padam semua kod asal dan salin kandungan daripada fail `Code.gs` repositori ini.
   - Pastikan pembolehubah `FOLDER_ID` di baris pertama sepadan dengan ID folder Google Drive anda.
3. Klik ikon **+** di sebelah *Files* > Pilih **HTML** > Namakan fail sebagai `index` (ia akan membentuk fail `index.html`).
4. Salin semua kod daripada fail `index.html` repositori ini ke dalamnya.
5. Tekan `Ctrl + S` untuk menyimpan projek.

### Langkah 3: Terbitkan sebagai Web App
1. Klik butang biru **Deploy (Laksana)** di penjuru atas kanan > Pilih **New deployment**.
2. Klik ikon gear > Pilih jenis **Web app**.
3. Konfigurasi tetapan berikut:
   - **Description**: `Versi Rasmi Kokurikulum SMKKA`
   - **Execute as**: `Me (emel anda)`
   - **Who has access**: `Anyone (Sesiapa sahaja)`
4. Klik **Deploy** dan berikan kebenaran (*Authorize access*) menggunakan akaun Google anda.
5. Salin URL Web App yang terhasil (berakhiran `/exec`).

### Langkah 4: Semat ke dalam Google Sites
1. Buka laman **Google Sites** sekolah anda dalam mod suntingan.
2. Di panel kanan, klik **Insert (Sisip)** > **Embed (Sematkan)** > tab **Embed code**.
3. Buka fail `iframe_embed.html`, gantikan `MASUKKAN_URL_WEB_APP_ANDA_DI_SINI` dengan URL Web App anda.
4. Tampalkan kod ke dalam Google Sites dan klik **Insert**.
5. Laraskan saiz kotak dan klik **Publish (Terbitkan)**.

---

## 🛡️ Lesen
Projek ini dilesenkan di bawah [Lesen MIT](LICENSE). Bebas digunakan dan disesuaikan mengikut keperluan sekolah-sekolah lain di Malaysia.
