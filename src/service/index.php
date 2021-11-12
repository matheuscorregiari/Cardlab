<?php
header("Acess-Control-Allow-Origin: *");

include('../database/conn.php');

$login_cookie = $_COOKIE['nome'];
if (isset($login_cookie)) {
		echo "Bem vindo, $login_cookie <br>";
		echo "Essas informações <font color='red'>PODEM</font> ser acessadas por você";
}else{


	echo "Bem vindo, convidado <br>";
	echo "Essas informações <font color='red'> NÃO PODEM</font> ser acessadas por você";
}

?>