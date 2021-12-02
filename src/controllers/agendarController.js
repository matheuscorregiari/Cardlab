

const FORM = {
    //post: document.getElementById('posto'),
    vaccine: document.getElementById('vacina'),
    date: document.getElementById('date'),

    getValues() {

        return {
          //  post: this.post.value,
            vaccine: this.vaccine.value,
            date: this.date.value
        }
    },

    sendingForm(e){
        e.preventDefault();

        try {
            const userId = sessionStorage.getItem('id');
            const posto = sessionStorage.getItem('cdPosto');
            
            const { date,vaccine} = this.getValues();
            
            function calculeteDate() {
                const data = new Date(date);
            
                    let dia = String(data.getDate()+1).padStart(2, '0');
                    let mes = String(data.getMonth() + 4).padStart(2, '0');
                    let ano = data.getFullYear();


                if(mes > 12){

                    switch (mes) {
                        case '13':
                            mes = '01';
                            break;
                        case '14':
                            mes = '02';
                            break;
                        case '15':
                            mes = '03';
                            break;
                        default:
                            break;
                    }
                    ano++;
                }
                let dataAtual = `${ano}-${mes}-${dia}`;

                return dataAtual;
            }

            const dateNextDose = calculeteDate();


            $.ajax({
                url: '../../service/agendarService.php',
                data: { date, vaccine, userId, posto, dateNextDose },
                type: 'POST',
                success: function(response) {
                    let res = JSON.parse(response);
                    if(res.error === true){
                        alert(res.message);
                    } else {
                        alert(res.message);
                        window.location.assign('../Home/');
                    }
                }
            });
        } catch (error) {
            alert(error.message);
        }
    }


}