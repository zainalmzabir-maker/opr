// ====================================================================
// SISTEM PELAPORAN & DASHBOARD KOKURIKULUM SMK KAMARUL ARIFFIN
// Backend: Google Apps Script
// ====================================================================

// ID Folder Google Drive untuk simpanan imej aktiviti
const FOLDER_ID = "1HzUxltr6sTjDtwYd4TNJHfTmnGqL2hm2";

/**
 * Menghidangkan antaramuka web HTML kepada pengguna
 */
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle("Sistem Kokurikulum - SMK Kamarul Ariffin")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

/**
 * Menyimpan data laporan baharu dan memuat naik gambar ke Google Drive
 * @param {Object} data Objek maklumat laporan aktiviti dan imej base64
 * @return {Object} Status respon kejayaan atau ralat
 */
function hantarLaporan(data) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const folder = DriveApp.getFolderById(FOLDER_ID);
    
    // Bina baris tajuk (Header) jika helaian masih baharu/kosong
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Tarikh & Masa Hantar",
        "Nama Guru Pelapor",
        "Tajuk Aktiviti",
        "Tarikh Aktiviti",
        "Hari",
        "Penerangan Ringkas Aktiviti",
        "Dapatan & Impak Aktiviti",
        "Pautan Gambar 1",
        "Pautan Gambar 2",
        "Pautan Gambar 3",
        "Pautan Gambar 4"
      ]);
      sheet.getRange(1, 1, 1, 11)
        .setFontWeight("bold")
        .setBackground("#1e3a8a")
        .setFontColor("#ffffff");
    }

    // Proses muat naik fail gambar ke Google Drive (sehingga 4 keping)
    let pautanGambar = ["", "", "", ""];
    if (data.images && Array.isArray(data.images)) {
      data.images.slice(0, 4).forEach((imgObj, i) => {
        try {
          if (!imgObj || !imgObj.base64) return;
          
          const parts = imgObj.base64.split(',');
          const base64Data = parts.length > 1 ? parts[1] : parts[0];
          const decoded = Utilities.base64Decode(base64Data);
          
          const cleanTitle = (data.title || "Aktiviti").replace(/[^a-zA-Z0-9]/g, "_").substring(0, 25);
          const mimeType = imgObj.type || MimeType.JPEG;
          const ext = mimeType.includes("png") ? ".png" : ".jpg";
          const fileName = `SMKKA_${cleanTitle}_Foto${i + 1}_${Date.now()}${ext}`;
          
          const blob = Utilities.newBlob(decoded, mimeType, fileName);
          const file = folder.createFile(blob);
          file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
          pautanGambar[i] = file.getUrl();
        } catch (imgErr) {
          Logger.log("Ralat memproses gambar " + (i + 1) + ": " + imgErr.toString());
        }
      });
    }

    // Masukkan baris data ke Google Sheets
    sheet.appendRow([
      new Date(),
      data.reporter,
      data.title,
      data.date,
      data.day,
      data.desc,
      data.findings,
      pautanGambar[0],
      pautanGambar[1],
      pautanGambar[2],
      pautanGambar[3]
    ]);

    return { 
      status: "success", 
      message: "Laporan dan fail gambar berjaya dimuat naik ke Google Drive & Sheets!" 
    };
  } catch (err) {
    return { status: "error", message: err.toString() };
  }
}

/**
 * Mengambil keseluruhan rekod dari Google Sheets untuk Dashboard & Senarai Aktiviti
 * @return {Object} Objek senarai laporan aktiviti
 */
function dapatkanDataKokurikulum() {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const lastRow = sheet.getLastRow();
    
    if (lastRow <= 1) {
      return { status: "success", data: [] };
    }

    const rawData = sheet.getRange(2, 1, lastRow - 1, 11).getValues();
    
    const dataList = rawData.map((row, index) => {
      const images = [row[7], row[8], row[9], row[10]]
        .map(url => url ? url.toString().trim() : "")
        .filter(url => url !== "");

      let tarikhHantarStr = "";
      if (row[0] instanceof Date) {
        tarikhHantarStr = Utilities.formatDate(row[0], Session.getScriptTimeZone(), "dd/MM/yyyy HH:mm");
      } else {
        tarikhHantarStr = row[0] ? row[0].toString() : "";
      }

      return {
        id: index + 1,
        timestamp: tarikhHantarStr,
        reporter: row[1] ? row[1].toString() : "",
        title: row[2] ? row[2].toString() : "",
        date: row[3] ? row[3].toString() : "",
        day: row[4] ? row[4].toString() : "",
        desc: row[5] ? row[5].toString() : "",
        findings: row[6] ? row[6].toString() : "",
        images: images
      };
    });

    dataList.reverse(); // Susun dari rekod terbaharu
    return { status: "success", data: dataList };
  } catch (err) {
    return { status: "error", message: err.toString() };
  }
}
