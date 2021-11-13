<?php

header("Acess-Control-Allow-Origin: *");

include('../database/conn.php');


if($_GET){
   
    $cdPosto = $_GET['cdPosto'];
    $id = $_GET['userId'];

    $sql = 'SELECT c.*,  v.NMVACINA, v.FABRICANTE, p.NMPOSTO FROM tb_carteira c, tb_vacina v, tb_posto p WHERE v.CDVACINA = c.CDVACINA AND p.CDPOSTO = '.$cdPosto.' AND c.FK_PACIENTE = '.$id.'';

    $query = $con->query($sql);

    if($query->num_rows > 0){

        $dados = array();

        while($result = $query->fetch_object()){
            $dados[] = $result;
        }    

       echo json_encode($dados);

        die;
    }


    echo 'errrooou';
}

?>