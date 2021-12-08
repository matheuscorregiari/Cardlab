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

		//verificar se o usuário já existe antes de cadastrar
		$verifySql = 'SELECT * FROM TB_PACIENTE WHERE CPF = '.$cpf.'';

		$verifyUserExist = $con->query($verifySql);

		if($verifyUserExist->num_rows>0){
			$dados['message'] = "CPF já cadastrado no sistema!";
			$dados['success'] =  false;
			echo json_encode($dados);
			die;
		}

		//cadastrar o usuário no sistema
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

		//verificar se o cadastro foi um sucesso se sim então entra no if se não entra no else
		if($res == 1){

			//pegar as informações do usuário que acabou de se cadastrar para setar os dados na sessão
			$getUserData="SELECT * FROM tb_paciente WHERE cpf='$cpf'";

			$query = $con->query($getUserData);

			if($query->num_rows>0) {
				$result = $query->fetch_row();
				$dados['error']=false;
				$dados['name'] = $result[6];
				$dados['id'] = $result[0];
				$dados['accessLevel'] = false;
				$dados['cdPosto'] = $result[12];
				$dados['message'] = "Cadastro concluído";
				$dados['success'] =  true;

				echo json_encode($dados);
				die;
			}	
		}else{
			$dados['message'] =  "Erro ao cadastrar, contate um administrador para reportar o erro!!";
			$dados['success'] =  false;
			echo json_encode($dados);
		}
	}
}

?>