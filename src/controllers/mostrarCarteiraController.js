
const TABLE = {
    //relaciona a propriedade table com a tag table do html
    table: document.getElementById('table'),

    //executa um metodo que coloca as informações na tabela
    innerHTML() {
        //cria um elemento tbody e armazena na variavel tbody
        const tbody = document.createElement('tbody');

        const cdPosto = sessionStorage.getItem('cdPosto');
        const userId = sessionStorage.getItem('id');
        
        $.ajax({
            url: '../../service/mostrarCarteiraService.php',
            data: { cdPosto, userId },
            type: 'GET',
            success: function(response) {
                
               let userData = JSON.parse(response);

               console.log(userData)

               userData.map(info => {
                tbody.innerHTML += `
                    <tr>
                        <td>${info.CDCARTEIRA}</td>
                        <td>${info.NMVACINA}</td>
                        <td>${info.FABRICANTE}</td>
                        <td>${info.DT_VAC_APLIC}</td>
                        <td>${info.DT_PROX_DOSE}</td>
                        <td>${info.NMPOSTO}</td>
                        <td>APLICACAO EM DUAS DOSES, SENDO A SEGUNDA ENTRE 14 E 62 DIAS.</td>
                    <tr>
                    `;
               })
            }
        })
       
        this.table.appendChild(tbody);
    }
}


addEventListener('load', () =>  { 
    TABLE.innerHTML()
});