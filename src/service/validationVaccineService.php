<?php

header("Acess-Control-Allow-Origin: *");

include('../database/conn.php');

if(isset($_POST['idForValidation'])){
    $idForValidation = $_POST['idForValidation'];
    $nameForValidation = $_POST['nameForValidation'];
    $response =array();
    $i= 0;

    foreach($nameForValidation as $value){
        $sql1 = 'SELECT v.CDVACINA FROM tb_vacina as v WHERE v.NMVACINA = "'.$value.'"';

        $res1 = $con->query($sql1);

        if($res1->num_rows > 0) {

            $id = $res1->fetch_row();

            if($id !== null){

                $sql2 = 'SELECT e.QNTVAC FROM estoque_vac as e WHERE e.CDVACINA = '.$id[0].'';

                $res2 = $con->query($sql2);

                if($res2->num_rows > 0) {

                    $quantitis = $res2->fetch_row();

                    $updated = intval($quantitis[0]) - 1;

                    $sql3 = 'UPDATE estoque_vac SET QNTVAC = '.$updated.' WHERE CDVACINA = '.$id[0].'';

                    $rest3 = $con->query($sql3);

              

                    if($rest3 === true) {
                        $response['errorStock'] = false;

                        $sql4 = 'DELETE FROM tb_carteira WHERE CDCARTEIRA = '.$idForValidation[$i].'';
                        
                        $res5 = $con->query($sql4);
                
                        if($res5 === true) {
                            $i = $i+1;
                            $response['errorRegister'] = false;
                        }

                    } else {
                        $response['errorStock'] = true;
                        $response['messageStock'] = 'Falha ao atualizar estoque!';
                        echo json_encode($response);
                        die;
                    }
         
                } else {
                    $response['errorStock'] = true;
                    $response['messageStock'] = 'Falha ao buscar a quantidade no estoque! '.$con->error;
                    echo json_encode($response);
                    die;
                }

            }else {
                $response['errorStock'] = true;
                $response['messageStock'] = 'Falha ao buscar o código da vácina para tualização do estoque!';
                echo json_encode($response);
                die;
            }

        }else {
            $response['errorStock'] = true;
            $response['messageStock'] = 'Nome da vacina não encontrado para atualização do estoque!';
            echo json_encode($response);
            die;
        }
    }

    echo json_encode($response);
    die;
}

if($_POST){
    $cpf = $_POST['cpf'];
    
    //verificar se o cpf digitado é valido
    $checkUser = 'SELECT * FROM tb_paciente WHERE CPF="'.$cpf.'"';

    $res = $con->query($checkUser);

    if($res->num_rows > 0){
            //se o cpf for valido pegar informações que serão usadas para consultar a sua carteira
            $resultData = $res->fetch_row();
            $dados['id'] = $resultData[0];
            $dados['cdPosto'] = $resultData[12];

            $sql = 'SELECT c.*,  v.NMVACINA, v.FABRICANTE, v.TEXTVAC, p.NMPOSTO FROM tb_carteira c, tb_vacina v, tb_posto p WHERE v.CDVACINA = c.CDVACINA AND p.CDPOSTO = '.$dados['cdPosto'].' AND c.FK_PACIENTE = '.$dados['id'].'';

            $queryResult = $con->query($sql);

            if($queryResult->num_rows > 0){

                $data = array();
                //armazena as vacinas que ele tem agendada na variavel $data
                while($response = $queryResult->fetch_object()){
                    $data[] = $response;
                }    
        
                //retorna essas informações pro javascript
                $resultOfAllResearch['error'] = false;
                $resultOfAllResearch['data'] = $data;
                echo json_encode($resultOfAllResearch); 
                die;
            }

        $resultOfAllResearch['error'] = true;
        $resultOfAllResearch['message'] = 'Esse usuário não tem nenhuma vacina agendada!';
        echo json_encode($resultOfAllResearch); 
        die;
    }

    $resultOfAllResearch['error'] = true;
    $resultOfAllResearch['message'] = 'Falha ao buscar usuário :/';
    echo json_encode($resultOfAllResearch); 
}



?>