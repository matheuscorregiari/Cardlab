<?php

$user = 'root';
$pass = 'usbw';
$server = 'localhost';
$bd = 'bdcardlab';

$con = new mysqli($server,$user,$pass,$bd);

if(!$con){
	echo "problema com a conexão do banco de dados!";
}

 /*	function addPosto($NMPOSTO,	$CNPJ,	$TELEFONE1,	$TELEFONE2,	$ENDERECO,	$EMAIL,	$CDBAIRRO,	$CDADM
	){
		$sql='insert into tb_posto values(null,"'.$NMPOSTO.'",'.$CNPJ.'...)';
	
		$res=$GLOBALS['con']->query($sql);
		if($res){
			$dados['msg']= 'Posto cadastrado';
			$dados['error']=false;
		}else{
			$dados['msg'] ='erro ao cadastrar';
			$dados['error']=true;
		}

		echo json_encode($dados);
		
	} */
	

?>