<?php
header("Acess-Control-Allow-Origin: *");

include('../database/conn.php');

if($_POST){
    $nameVaccine = $_POST['nameVaccine'];
    $manufacturerVaccine = $_POST['manufacturerVaccine'];
    $textVac = $_POST['textVac'];
    $category = $_POST['category'];
    
    $verifyExists = 'SELECT * FROM tb_vacina WHERE NMVACINA = "'.$nameVaccine.'"';
    $verifyRes = $con->query($verifyExists);

    if($verifyRes->num_rows > 0) {
        $dados['message'] = 'A vacina '.$nameVaccine.', já esta cadastrada no sistema!';
        $dados['error'] = true;
        echo json_encode($dados);
        die;
    }


    $insertTbVaccine = 'INSERT INTO tb_vacina VALUES  (null,"'.$nameVaccine.'","'.$manufacturerVaccine.'","'.$textVac.'","'.$category.'")';
    


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