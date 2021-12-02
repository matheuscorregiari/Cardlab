<?php
header("Acess-Control-Allow-Origin: *");

include('../database/conn.php');

if($_POST){
    $idVaccine = $_POST['idVaccine'];
    $nameVaccine = $_POST['nameVaccine'];
    $manufacturerVaccine = $_POST['manufacturerVaccine'];
    
    $insertTbVaccine = 'INSERT INTO tb_vacina VALUES  ('.$idVaccine.',"'.$nameVaccine.'","'.$manufacturerVaccine.'")';
    


    $responseTbVaccine = $con->query($insertTbVaccine);

        if($responseTbVaccine == 1){
            $dados['message'] = 'Vacina Cadastrada com sucesso!';
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
?>