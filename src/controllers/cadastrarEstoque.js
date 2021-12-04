
$(document).ready(() => {
    $("#vaccine").load('../../service/cadastrarEstoque.php?loadVaccineStock=true')
});

const Estoque = {
    dtFab: document.getElementById('dtFab'),
    dtVal: document.getElementById('dtVal'),
    lote: document.getElementById('lote'),
    qntVac: document.getElementById('qntVac'),
    posto: document.getElementById('posto'),
    vaccine: document.getElementById('vaccine'),

    getValues(){
        return{
            dtFab: this.dtFab.value,
            dtVal: this.dtVal.value,
            lote: this.lote.value,
            qntVac: this.qntVac.value,
            posto: this.posto.value,
            vaccine: this.vaccine.value,
        }
    },

    validationData(){
        let {dtFab, dtVal, lote, qntVac, posto, vaccine} = this.getValues();

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

            return{
                dtFab,
                dtVal,
                lote,
                qntVac,
                posto,
                vaccine,
            }
            
        },

        sendForm1(e){
            e.preventDefault();
        
        try {
            const {dtFab, dtVal, lote, qntVac, posto, vaccine} = this.validationData();

           

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
}

