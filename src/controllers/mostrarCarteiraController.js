
const TABLE = {
    table: document.getElementById('body'),

    innerHTML() {
        const tr = document.createElement('tr');



        const cdPosto = sessionStorage.getItem('cdPosto');
        
        $.ajax({
            url: '../../service/mostrarCarteiraService.php',
            data: { cdPosto},
            type: 'GET',
            success: function(response) {
               let userData = JSON.parse(response);

               tr.innerHTML = `
                <td>${userData.cd}</td>
                <td>${userData.nomeVacina}</td>
                <td>${userData.fabricante}</td>
                <td>${userData.dataAplicacao}</td>
                <td>${userData.dataProximaAplicacao}</td>
                <td>${userData.nmPosto}</td>
                <td>APLICACAO EM DUAS DOSES, SENDO A SEGUNDA ENTRE 14 E 62 DIAS.</td>
                `;
            }
        })
       
        this.table.appendChild(tr);
    }
}


addEventListener('load', () =>  { 
    TABLE.innerHTML()
});