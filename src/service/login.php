<?php

header("Acess-Control-Allow-Origin: *");

include('../database/conn.php');

if($_POST){
	$cpf = $_POST['cpf'];
	$senha = $_POST['senha'];

	$teste="SELECT * FROM tb_paciente WHERE cpf='$cpf' AND senha='$senha'";
	$teste2="SELECT * FROM tb_admin WHERE cpf='$cpf' AND senha='$senha'";
	
	$query = $con->query($teste);

	if($query->num_rows>0) {
		$result = $query->fetch_row();
		$dados['error']=false;
		$dados['name'] = $result[6];
		$dados['id'] = $result[0];
		$dados['accessLevel'] = false;
		$dados['cdPosto'] = $result[12];
		echo json_encode($dados);
		die;
	}	

	$query2 = $con->query($teste2);



	if($query2->num_rows>0) {
		$result = $query2->fetch_row();
		$dados['error']=false;
		$dados['name'] = $result[1];
		$dados['id'] = $result[0];
		$dados['accessLevel'] = $result[4];
		echo json_encode($dados);
		die;
	}

	$dados['msg'] = 'Cpf ou senha incorreto';
	$dados['error'] = true;
	echo json_encode($dados);

}



?>