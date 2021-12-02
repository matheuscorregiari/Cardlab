<?php

header("Acess-Control-Allow-Origin: *");

include('../database/conn.php');

if($_POST) {
    $userId= $_POST['userId'];
    $date= $_POST['date'];
    $post= $_POST['posto'];
    $vaccine= $_POST['vaccine'];
    $dateNextDose = $_POST['dateNextDose'];

    $sql = 'INSERT INTO tb_carteira VALUES (NULL, '.$vaccine.', "'.$date.'", "'.$dateNextDose.'", '.$post.','.$userId.')';

    $query = $con->query($sql);

    if($query == 1){
      $dados['error'] = false;
      $dados['message'] = "agendamento concluído";

		  echo json_encode($dados);
      die;
    }else{
      $dados['error'] = true;
      $dados['message'] = "erro ao agendar".$con->error;

		  echo json_encode($dados);
    }

}



?>