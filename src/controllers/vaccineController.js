const Form = {
    idVaccine: document.getElementById('idVaccine'),
    nameVaccine: document.getElementById('nameVaccine'),
    manufacturerVaccine: document.getElementById('manufacturerVaccine'),
    
// pegando valores
    getValues(){
        
        return {
            idVaccine: this.idVaccine.value,
            nameVaccine: this.nameVaccine.value,
            manufacturerVaccine: this.manufacturerVaccine.value,
        }     
    },

    ValidationData(){
        let {idVaccine, manufacturerVaccine, nameVaccine} = this.getValues();
        

        idVaccine = idVaccine.trim();
        nameVaccine = nameVaccine.trim().toUpperCase();

        /*if(idVaccine.length !== 2){
            throw new Error('Codigo da vacina são apenas 2 digitos');
        }

        if(idMedicine.length !== 3){
            throw new Error('Máximo de 3 digitos')
        }*/

        return{
            idVaccine,
            nameVaccine,
            manufacturerVaccine,
           
        }
    },

    sendForm(e){
        e.preventDefault();

        try {
            const {idVaccine, manufacturerVaccine, nameVaccine} = this.ValidationData();

            $.ajax({
                url: '../../service/vaccineService.php',
                data: {idVaccine, manufacturerVaccine, nameVaccine},
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


