$(document).ready(function(){
    $('#cdposto').load('../../service/vacina.php?dado=posto');
    $('#cdvacina').load('../../service/vacina.php?dado=vacina');
    $("#vaccine").load('../../service/cadastrarEstoque.php?loadVaccineStock=true')
});

//volta da pesquisa do estoque
$(document).on('click', '#voltar', function() {
    $('#cdposto').load('../../service/vacina.php?dado=posto');
    $('#cdvacina').load('../../service/vacina.php?dado=vacina');
});


$(document).on('click', '#searchStock', function(e) {
    e.preventDefault()

    const postValue = $("#cdposto").val();
    const vaccineValue = $("#cdvacina").val();

    console.log(postValue)
    console.log(vaccineValue)
    $('#newVaccine').load(`../../service/vacina.php?dado=estoque&&posto=${postValue}&&vacina=${vaccineValue}`);
});

function openSidebar(){
    document.getElementById("mySidebar").style.display="block";
}

function closeSidebar(){
    document.getElementById("mySidebar").style.display="none";
}
