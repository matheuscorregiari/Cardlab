<?php

header("Acess-Control-Allow-Origin: *");

include('../database/conn.php');

if ($_POST) {
    $id = $_POST['updateStockId'];
    $dtFab = $_POST['updateStockDataFab'];
    $dtVal = $_POST['updateStockDataVal'];
    $lote = $_POST['updateStockLote'];
    $qntVac = $_POST['updateStockQuantVacina'];

    $sql = 'UPDATE estoque_vac SET DTFAB = "'.$dtFab.'", DTVAL = "'.$dtVal.'", LOTE= "'.$lote.'", QNTVAC = '.$qntVac.' WHERE CDMEDICAMENTO = '.$id.'';

    $res = $con->query($sql);


    if ($res === true) {
        $dado['error'] = false;
        $dado['message'] = 'Registro editado com sucesso!';

        echo json_encode($dado);
        die;
    } else {
        $dado['error'] = true;
        $dado['message'] = 'Falha ao editar registro' . $con->error;

        echo json_encode($dado);
        die;
    }
}
