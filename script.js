// Array Produk
const products = [
  { kode: "A001", nama: "Laptop", harga: 20000000, image: "asset/laptup.jpeg" },
  { kode: "A002", nama: "Mouse", harga: 200000, image: "asset/mus.png" },
  { kode: "A003", nama: "Keyboard", harga: 500000, image: "asset/kibot.jpg" }
];

const cart = [];

// Mengisi dropdown "Pilih Barang"
function populateProductDropdown() {
    const barangSelect = document.getElementById("pilihBarang");
    
    products.forEach(product => {
        let option = document.createElement("option");
        option.value = product.kode;
        option.textContent = product.nama;
        barangSelect.appendChild(option);
    });
}

// Event listener untuk mengisi data produk berdasarkan pilihan barang
document.getElementById("pilihBarang").addEventListener("change", function() {
    const selectedKode = this.value;
    const product = products.find(p => p.kode === selectedKode);

    if (product) {
        document.getElementById("kode").value = product.kode;
        document.getElementById("nama").value = product.nama;
        document.getElementById("harga").value = product.harga;
        document.getElementById("productImage").src = product.image;
        document.getElementById("productImage").style.display = "block"; // Tampilkan gambar
    } else {
        document.getElementById("kode").value = "";
        document.getElementById("nama").value = "";
        document.getElementById("harga").value = "";
        document.getElementById("productImage").style.display = "none"; // Sembunyikan gambar
    }
});

// Tambahkan produk ke tabel keranjang
document.getElementById("productForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const kode = document.getElementById("kode").value;
    const nama = document.getElementById("nama").value;
    const harga = parseFloat(document.getElementById("harga").value);
    const jumlah = parseInt(document.getElementById("jumlah").value);
    const diskon = parseFloat(document.getElementById("diskon").value);

    if (!kode || !jumlah || isNaN(jumlah) || jumlah <= 0 || isNaN(diskon) || diskon < 0 || diskon > 100) {
        alert("Pastikan data yang dimasukkan benar!");
        return;
    }

    const subtotal = harga * jumlah - (harga * jumlah * (diskon / 100));
    cart.push({ kode, nama, jumlah, harga, diskon, subtotal });

    updateTable();
    this.reset();
    document.getElementById("productImage").style.display = "none";
});

// Update tabel keranjang
function updateTable() {
    const tableBody = document.getElementById("productTable");
    tableBody.innerHTML = "";

    cart.forEach((item, index) => {
        let row = `<tr>
            <td>${item.kode}</td>
            <td>${item.nama}</td>
            <td>${item.jumlah}</td>
            <td>Rp${item.harga.toLocaleString()}</td>
            <td>${item.diskon}%</td>
            <td>Rp${item.subtotal.toLocaleString()}</td>

        </tr>`;
        tableBody.innerHTML += row;
    });
}

// Jalankan fungsi untuk mengisi dropdown saat halaman dimuat
document.addEventListener("DOMContentLoaded", populateProductDropdown);
