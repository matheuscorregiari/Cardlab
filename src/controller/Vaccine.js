
class Vaccine {

    constructor() {}


    static createVaccine(e) {
        e.preventDefault();

        let nameVaccine = document.getElementById('nameVaccine').value;
        let manufacturerVaccine = document.getElementById('manufacturerVaccine').value;
        let textVac = document.getElementById('textVac').value;
        let category = document.getElementById('category').value;

        nameVaccine = nameVaccine.trim().toUpperCase()

        try {

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
                        window.location.assign(location);
                    }
                }
            
            })
        } catch (error) {
            alert(error.message)
        }
    }

    static searchVaccine(e) {
        e.preventDefault();

        let name = document.getElementById('searchVaccine').value;

        name = name.trim().toUpperCase();

        $.ajax({
            url: '../../service/updateVaccineService.php',
            data: { name },
            type: 'GET',
            success: function(response)  {
                let res = JSON.parse(response);

                if(res.error === true){
                    alert(res.message);
                }else {

                    document.getElementById('idVaccineSearch').setAttribute('value', res.id);
                    document.getElementById('nameVaccineSearch').setAttribute('value', res.name);
                    document.getElementById('manufacturerVaccineSearch').setAttribute('value', res.manufacture);

                    document.getElementById('updateVaccine').classList.add('active');

                }
            }
        });
    }

    //dar baixa
    static cancelVaccine() {
        let id = document.querySelectorAll('.idVaccineValidation');
        let name = document.querySelectorAll('.nameVaccineValidation');
        let row = document.querySelectorAll('.selection');
        let posto =document.querySelectorAll(".postoBaixa");
      
        let idResult = [];
        let nameResult = [];
        let postResult = [];
        
        let count = 0;
    
        for(let value of id.values()){
    
            if(row[count].classList.contains('active')){
                idResult.push(value.innerHTML);
            }
    
            count++;
        }
    
        count = 0;
    
        for(let value of name.values()){
    
            if(row[count].classList.contains('active')){
                nameResult.push(value.innerHTML);
            }
         
            count++;
        }
    
        count = 0;
    
        for(let value of posto.values()){
            if(row[count].classList.contains('active')) {
                postResult.push(value.innerHTML);
            }
    
            count++;
        }
        
        function validation(idForTest = [], nameForTest = [], postoForTest = []){
            let idForValidation = idForTest;
            let nameForValidation = nameForTest;
            let postoForValidation = postoForTest;
    
            if(idForValidation.length === 0 || nameForValidation.length === 0 || postoForValidation.length === 0 ) {
                throw new Error('Busque por um cpf antes de dar baixa!')
            }
    
            return { idForValidation, nameForValidation, postoForValidation };
        }
    
            try {
                const { idForValidation, nameForValidation, postoForValidation } = validation(idResult, nameResult, postResult);
            
    
                $.ajax({
                    url: '../../service/validationVaccineService.php',
                    data: { idForValidation, nameForValidation, postoForValidation },
                    type: 'POST',
                    success: function(response) {
                        let res = JSON.parse(response);
                        
                        if(res.errorStock === true){
                            alert(res.messageStock);
                        } else if (res.errorRegister === true){
                            alert(res.messageRegister);
                        } else {
                            alert('Baixa de vacina feita com sucesso');
                            window.location.assign('../Adm/');
                        }
                    }
                });
    
    
            } catch (error) {
                alert(error.message);
            }
        
    
    }

    
}

