<?php

header("Acess-Control-Allow-Origin: *");

include('../database/conn.php');

if($_POST){

	$email = $_POST['email'];
	$senha = $_POST['senha'];
	$telefone = $_POST['telefone'];
	$telefone2 = $_POST['telefone2'];
	$sexo = $_POST['sexo'];
	$nome = $_POST['nome'];
	$endereco = $_POST['endereco'];
	$tpsang = $_POST['tpsang'];
	$rg = $_POST['rg'];
	$cpf = $_POST['cpf'];
	$dtnasc = $_POST['dtnasc'];
	$posto = $_POST['posto'];
	
//	validação dos dados
	if (isset($_POST['cdpaciente'])) {
		$sql = 'UPDATE TB_PACIENTE SET email="'.$email.'",';
		$sql .='senha="'.$senha.'",';
		$sql .='telefone="'.$telefone.'",';
		$sql .='telefone2="'.$telefone2.'",';
		$sql .='exampleRadios="'.$sexo.'",';
		$sql .='nome="'.$nome.'",';
		$sql .='endereco="'.$endereco.'",';
		$sql .='tpsang="'.$tpsang.'",';
		$sql .='rg="'.$rg.'",';
		$sql .='cpf="'.$cpf.'",';
		$sql .='dtnasc="'.$dtnasc.'",';
		$sql .='WHERE cdpaciente='+$_POST['cdpaciente'];
	}
	else{

		$sql = 'INSERT INTO TB_PACIENTE VALUES(';
		$sql .= 'null,';
		$sql .= '"'.$email.'",';
		$sql .= '"'.$senha.'",';
		$sql .= '"'.$telefone.'",';
		$sql .= '"'.$telefone2.'",';
		$sql .= '"'.$sexo.'",';
		$sql .= '"'.$nome.'",';
		$sql .= '"'.$endereco.'",';
		
		
		$sql .= '"'.$tpsang.'",';
		$sql .= '"'.$rg.'",';
		$sql .= '"'.$cpf.'",';
		$sql .= '"'.$dtnasc.'",';
		$sql .= ''.$posto.',';
		$sql .= '1';
		$sql .= ')';

		$res = $con->query($sql);

		echo $res;
		if($res == 1){
			$dados['message'] = "Cadastro concluído";
			$dados['success'] =  true;
			echo json_encode($dados);
		}else{
			$dados['message'] =  "Erro ao cadastrar, contate um administrador para reportar o erro!!";
			$dados['success'] =  false;
			echo json_encode($dados);
		}
	}

	

	
	
}

?>