document
  .getElementById("discountForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    let barang = document.getElementById("barang").value.trim();
    let harga = parseFloat(document.getElementById("harga").value);
    let diskon = parseFloat(document.getElementById("diskon").value);

    // **Validasi Input**
    if (barang === "") {
      alert("Nama barang tidak boleh kosong!");
      return;
    }
    if (isNaN(harga) || harga <= 0) {
      alert("Harga harus angka positif!");
      return;
    }
    if (isNaN(diskon) || diskon < 0 || diskon > 100) {
      alert("Diskon harus antara 0% - 100%!");
      return;
    }

    // **Hitung Nilai Diskon**
    let nilaiDiskon = (harga * diskon) / 100;
    let totalHarga = harga - nilaiDiskon;

    // **Tampilkan Hasil**
    document.getElementById("barangName").innerHTML = `<b>Barang:</b> ${barang}`;
    document.getElementById("hargaAwal").innerHTML = `<b>Harga Awal:</b> Rp${harga.toLocaleString("id-ID")}`;
    document.getElementById("nilaiDiskon").innerHTML = `<b>Potongan Harga:</b> Rp${nilaiDiskon.toLocaleString("id-ID")}`;
    document.getElementById("totalHarga").innerHTML = `<b>Total Harga Setelah Diskon:</b> Rp${totalHarga.toLocaleString("id-ID")}`;

    document.getElementById("result").classList.remove("hidden");

    // **Simpan ke LocalStorage**
    let transaksi = JSON.parse(localStorage.getItem("transaksi")) || [];

    transaksi.push({
      barang: barang,
      harga: harga,
      diskon: diskon,
      total: totalHarga,
    });

    localStorage.setItem("transaksi", JSON.stringify(transaksi));

    console.log("Barang:", barang);
    console.log("Harga:", harga);
    console.log("Diskon:", diskon);
    console.log("Total Harga:", totalHarga);
  });
