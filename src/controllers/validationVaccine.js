let callBack = 0;

const ValidationVaccine = {
    cpf : document.getElementById('searchCpf'),
    table: document.getElementById('table'),

    getCpf(){       
        return{
            cpf : this.cpf.value
        }
    },

    validation(){
        let {cpf} = this.getCpf();

        cpf = cpf.trim();

        return{
            cpf
        }
    },

    sendData(e){
        e.preventDefault();

        try {
            let {cpf} = this.validation();

            let tbody = document.createElement('tbody')

            $.ajax({
                url: '../../service/validationVaccineService.php',
                data: {cpf},
                type: 'POST',
                success:function(response){
                    const res=JSON.parse(response)
                    
                    if(res.error === true) {
                        alert(res.message);
                    }else {
                   
                        res.data.map(info => {
                            tbody.innerHTML += `
                            <tr class="selection" id="${info.CDCARTEIRA}">
                                <td class="idVaccineValidation" >${info.CDCARTEIRA}</td>
                                <td class="nameVaccineValidation">${info.NMVACINA}</td>
                                <td>${info.FABRICANTE}</td>
                                <td>${info.DT_VAC_APLIC}</td>
                                <td>${info.DT_PROX_DOSE}</td>
                                <td>${info.NMPOSTO}</td>
                                <td>${info.TEXTVAC}</td>
                            </tr>
                            `;
                        });

                        callBack++;
                    }
                }
            });

            this.table.appendChild(tbody);

        } catch (error) {
            alert(error.message)
        }
    }
}

$(document).on('click', '#btnVallidation', function () {
    let id = document.querySelectorAll('.idVaccineValidation');
    let name = document.querySelectorAll('.nameVaccineValidation');
    let row = document.querySelectorAll('.selection');

    let idResult = [];
    let nameResult = [];
    
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

    
    function validation(idForTest = [], nameForTest = []){
        let idForValidation = idForTest;
        let nameForValidation = nameForTest;

        if(idForValidation.length === 0 || nameForValidation.length === 0) {
            throw new Error('Busque por um cpf antes de dar baixa!')
        }

        return { idForValidation, nameForValidation };
    }

    function sendForm(){
        try {
            const { idForValidation, nameForValidation } = validation(idResult, nameResult);
            
            $.ajax({
                url: '../../service/validationVaccineService.php',
                data: { idForValidation, nameForValidation },
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

    sendForm();
  
});