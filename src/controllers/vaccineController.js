const Form = {
    idVaccine: document.getElementById('idVaccine'),
    nameVaccine: document.getElementById('nameVaccine'),
    manufacturerVaccine: document.getElementById('manufacturerVaccine'),
    idMedicine: document.getElementById('idMedicine'),
    dateManufacturer: document.getElementById('dateManufacturer'),
    dateValidity: document.getElementById('dateValidity'),
    batch: document.getElementById('batch'),
    amountVaccine: document.getElementById('amountVaccine'),
    description: document.getElementById('description'),
    category: document.getElementById('category'),
    posto: document.getElementById('posto'),
    
// pegando valores
    getValues(){
        
        return {
            idVaccine: this.idVaccine.value,
            nameVaccine: this.nameVaccine.value,
            manufacturerVaccine: this.manufacturerVaccine.value,
            idMedicine: this.idMedicine.value,
            dateManufacturer: this.dateManufacturer.value,
            dateValidity: this.dateValidity.value,
            batch: this.batch.value,
            amountVaccine: this.amountVaccine.value,
            description: this.description.value,
            category: this.category.value,
            posto: this.posto.value,
            
        }     
    },

    ValidationData(){
        let {amountVaccine, batch, category, dateManufacturer, dateValidity, description, idMedicine, idVaccine, manufacturerVaccine, nameVaccine, posto} = this.getValues();
        

        idVaccine = idVaccine.trim();
        nameVaccine = nameVaccine.trim().toUpperCase();
        idMedicine = idMedicine.trim();
        batch = batch.trim();
        amountVaccine = amountVaccine.trim();



        
        if(idVaccine.length !== 2){
            throw new Error('Codigo da vacina são apenas 2 digitos');
        }

        if(idMedicine.length !== 3){
            throw new Error('Máximo de 3 digitos')
        }



        return{
            idVaccine,
            nameVaccine,
            manufacturerVaccine,
            idMedicine,
            dateManufacturer,
            dateValidity,
            batch,
            amountVaccine,
            description,
            category,
            posto,
       
        }
    },


    




    sendForm(e){
        e.preventDefault();

        try {
            const {amountVaccine, batch, category, dateManufacturer, dateValidity, description, idMedicine, idVaccine, manufacturerVaccine, nameVaccine, posto} = this.ValidationData();

            $.ajax({
                url: '../../service/vaccineService.php',
                data: {amountVaccine, batch, category, dateManufacturer, dateValidity, description, idMedicine, idVaccine, manufacturerVaccine, nameVaccine, posto},
                type: 'POST',
                success: function(response){
                   
                    const res = JSON.parse(response);

                    console.log(res);

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


