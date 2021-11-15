<?php

header("Acess-Control-Allow-Origin: *");

include('../database/conn.php');

if($_POST){
    $cpf = $_POST['cpf'];
    
    $checkUser = 'SELECT * FROM tb_paciente WHERE CPF="'.$cpf.'"';

    $res = $con->query($checkUser);

    if($res -> num_rows > 0){
       
             
            $result = $query->fetch_row();
            $dados['id'] = $result[0];
            $dados['cdPosto'] = $result[12];
           
            $sql = 'SELECT c.*,  v.NMVACINA, v.FABRICANTE, p.NMPOSTO FROM tb_carteira c, tb_vacina v, tb_posto p WHERE v.CDVACINA = c.CDVACINA AND p.CDPOSTO = '.$dados['cdPosto'].' AND c.FK_PACIENTE = '.$dados['id'].'';

            $ok = $con->query($sql);


            if($ok->num_rows > 0){

                $data = array();
        
                while($response = $query->fetch_object()){
                    $data[] = $response;
                }    
        
               echo json_encode($data);
        
                die;
            }
        
    
    }

    
   // $sql = 'SELECT c.*,  v.NMVACINA, v.FABRICANTE, p.NMPOSTO FROM tb_carteira c, tb_vacina v, tb_posto p WHERE v.CDVACINA = c.CDVACINA AND p.CDPOSTO = '.$cdPosto.' AND c.FK_PACIENTE = '.$id.'';



}


?>