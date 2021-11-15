<?php
header("Acess-Control-Allow-Origin: *");

include('../database/conn.php');

if($_POST){
    $idVaccine = $_POST['idVaccine'];
    $nameVaccine = $_POST['nameVaccine'];
    $manufacturerVaccine = $_POST['manufacturerVaccine'];
    $dateManufacturer = $_POST['dateManufacturer'];
    $dateValidity = $_POST['dateValidity'];
    $batch = $_POST['batch'];
    $amountVaccine = $_POST['amountVaccine'];
    $posto = $_POST['posto'];
    $description = $_POST['description'];
    $category = $_POST['category'];
    $idMedicine = $_POST['idMedicine'];

    $insertTbVaccine = 'INSERT INTO tb_vacina VALUES  ('.$idVaccine.',"'.$nameVaccine.'","'.$manufacturerVaccine.'")';

    $inserTbEstoque = 'INSERT INTO estoque_vac VALUES ('.$idMedicine.',"'.$dateManufacturer.'","'.$dateValidity.'","'.$batch.'",'.$amountVaccine.',"'.$description.'","'.$category.'","'.$posto.'",'.$idVaccine.')';

    if($con->query($insertTbEstoque) && $con->query($insertTbVaccine)){

    

        $responseTbEstoque = $con->query($inserTbEstoque);
        $responseTbVaccine = $con->query($insertTbVaccine);
    
    

        if($responseTbVaccine == 1){
            $dados['message'] = 'Cadastro efetuado com sucesso!';
            $dados['error'] = false;
            echo json_encode($dados);
            die;
        }else{
            $dados['message'] = 'Erro ao efetuar cadastro!';
            $dados['error'] = true;
            echo json_encode($dados);
            die;
        }
    } 
    $dados['message'] = 'Falha na execução cusao';
    $dados['error'] = true;
    echo json_encode($dados);
}



?>