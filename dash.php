<?php

    $hostBD = "db4free.net::3306";
    $usuarioBD = "tcc_esp_laerte";
    $senhaBD = "etreal120997"
    $BD = "tcc_esp_laerte"; 

    if(!$conexaoBD = new mysqli_connect($hostBD, $usuarioBD, $senhaBD, $BD)){
        echo "Erro - Conexão com o banco de dados falhou."
    }

?>