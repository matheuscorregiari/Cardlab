<?php 
header("Acess-Control-Allow-Origin: *");

include('../database/conn.php');

if($_GET) {
    $id = $_GET['id'];

    $sql = 'SELECT * FROM estoque_vac WHERE CDVACINA = '.$id.'';

    $res = $con->query($sql);

    if($res->num_rows > 0) {
        $stockData = $res->fetch_row();

        $resultForSearch['error'] = false;
        $resultForSearch['cdMedicamento'] = $stockData[0];
        $resultForSearch['dtFabricacao'] = $stockData[1];
        $resultForSearch['dtValidade'] = $stockData[2];
        $resultForSearch['lote'] = $stockData[3];
        $resultForSearch['qntVac'] = $stockData[4];
        $resultForSearch['description'] = $stockData[5];
        $resultForSearch['category'] = $stockData[6];
        $resultForSearch['cdPosto'] = $stockData[7];
        $resultForSearch['cdVaccine'] = $stockData[8];

        echo json_encode($resultForSearch);
        die;
    }

    $resultForSearch['error'] = true;
    $resultForSearch['message'] = 'Nenhuma vacina encontrada com esse código!';
    echo json_encode($resultForSearch);
    die;
}

if($_POST){
    $updateStockCategoria= $_POST['updateStockCategoria'];
    $updateStockCodPosto= $_POST['updateStockCodPosto'];
    $updateStockDataVal = $_POST['updateStockDataVal'];
    $updateStockDataFab = $_POST['updateStockDataFab'];
    $updateStockDescricao= $_POST['updateStockDescricao'];
    $updateStockLote = $_POST['updateStockLote'];
    $updateStockQuantVacina = $_POST['updateStockQuantVacina'];
    $updateStockcdMedicamento= $_POST['updateStockcdMedicamento'];

    $sql = 'UPDATE estoque_vac SET DTFAB="'.$updateStockDataFab.'", DTVAL="'.$updateStockDataVal.'", LOTE='.$updateStockLote.', QNTVAC='.$updateStockQuantVacina.', TEXTVAC="'.$updateStockDescricao.'", CATEGVAC="'.$updateStockCategoria.'", CDPOSTO='.$updateStockCodPosto.' WHERE CDMEDICAMENTO = '.$updateStockcdMedicamento.'';

    $res = $con->query($sql);

    if($res === true){
        $dados['error'] = false;
        $dados['message'] = 'Estoque atualizado com sucesso!';
        echo json_encode($dados);
        die;
    }

    $dados['error'] = true;
    $dados['message'] = 'Falha ao atualizar! '.$con->error;
    echo json_encode($dados);
}




?>