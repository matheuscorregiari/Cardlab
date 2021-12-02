const CheckVaccine = {
    name: document.getElementById('searchVaccine'),

    getValue() {
        return { name: this.name.value }
    },

    validation() {
        let { name } = this.getValue();
       

        return { name }
    },

    sendForm(e) {
        e.preventDefault();

        try {
            const { name } = this.validation();

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

        } catch (error) {
            alert(error.message);
        }
    }
}

const CheckStock = {
    id: document.getElementById('searchIdVaccine'),

    getValue() {
        return { id: this.id.value }
    },

    validation() {
        let { id } = this.getValue();

        id = parseInt(id);

        return { id }
    },

    sendForm(e) {
        e.preventDefault();

        try {
            const { id } = this.validation();

            $.ajax({
                url: '../../service/updateStockVaccineService.php',
                data: { id },
                type: 'GET',
                success: function(response)  {
                    let res = JSON.parse(response);

                    if(res.error === true){
                        alert(res.message);
                    }else {
                        document.getElementById('updateStockcdMedicamento').setAttribute('value', res.cdMedicamento);
                        document.getElementById('updateStockCodPosto').setAttribute('value', res.cdPosto);
                        document.getElementById('updateStockCodVacina').setAttribute('value', res.cdVaccine);
                        document.getElementById('updateStockDataFab').setAttribute('value', res.dtFabricacao);
                        document.getElementById('updateStockDataVal').setAttribute('value', res.dtValidade);
                        document.getElementById('updateStockLote').setAttribute('value',  res.lote);
                        document.getElementById('updateStockQuantVacina').setAttribute('value', res.qntVac);
                        document.getElementById('updateStockDescricao').setAttribute('value', res.description);
                        document.getElementById('updateStockCategoria').setAttribute('value', res.category);

                        document.getElementById('uploadStock').classList.add('active');
                    }
                }
            });

            
        } catch (error) {
            alert(error.message);
        }
    }
}

const UpdateStock = {
    updateStockcdMedicamento: document.getElementById('updateStockcdMedicamento'),
    updateStockDataFab: document.getElementById('updateStockDataFab'),
    updateStockDataVal: document.getElementById('updateStockDataVal'),
    updateStockLote: document.getElementById('updateStockLote'),
    updateStockCategoria: document.getElementById('updateStockCategoria'),
    updateStockQuantVacina: document.getElementById('updateStockQuantVacina'),
    updateStockDescricao: document.getElementById('updateStockDescricao'),

    getValues(){
    
        return {
            updateStockcdMedicamento: this.updateStockcdMedicamento.value,
            updateStockDataFab: this.updateStockDataFab.value,
            updateStockDataVal: this.updateStockDataVal.value,
            updateStockLote: this.updateStockLote.value,
            updateStockCategoria: this.updateStockCategoria.value,
            updateStockQuantVacina: this.updateStockQuantVacina.value,
            updateStockDescricao: this.updateStockDescricao.value
        }
    },

    validation(){
        let { updateStockCategoria, updateStockDataFab, updateStockDataVal, updateStockDescricao, updateStockLote, updateStockQuantVacina, updateStockcdMedicamento } = this.getValues();

        return {
            updateStockCategoria, 
            updateStockDataFab, 
            updateStockDataVal, 
            updateStockDescricao, 
            updateStockLote, 
            updateStockQuantVacina, 
            updateStockcdMedicamento
        }
    },

    sendForm(e){
        e.preventDefault();

        try {
            let { updateStockCategoria, updateStockDataFab, updateStockDataVal, updateStockDescricao, updateStockLote, updateStockQuantVacina, updateStockcdMedicamento } = this.validation();

            $.ajax({
                url: '../../service/updateStockVaccineService.php',
                data: { updateStockCategoria, updateStockDataFab, updateStockDataVal, updateStockDescricao, updateStockLote, updateStockQuantVacina, updateStockcdMedicamento },
                type: 'POST',
                success: function(response) {
                    let res = JSON.parse(response);

                    if(res.error === true){
                        alert(res.message);
                
                    }else {
                        alert(res.message);
                        window.location.assign('../Adm/');
                    }
                }
            });
        } catch (error) {
            alert(error.message);
        }
    }
}

const UpdateVaccine = {
    nameVaccineSearch: document.getElementById('nameVaccineSearch'),
    manufacturerVaccineSearch: document.getElementById('manufacturerVaccineSearch'),
    idVaccineSearch: document.getElementById('idVaccineSearch'),

    getValues() {

        return {
            idVaccineSearch: this.idVaccineSearch.value,
            nameVaccineSearch: this.nameVaccineSearch.value,
            manufacturerVaccineSearch: this.manufacturerVaccineSearch.value
        }
    },

    validation() {
        let { idVaccineSearch, manufacturerVaccineSearch, nameVaccineSearch } = this.getValues();

        return { idVaccineSearch, manufacturerVaccineSearch, nameVaccineSearch }
    },

    sendForm(e) {
        e.preventDefault();

        try {
            let { idVaccineSearch, manufacturerVaccineSearch, nameVaccineSearch } = this.validation();

            $.ajax({
                url: '../../service/updateVaccineService.php',
                data: { idVaccineSearch, manufacturerVaccineSearch, nameVaccineSearch },
                type: 'POST',
                success: (response) => {
                    let res = JSON.parse(response);

                    if(res.error === true){
                        alert(res.message);
                    }else {
                        alert(res.message);
                        window.location.assign('../Adm/');
                    }
                }
            });

        } catch (error) {
            alert(error.message);
        }
    }
}