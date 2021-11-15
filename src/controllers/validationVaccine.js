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
                data: cpf,
                type: 'POST',
                success:function(response){
                    const res=JSON.parse(response)
                    console.log(res);
                }

            })

        } catch (error) {
            alert(error.message)
        }
    }
}