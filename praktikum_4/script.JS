// Mengambil elemen tombol ke atas berdasarkan ID
const tombol = document.getElementById("keAtas");

// Memantau aktivitas scroll pada jendela browser
window.addEventListener("scroll", function () {
    // Ketentuan: Tombol muncul jika telah melakukan scroll down > 500px
    if (window.scrollY > 500) {
        tombol.classList.add("tampil"); // Menampilkan tombol dengan efek transisi
    } else {
        tombol.classList.remove("tampil"); // Menyembunyikan tombol kembali
    }
});