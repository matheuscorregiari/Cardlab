<?php 
header("Acess-Control-Allow-Origin: *");

include('../database/conn.php');

if($_GET){
    $name = $_GET['name'];

    $sql = 'SELECT * FROM tb_vacina WHERE NMVACINA = "'.$name.'"';

    $res = $con->query($sql);

    if($res->num_rows > 0){

        $data= $res->fetch_row();

        $resultForSearch['id']= $data[0];
        $resultForSearch['name']= $data[1];
        $resultForSearch['manufacture']= $data[2];
        $resultForSearch['error'] = false;

        echo json_encode($resultForSearch);
        die;
    }

    $resultForSearch['error'] = true;
    $resultForSearch['message'] = 'Vacina não encontrada!';
    echo json_encode($resultForSearch);
}

if($_POST) {
    $idVaccineSearch= $_POST['idVaccineSearch'];
    $manufacturerVaccineSearch= $_POST['manufacturerVaccineSearch'];
    $nameVaccineSearch = $_POST['nameVaccineSearch'];

    $sql = 'UPDATE tb_vacina SET NMVACINA="'.$nameVaccineSearch.'", FABRICANTE="'.$manufacturerVaccineSearch.'" WHERE CDVACINA = '.$idVaccineSearch.'';
    
    $res= $con->query($sql);

    if($res === true){
        $dados['error'] = false;
        $dados['message'] = 'Vacina atualizada com sucesso!';
        echo json_encode($dados);
        die;
    }

    $dados['error'] = true;
    $dados['message'] = 'Falha ao atualizar! '.$con->error;
    echo json_encode($dados);
}
?>