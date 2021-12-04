const Form = {
    nameVaccine: document.getElementById('nameVaccine'),
    manufacturerVaccine: document.getElementById('manufacturerVaccine'),
    textVac: document.getElementById('textVac'),
    category: document.getElementById('category'),
    
// pegando valores
    getValues(){
        
        return {
            nameVaccine: this.nameVaccine.value,
            manufacturerVaccine: this.manufacturerVaccine.value,
            textVac: this.textVac.value,
            category: this.category.value,
        }     
    },

    ValidationData(){
        let {manufacturerVaccine, nameVaccine, textVac, category} = this.getValues();
        

        nameVaccine = nameVaccine.trim().toUpperCase();


        return{
            nameVaccine,
            manufacturerVaccine,
            textVac,
            category,
        }
    },

    sendForm(e){
        e.preventDefault();

        try {
            const {manufacturerVaccine, nameVaccine, textVac, category} = this.ValidationData();

            $.ajax({
                url: '../../service/vaccineService.php',
                data: {manufacturerVaccine, nameVaccine, textVac, category},
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


