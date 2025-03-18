// Array Produk yang Sudah Didefinisikan
const predefinedProducts = [
  { kode: "P001", nama: "Laptop", harga: 20000000 },
  { kode: "P002", nama: "Mouse", harga: 150000 },
  { kode: "P003", nama: "Keyboard", harga: 350000 },
  { kode: "P004", nama: "Monitor", harga: 2500000 }
];

// Daftar produk yang akan dibeli
let cart = [];

// Fungsi untuk mengisi dropdown produk
function populateProductDropdown() {
  let productSelect = document.getElementById("kode");
  predefinedProducts.forEach(product => {
      let option = document.createElement("option");
      option.value = product.kode;
      option.textContent = `${product.kode} - ${product.nama}`;
      productSelect.appendChild(option);
  });
}

// Saat produk dipilih, tampilkan nama dan harga otomatis
document.getElementById("kode").addEventListener("change", function () {
  let selectedCode = this.value;
  let selectedProduct = predefinedProducts.find(p => p.kode === selectedCode);

  if (selectedProduct) {
      document.getElementById("nama").value = selectedProduct.nama;
      document.getElementById("harga").value = selectedProduct.harga;
  }
});

// Fungsi saat form disubmit
document.getElementById("productForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let kode = document.getElementById("kode").value;
  let nama = document.getElementById("nama").value;
  let harga = parseFloat(document.getElementById("harga").value);
  let jumlah = parseInt(document.getElementById("jumlah").value);
  let diskon = parseFloat(document.getElementById("diskon").value);

  if (!kode || isNaN(jumlah) || isNaN(diskon)) {
      alert("Mohon lengkapi data dengan benar!");
      return;
  }

  let subTotal = (harga * jumlah) - ((harga * jumlah) * (diskon / 100));

  let product = { kode, nama, harga, jumlah, diskon, subTotal };
  cart.push(product);

  updateTable();
  this.reset();
});

// Update tampilan tabel
function updateTable() {
  let tableBody = document.getElementById("productTable");
  tableBody.innerHTML = "";

  cart.forEach((product, index) => {
      let row = `<tr>
          <td>${product.kode}</td>
          <td>${product.nama}</td>
          <td>${product.jumlah}</td>
          <td>Rp${product.harga.toLocaleString()}</td>
          <td>${product.diskon}%</td>
          <td>Rp${product.subTotal.toLocaleString()}</td>
          <td>
              <button class="edit" onclick="editProduct(${index})">Edit</button>
              <button class="delete" onclick="deleteProduct(${index})">Hapus</button>
          </td>
      </tr>`;

      tableBody.innerHTML += row;
  });
}

// Fungsi Edit Produk
function editProduct(index) {
  let product = cart[index];

  document.getElementById("kode").value = product
  document.getElementById("kode").value = product.kode;
  document.getElementById("nama").value = product.nama;
  document.getElementById("harga").value = product.harga;
  document.getElementById("jumlah").value = product.jumlah;
  document.getElementById("diskon").value = product.diskon;

  // Hapus produk dari keranjang sementara agar bisa diperbarui
  cart.splice(index, 1);
  updateTable();
}

// Fungsi Hapus Produk
function deleteProduct(index) {
  cart.splice(index, 1);
  updateTable();
}

// Jalankan fungsi untuk mengisi dropdown saat halaman dimuat
document.addEventListener("DOMContentLoaded", populateProductDropdown);
