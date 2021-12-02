$(document).ready(function(){

    $('#cdposto').load('../../service/vacina.php?dado=posto');
    $('#cdvacina').load('../../service/vacina.php?dado=vacina');
});


$(document).on('change', '#cdposto', function() {

    const postValue = $(this).val();
    const vaccineName = $("#cdvacina").val();
    console.log(postValue)
    console.log(vaccineName)
    $('#newVaccine').load(`../../service/vacina.php?dado=estoque&&posto=${postValue}&&vacina=${vaccineName}`);
    
});

$(document).on('change', '#cdvacina', function() {

    const vaccineName = $(this).val();
    const postValue = $("#cdposto").val();
    console.log('posto: ', postValue)
    console.log('vacina: ', vaccineName)
    $('#newVaccine').load(`../../service/vacina.php?dado=estoque&&vacina=${vaccineName}&&posto=${postValue}`);
    
});


