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
            descripition: this.description.value,
            category: this.category.value,
            posto: this.posto.value,
            
        }     
    },

    ValidationData(){
        const {amountVaccine, batch, category, dateManufacturer, dateValidity, descripition, idMedicine, idVaccine, manufacturerVaccine, nameVaccine, posto} = this.getValues();
        
        return{
            idVaccine,
            nameVaccine,
            manufacturerVaccine,
            idMedicine,
            dateManufacturer,
            dateValidity,
            batch,
            amountVaccine,
            descripition,
            category,
            posto,
        }
    },

    sendForm(e){
        e.preventDefault();

        try {
            const {amountVaccine, batch, category, dateManufacturer, dateValidity, descripition, idMedicine, idVaccine, manufacturerVaccine, nameVaccine, posto} = this.ValidationData();

            $.ajax({
                url: '../../service/vaccineService.php',
                data: {amountVaccine, batch, category, dateManufacturer, dateValidity, descripition, idMedicine, idVaccine, manufacturerVaccine, nameVaccine, posto},
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

