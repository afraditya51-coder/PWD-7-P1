// 1. Data produk: array of object
var produk = [
  {id:1, nama:"Buku Tulis Sidu 38 Lembar", harga:5000, stok:20},
  {id:2, nama:"Pulpen Gel Hitam", harga:4000, stok:30},
  {id:3, nama:"Pensil 2B (1 lusin)", harga:24000, stok:10},
  {id:4, nama:"Penghapus & Rautan Set", harga:7000, stok:15},
  {id:5, nama:"Novel Laskar Pelangi", harga:89000, stok:5},
  {id:6, nama:"Kamus Inggris-Indonesia", harga:75000, stok:3}
];
var keranjang = []; // {id, nama, harga}

function rupiah(n){ return "Rp " + n.toLocaleString("id-ID"); }

// Tampilkan produk memakai perulangan + createElement, createTextNode, appendChild
function tampilkanProduk(){
  var wadah = document.getElementById("daftar-produk");
  for (var i = 0; i < produk.length; i++){
    var p = produk[i];
    var kartu = document.createElement("div");
    kartu.className = "produk";
    kartu.setAttribute("data-id", p.id);

    var judul = document.createElement("h3");
    judul.appendChild(document.createTextNode(p.nama));

    var harga = document.createElement("div");
    harga.className = "harga";
    harga.appendChild(document.createTextNode(rupiah(p.harga)));

    var stok = document.createElement("div");
    stok.className = "stok";
    var teksStok = document.createElement("span");
    teksStok.className = "teks-stok";
    teksStok.appendChild(document.createTextNode(p.stok));
    stok.appendChild(document.createTextNode("Stok: "));
    stok.appendChild(teksStok);

    var tombol = document.createElement("button");
    tombol.className = "tambah";
    tombol.setAttribute("data-id", p.id);
    tombol.appendChild(document.createTextNode("Tambah ke Keranjang"));

    kartu.appendChild(judul);
    kartu.appendChild(harga);
    kartu.appendChild(stok);
    kartu.appendChild(tombol);
    wadah.appendChild(kartu);
  }
}

function cariProduk(id){
  for (var i = 0; i < produk.length; i++){ if (produk[i].id === id) return produk[i]; }
}

function perbarui(){
  var total = 0;
  for (var i = 0; i < keranjang.length; i++){ total += keranjang[i].harga; }
  $("#jumlah-item").text(keranjang.length);   // text()
  $("#total-harga").text(rupiah(total));       // text()
  if (keranjang.length === 0 && $("#isi-keranjang .kosong").length === 0){
    $("#isi-keranjang").append('<li class="kosong">Keranjang masih kosong</li>');
  }
}

// 6. $(document).ready()
$(document).ready(function(){
  tampilkanProduk();
  perbarui();

  // Tambah ke keranjang
  $("#daftar-produk").on("click", ".tambah", function(){
    var id = parseInt($(this).attr("data-id"));
    var p = cariProduk(id);
    if (p.stok <= 0){
      alert("Maaf, stok " + p.nama + " habis!");   // alert()
      return;
    }
    p.stok--;
    $(this).closest(".produk").find(".teks-stok").text(p.stok);
    keranjang.push({id:p.id, nama:p.nama, harga:p.harga});
    $("#isi-keranjang .kosong").remove();
    var $li = $('<li></li>').attr("data-id", p.id)
      .append($("<span></span>").text(p.nama + " - " + rupiah(p.harga)))
      .append($('<button class="hapus">Hapus</button>'))
      .hide();
    $("#isi-keranjang").append($li);   // append()
    $li.fadeIn(150);                   // fadeIn()
    $("#ringkasan").hide();
    perbarui();
  });

  // Hapus satu item
  $("#isi-keranjang").on("click", ".hapus", function(){
    var $li = $(this).closest("li");
    if (!confirm("Hapus item ini dari keranjang?")) return;   // confirm()
    var idx = $li.index();
    var item = keranjang[idx];
    cariProduk(item.id).stok++;
    $('.produk[data-id="' + item.id + '"] .teks-stok').text(cariProduk(item.id).stok);
    keranjang.splice(idx, 1);
    $li.fadeOut(150, function(){       // fadeOut()
      $(this).remove();                // remove()
      perbarui();
    });
  });

  // Kosongkan keranjang
  $("#kosongkan").on("click", function(){
    if (keranjang.length === 0){ alert("Keranjang sudah kosong."); return; }
    if (!confirm("Kosongkan seluruh keranjang?")) return;
    for (var i = 0; i < keranjang.length; i++){ cariProduk(keranjang[i].id).stok++; }
    for (var j = 0; j < produk.length; j++){
      $('.produk[data-id="' + produk[j].id + '"] .teks-stok').text(produk[j].stok);
    }
    keranjang = [];
    $("#isi-keranjang").empty();       // empty()
    $("#ringkasan").hide().empty();
    perbarui();
  });

  // Buka/tutup panel keranjang
  $("#toggle-keranjang").on("click", function(){
    $("#panel-keranjang").fadeToggle(150);   // fadeToggle()
  });

  // Checkout
  $("#checkout").on("click", function(){
    if (keranjang.length === 0){ alert("Keranjang masih kosong."); return; }
    var nama = prompt("Masukkan nama pembeli:");   // prompt()
    if (nama === null || $.trim(nama) === ""){ alert("Nama pembeli wajib diisi."); return; }
    var total = 0, html = "<ul>";
    for (var i = 0; i < keranjang.length; i++){
      total += keranjang[i].harga;
      html += "<li>" + $("<div>").text(keranjang[i].nama).html() + " (" + rupiah(keranjang[i].harga) + ")</li>";
    }
    html += "</ul>";
    $("#ringkasan").empty()
      .append($("<h3></h3>").text("Ringkasan Pesanan"))
      .append($("<p></p>").text("Nama: " + $.trim(nama)))
      .append(html)
      .append($("<strong></strong>").text("Total: " + rupiah(total)))
      .fadeIn(150);
  });

  // 5. Pencarian dengan val() dan toggle()
  $("#cari").on("keyup input", function(){
    var kata = $(this).val().toLowerCase();   // val()
    $(".produk").each(function(){
      var cocok = $(this).find("h3").text().toLowerCase().indexOf(kata) > -1;
      $(this).toggle(cocok);                  // toggle()
    });
  });
});
