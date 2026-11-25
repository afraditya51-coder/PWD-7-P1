<?php

class Hewan{
    private $nama = "";
    private $umur = 0;
    private static $sudahTampilDestruct = false;

    public function __destruct()
    {
        if (!self::$sudahTampilDestruct) {
            echo "Astagfirullah!<br>";
            self::$sudahTampilDestruct = true;
        }
    }

    function SetNama($nama){
        $this->nama = $nama;
    }
    
    function SetUmur($umur){
        $this->umur = $umur;
    }

    function GetNama(){
        return $this->nama;
    }
    
    function GetUmur(){
        return $this->umur;
    }
}

class Kucing extends Hewan{
    private $jenis = "Kucing";

    function GetJenis(){
        return $this->jenis;
    }

    function GetSuara(){
        return "Miauw!";
    }

    function GetAllData(){
        echo "Nama  : ". $this->GetNama() ."<br>";
        echo "Umur  : ". $this->GetUmur() ." tahun<br>";
        echo "Jenis : ". $this->GetJenis() ."<br>";
        echo "Suara : ". $this->GetSuara() ."<br><br>";
    }
}

class Anjing extends Hewan{
    private $jenis = "Anjing";

    function GetJenis(){
        return $this->jenis;
    }
    
    function GetSuara(){
        return "Sorry Yee!";
    }

    function GetAllData(){
        echo "Nama  : ". $this->GetNama() ." <br>";
        echo "Umur  : ". $this->GetUmur() ." tahun<br>";
        echo "Jenis : ". $this->GetJenis() ." <br>";
        echo "Suara : ". $this->GetSuara() ." <br><br>";
    }
}

$kucing = new Kucing();
$kucing->SetNama("Bobby Kertanegara");
$kucing->SetUmur(10);
$kucing->GetAllData();

$anjing = new Anjing();
$anjing->SetNama("Wowo");
$anjing->SetUmur(75);
$anjing->GetAllData();

