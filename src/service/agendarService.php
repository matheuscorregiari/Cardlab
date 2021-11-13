<?php

header("Acess-Control-Allow-Origin: *");

include('../database/conn.php');

if($_POST) {
    $userId= $_POST['userId'];
    $date= $_POST['date'];
    $post= $_POST['posto'];
    $vaccine= $_POST['vaccine'];
  //  $dateNextDose = $_POST['dateNextDose'];

    $sql = 'INSERT INTO tb_carteira VALUES (NULL, '.$vaccine.', "'.$date.'", "2021-03-22", '.$post.','.$userId.')';

    $query = $con->query($sql);

    if($query == 1){
		echo "agendamento concluído";
	}else{
		echo "erro ao agendar".$con->error;
	}

}



?>