<?php
// Soal 1: pengulangan 1 sampai 10, tampilkan hanya bilangan genap
function tampilGenap($awal = 1, $akhir = 10)
{
    for ($i = $awal; $i <= $akhir; $i++) {
        if ($i % 2 == 0) {
            echo $i . "<br>";
        }
    }
}

// Soal 2: tabel perkalian 10 x 10
// Header & kolom pertama = hijau, hasil ganjil = kuning, hasil genap = cyan
function tampilTabel($n = 10)
{
    echo "<table border='1' cellpadding='4' cellspacing='4'>";

    // Baris header
    echo "<tr><td>bilangan</td>";
    for ($k = 1; $k <= $n; $k++) {
        echo "<td bgcolor='lime'>$k</td>";
    }
    echo "</tr>";

    // Baris isi
    for ($b = 1; $b <= $n; $b++) {
        echo "<tr><td bgcolor='lime'>$b</td>";
        for ($k = 1; $k <= $n; $k++) {
            $hasil = $b * $k;
            $warna = ($hasil % 2 == 1) ? 'yellow' : 'cyan';
            echo "<td bgcolor='$warna'>$hasil</td>";
        }
        echo "</tr>";
    }

    echo "</table>";
}