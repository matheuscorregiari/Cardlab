$(document).ready(function(){
    $('#cdposto').load('../../service/vacina.php?dado=posto');
    $('#cdvacina').load('../../service/vacina.php?dado=vacina');
});

$(document).on('click', '#voltar', function() {

    $('#cdposto').load('../../service/vacina.php?dado=posto');
    $('#cdvacina').load('../../service/vacina.php?dado=vacina');
    
});


$(document).on('click', '#searchStock', function(e) {
    e.preventDefault()

    const postValue = $("#cdposto").val();
    const vaccineValue = $("#cdvacina").val();

    $('#newVaccine').load(`../../service/vacina.php?dado=estoque&&posto=${postValue}&&vacina=${vaccineValue}`);
    
});

$(document).on('click', '#deletar', (e) => {
    e.preventDefault();

    const idDelete = $("#updateStockId").val();

    $.ajax({
        url: '../../service/vacina.php',
        data: {idDelete},
        type: 'POST',
        success: (retorno) => {
            
            const res = JSON.parse(retorno);
            console.log(res)
            if(res.error === true) {
                alert(res.message);
            } else {
                alert(res.message);
                window.location.assign(location)
            }
        }
    })
})
