<?php

header("Acess-Control-Allow-Origin: *");

include('../database/conn.php');


if($_GET){
   
    $cdPosto = $_GET['cdPosto'];

    $sql = 'SELECT c.*,  v.NMVACINA, v.FABRICANTE, p.NMPOSTO FROM tb_carteira c, tb_vacina v, tb_posto p WHERE v.CDVACINA = c.CDVACINA AND p.CDPOSTO = '.$cdPosto.'';

    $query = $con->query($sql);

    if($query->num_rows > 0){
        $result = $query->fetch_row();

        $dados['cd'] = $result[0];
        $dados['dataAplicacao'] = $result[2];
        $dados['dataProximaAplicacao'] = $result[3];
        $dados['nomeVacina'] = $result[5];
        $dados['fabricante'] = $result[6];
        $dados['nmPosto'] = $result[7];

        echo json_encode($dados);
    }
    die;
}

?>