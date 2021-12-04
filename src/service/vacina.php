<?php
header("Acess-Control-Allow-Origin: *");

include('../database/conn.php');

$loop = false;

do {
    $loop = false;
    if(isset($_GET['dado'])){
        if($_GET['dado'] == 'vacina'){
    
            $sql = 'select * from tb_vacina';
            $res = $con->query($sql);
            $retorno = '';
    
            while($posto = $res->fetch_object()){
                $retorno .= '<option value="'.$posto->CDVACINA.'">'.$posto->NMVACINA.'</option>';
            }
    
            echo $retorno;
    
        } else if($_GET['dado'] == 'estoque'){
            $postoId = $_GET['posto'];
            $vaccineValue = $_GET['vacina'];    

            $sql = 'SELECT * FROM estoque_vac WHERE CDPOSTO ='.$postoId.' AND CDVACINA = '.$vaccineValue.'';
            $res = $con->query($sql);
            $retorno = '';

           if($res->num_rows > 0) {
                while($posto = $res->fetch_object()){
                
                    $retorno .='<input type="text" id="updateStockId" readonly value="'.$posto->CDMEDICAMENTO.'"/>';
                    $retorno .= '<input type="date" id="updateStockDataFab" value="'.$posto->DTFAB.'" />';
                    $retorno .= '<input type="date" id="updateStockDataVal" value="'.$posto->DTVAL.'" />';
                    $retorno .= '<input type="text" id="updateStockLote" value="'.$posto->LOTE.'" />';
                    $retorno .= '<input type="number" id="updateStockQuantVacina" value="'.$posto->QNTVAC.'" />';
                    $retorno .='<button id="btnEdit" onclick="sendForm(e)">Atualizar</button>';      
                    $retorno .='<button id="voltar">Voltar</button>';      
                    $retorno .= '<button id="deletar">Deletar</button>';
                }

                echo $retorno;
                die;
           }


            $loop = true;

        } else {
            $sql = 'select * from tb_posto';
            $res = $con->query($sql);
            
            $retorno = '';
            while($posto = $res->fetch_object()){
                $retorno .= '<option class="posto" value="'.$posto->CDPOSTO.'">'.$posto->NMPOSTO.'</option>';
            }
    
            echo $retorno;
    
        }
    }
    # code...
} while ($loop);


if($_POST['idDelete']) {
    $id = $_POST['idDelete'];

    $sql = 'DELETE FROM estoque_vac WHERE 	CDMEDICAMENTO = '.$id.'';

    $res = $con->query($sql);

    if($res === true) {
        $dado['error'] = false;
        $dado['message'] = 'Registro de estoque deletado com sucesso';

        echo json_encode($dado);
        die;
    } else {
        $dado['error'] = true;
        $dado['message'] = 'Falha ao deletar registro'.$con->error;

        echo json_encode($dado);
        die;
    }
}