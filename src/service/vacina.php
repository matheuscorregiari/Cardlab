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
            $vaccineName = $_GET['vacina'];    

            $sql = 'SELECT * FROM estoque_vac WHERE CDPOSTO ='.$postoId.' AND CDVACINA = '.$vaccineName.'';
            $res = $con->query($sql);
            $retorno = '';
    
           if($res->num_rows > 0) {
                while($posto = $res->fetch_object()){
                
                    $retorno .='<input type="text" readonly value="'.$posto->CDMEDICAMENTO.'"/>';
                    $retorno .= '<input type="date" id="updateStockDataFab" value="'.$posto->DTFAB.'" />';
                    $retorno .= '<input type="date" id="updateStockDataVal" value="'.$posto->DTVAL.'" />';
                    $retorno .= '<input type="text" id="updateStockLote" value="'.$posto->LOTE.'" />';
                    $retorno .= '<input type="number" id="updateStockQuantVacina" value="'.$posto->QNTVAC.'" />';
                    $retorno .= '<input type="text" id="updateStockCategoria" value="'.$posto->CATEGVAC.'" />';
                    $retorno .= '<textarea id="updateStockDescricao" >'.$posto->TEXTVAC.'</textarea>';

                    $retorno .='<button id="btnEdit" onclick="sendForm(e)">Atualizar</button>';      
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
