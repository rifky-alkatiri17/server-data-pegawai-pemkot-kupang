const express = require("express");
const fs = require("fs");
const cors = require("cors");
const {loadEmployees, findEmployee, addEmployee} = require ("./utils/my-functions.js");

const app = express(); //instance
const PORT = 1996;

// agar express bisa membaca JSON body
app.use(express.json());
app.use(cors());

// simpan file json
const saveData = (data) => {
  fs.writeFileSync(
    "./data/pegawai.json",
    JSON.stringify(data, null, 2)
  );
};

// ======================
// Home Page
// ======================


// ======================
// Add Page
// ======================


// ======================
// Edit Page
// ======================




// ======================
// GET semua pegawai
// ======================
app.get("/pegawai", (req, res) => {
  const pegawai = loadEmployees();

  res.json({
    success: true,
    data: pegawai,
  });
});



// ======================
// GET pegawai by id
// ======================
app.get("/pegawai/:nama", (req, res) => {
  const pegawai = loadEmployees();

  const data = findEmployee(req.params.nama);
  res.json({
    success: true,
    data
  });
  
});

// ======================================================

// ======================
// POST tambah pegawai
// ======================
app.post("/pegawai", (req, res) => {
  const pegawai = getData();

  const newPegawai = {
    id: Date.now(),
    nip: req.body.nip,
    nama: req.body.nama,
    jabatan: req.body.jabatan,
  };

  pegawai.push(newPegawai);

  saveData(pegawai);

  res.status(201).json({
    success: true,
    message: "Data berhasil ditambah",
    data: newPegawai,
  });
});



// ======================
// PUT update pegawai
// ======================
app.put("/pegawai/:id", (req, res) => {
  const pegawai = getData();

  const index = pegawai.findIndex(
    (item) => item.id == req.params.id
  );

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Data tidak ditemukan",
    });
  }

  pegawai[index] = {
    ...pegawai[index],
    ...req.body,
  };

  saveData(pegawai);

  res.json({
    success: true,
    message: "Data berhasil diupdate",
    data: pegawai[index],
  });
});



// ======================
// DELETE pegawai
// ======================
app.delete("/pegawai/:id", (req, res) => {
  const pegawai = getData();

  const hasilFilter = pegawai.filter(
    (item) => item.id != req.params.id
  );

  saveData(hasilFilter);

  res.json({
    success: true,
    message: "Data berhasil dihapus",
  });
});



// jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});