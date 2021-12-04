<?php

header("Acess-Control-Allow-Origin: *");

include('../database/conn.php');

if($_POST){
    $dtFab = $_POST['dtFab'];
    $dtVal = $_POST['dtVal'];
    $lote = $_POST['lote'];
    $qntVac = $_POST['qntVac'];
    $posto = $_POST['posto'];
    $vaccine = $_POST['vaccine'];


    $verifyExists = 'SELECT * FROM estoque_vac WHERE LOTE = "'.$lote.'"';
    $verifyRes = $con->query($verifyExists);

    if($verifyRes->num_rows > 0) {
        $dados['message'] = 'Estoque do lote: '.$lote.', já foi realizado!';
        $dados['error'] = true;
        echo json_encode($dados);
        die;
    }

    $insertTbEstoque = 'INSERT INTO estoque_vac VALUES (null,"'.$dtFab.'","'.$dtVal.'","'.$lote.'",'.$qntVac.','.$posto.','.$vaccine.')';

    $res = $con->query($insertTbEstoque);

    if($res == true){
        $dados['message'] = 'Cadastro efetuado com sucesso!';
        $dados['error'] = false;
        echo json_encode($dados);
        die;
    }else{
        $dados['message'] = 'Erro ao cadastrar!';
        $dados['error'] = true;
        echo json_encode($dados);
    }
}

if($_GET['loadVaccineStock'] == 'true') {

    $sql = 'SELECT v.CDVACINA, v.NMVACINA  FROM tb_vacina as v';

    $res = $con->query($sql);
    $retorno = '';

   if($res->num_rows > 0) {

        while($vaccina = $res->fetch_object()){
        
            $retorno .='<option  value="'.$vaccina->CDVACINA.'">'.$vaccina->NMVACINA.'</option>';
        }

        echo $retorno;
        die;
   }

}

?>