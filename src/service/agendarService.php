<?php

header("Acess-Control-Allow-Origin: *");

include('../database/conn.php');

if($_POST) {
    $userId= $_POST['userId'];
    $date= $_POST['date'];
    $post= $_POST['post'];
    $vaccine= $_POST['vaccine'];
    $dateNextDose = $_POST['dateNextDose'];

    $sql = 'INSERT INTO tb_carteira VALUES (NULL, '.$vaccine.', "'.$date.'", '.$dateNextDose.', '.$userId.')';

    $query = $con->query($sql);

    if($query){
		echo "agendamento concluído";
	}else{
		echo "erro ao agendar".$con->error;
	}

}



?>