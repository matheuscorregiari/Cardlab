

class Stock {

    static createStock(e) {
        e.preventDefault();

        let dtFab= document.getElementById('dtFab').value
        let dtVal= document.getElementById('dtVal').value
        let lote= document.getElementById('lote').value
        let qntVac= document.getElementById('qntVac').value
        let posto= document.getElementById('posto').value
        let vaccine= document.getElementById('vaccine').value
        
        lote = lote.trim();
           
        if(qntVac <= 0){
            throw new Error ('Quantidade inválida ao cadastrar!')
        }

        if(lote === null || lote === ""){
            throw new Error('Necessário registrar o lote')
        }

        const dataFab = new Date(dtFab);
        const dataVal = new Date(dtVal);
        const now = new Date();

        if(dataFab.getTime() >= dataVal.getTime()){
            
            throw new Error('Data de validade não pode ser menor que a de fabricação');
        
        }else if(dataVal.getTime() <= now.getTime()){
        
            throw new Error('Data de validade menor que data atual');
        
        }

        try {      

            $.ajax({
                url: '../../service/cadastrarEstoque.php',
                data: {dtFab, dtVal, lote, qntVac, posto, vaccine},
                type: 'POST',
                success: function(response){
                    
                    const res = JSON.parse(response);

                    if(res.error === true){
                        alert(res.message);
                    }else{
                        alert(res.message);
                    }
                }
            })
        } catch (error) {
            alert(error.message)
        }
    }

    static updateStock(e) {
        e.preventDefault();

        let updateStockId = document.getElementById('updateStockId').value
        let updateStockDataFab = document.getElementById('updateStockDataFab').value
        let updateStockDataVal = document.getElementById('updateStockDataVal').value
        let updateStockLote = document.getElementById('updateStockLote').value
        let updateStockQuantVacina = document.getElementById('updateStockQuantVacina').value

        updateStockLote = updateStockLote.trim()


        let updateStockDataFabTimeStamp = new Date(updateStockDataFab);
        let updateStockDataValTimeStamp = new Date(updateStockDataVal);
        const now = new Date();

        if(qntVac <= 0){
            throw new Error ('Quantidade inválida ao cadastrar!')
        }

        if(lote === null || lote === ""){
            throw new Error('Necessário registrar o lote')
        }
        
        if(updateStockDataFabTimeStamp.getTime() >= updateStockDataValTimeStamp.getTime()){
         
            throw new Error('Data de validade não pode ser menor que a de fabricação');
        
        }else if(updateStockDataValTimeStamp.getTime() <= now.getTime()){
            
            throw new Error('Data de validade menor que data atual');
        
        }

        window.addEventListener("click", () => {

            $.ajax({
                url: '../../service/updateStock.php',
                data: { updateStockId, updateStockDataFab, updateStockDataVal, updateStockLote, updateStockQuantVacina },
                type: 'POST',
                success: (response) => {

                    const res = JSON.parse(response);

                    if(res.error === true){
                        alert(res.message);
                    }else {
                        alert(res.message);
                        window.location.assign(location);
                    }
                }
            });

        });
    }
        
    static deleteStock(e) {
        e.preventDefault();

        const idDelete = document.getElementById("updateStockId").value;

        $.ajax({
            url: '../../service/vacina.php',
            data: {idDelete},
            type: 'POST',
            success: (retorno) => {
                
                const res = JSON.parse(retorno);
                
                if(res.error === true) {
                    alert(res.message);
                } else {
                    alert(res.message);
                    window.location.assign(location)
                }
            }
        });


    }

}