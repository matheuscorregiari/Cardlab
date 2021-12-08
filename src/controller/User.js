
class User {

    constructor() {
    }

    static createUser(e) {
        e.preventDefault();
        console.log('classe')
        let email = document.getElementById('email').value
        let senha = document.getElementById('senha').value
        let telefone = document.getElementById('telefone').value
        let telefone2 = document.getElementById('telefone2').value
        let sexoRadio = document.getElementsByName('sexo')
        let nome = document.getElementById('nome').value
        let endereco = document.getElementById('endereco').value
        let tpsang = document.getElementById('tpsang').value
        let rg = document.getElementById('rg').value
        let cpf = document.getElementById('cpf').value
        let dtnasc = document.getElementById('dtnasc').value
        let posto = document.getElementById('posto').value


        let sexo;

        for (let i = 0; i < sexoRadio.length; i++) {

            if (sexoRadio[i].checked) {
                sexo = sexoRadio[i].value;
            }
        }


        let regex = /^(?=(?=.*?[A-Z]){1})(?=(?=.*?[0-9]){1})(?=(?=.*?[!@#$%*()_+^&}{=;?.]){1})(?!.*\s)[0-9a-zA-Z!@#$%;*(){}_+^&]*$/;

        /*  
      
              if(email === "" || senha === "" || telefone === "" || sexo === "" || nome === "" || endereco === "" || rg === "" || cpf === "" || dtnasc === "") {
      
                  throw new Error ('Faltou preencher algum campo.');
               }
      
              email = email.trim();
              senha = senha.trim();
              telefone = telefone.trim();
              nome = nome.trim().toUpperCase();
              endereco = endereco.trim();
              cidade = cidade.trim();
              rg = rg.trim();
              cpf = cpf.trim();
              
              //verificação da quantidade de caracteres
              if(cpf.length !== 11){
      
                  throw new Error ('Quantidade de caracteres não correspondem ao CPF que são apenas 11');
              }
              
              if(rg.length !== 9){
      
                  throw new Error ('Quantidade de caracteres não correspondem ao rg que são apenas 9');
              }
      
              if(telefone.length > 11 || telefone.length < 10){
      
                  throw new Error ('Quantidade de caracteres não correspondem ao telefone considerando o DDD');
              }
      
              if(senha.length < 7){
      
                  throw new Error ('Quantidade miníma da senha são caracteres 7');
              }else if(!regex.exec(senha)){
                  
                  throw new Error ('Sua senha deve conter 1 letra maiúscula, 1 símbolo, 1 número');
              }
              
             
              //telefone = parseInt(telefone);
              
      
              telefone2 = telefone2 ? telefone2 = null;
              if(telefone2 !== null){
                  
                  if(telefone2.toString().length < 10 || telefone2.toString().length > 11){
                      
                      throw new Error ('Quantidade de caracteres não correspondem ao telefone(opcional) considerando o DDD');
                  
                  }
              }
      
              if(tpsang !== "O+" && tpsang !== "O-" && tpsang !== "A+" && tpsang !== "A-" && tpsang !== "B+" && tpsang !== "AB+" && tpsang !== "AB-" && tpsang !== "B-"
              ){
                  throw new Error('Tipo sanguíneo não existente');
              }
      */



        try {

            //enviando os dados para o PHP para fazer a consulta com o banco
            $.ajax({
                url: '../../service/criarContaService.php',
                data: { email, telefone, cpf, dtnasc, tpsang, endereco, nome, rg, senha, sexo, telefone2, posto },
                type: 'POST',
                success: function (response) {

                    const res = JSON.parse(response);

                    console.log(res)

                    //verificando se o cadastro foi um sucesso caso não por algum motivo entra no if e mostra a mensagem de erro personalizada se não entra no else e seta os dados do usuário na sessão e redireciona o usuário
                    if (res.success == false) {
                        alert(res.message);
                    } else {

                        sessionStorage.setItem('name', res.name);
                        sessionStorage.setItem('accessLevel', res.accessLevel);
                        sessionStorage.setItem('id', res.id);
                        sessionStorage.setItem('cdPosto', res.cdPosto);

                        alert(res.message);
                        window.location.href = '../Home/';
                    }
                }
            });

        } catch (error) {
            alert(error.message)
        }

    }

    static login(e) {
        e.preventDefault();

        let cpf = document.getElementById('cpf').value
        let senha = document.getElementById('senha').value

        //eliminando espaços nas pontas
        cpf = cpf.trim();
        senha = senha.trim();

        /*Validação do cpf
        if(cpf.length != 11 || cpf === ""){
            throw new Error('Cpf são 11 digitos ou você não preencheu o campo');
        }

        //Validação da senha
        if(senha === "" || senha.length < 7){
            throw new Error('O campo senha é obrigatório, e tem que ter no minimo 7 digitos');
        }*/

        try {

            //enviando os dados para o PHP para fazer a consulta com o banco
            $.ajax({
                url: '../../service/login.php',
                data: { cpf, senha },
                type: 'POST',
                success: function (retorno) {
                    let res = JSON.parse(retorno);

                    //verificar aconsistencia do login, caso os dados não sejam compativeis com os do banco entra nesse if e retorna um alert com a mensagem de erro pro usuário se não seta os dados em uma sessão e manda o paciente para a página home e o adm para a página adm
                    if (res.error === true) {
                        alert(res.msg);
                    } else {

                        sessionStorage.setItem('name', res.name);
                        sessionStorage.setItem('accessLevel', res.accessLevel);
                        sessionStorage.setItem('id', res.id);
                        sessionStorage.setItem('cdPosto', res.cdPosto);

                        if (res.accessLevel >= 1) {
                            window.location.href = '../Adm/';
                            return;
                        }

                        window.location.href = '../Home/';
                    }
                }
            })
        } catch (error) {
            alert(error.message);
        }
    }

    static searchUserToAuthenticate(e) {
        e.preventDefault();

        let cpf = document.getElementById('searchCpf').value
        let table = document.getElementById('table')


        cpf = cpf.trim();

        try {

            let tbody = document.createElement('tbody')

            $.ajax({
                url: '../../service/validationVaccineService.php',
                data: { cpf },
                type: 'POST',
                success: function (response) {
                    const res = JSON.parse(response)

                    if (res.error === true) {
                        alert(res.message);
                    } else {

                        res.data.map(info => {
                            tbody.innerHTML += `
                                <tr class="selection" id="${info.CDCARTEIRA}">
                                    <td class="idVaccineValidation" >${info.CDCARTEIRA}</td>
                                    <td class="nameVaccineValidation">${info.NMVACINA}</td>
                                    <td>${info.FABRICANTE}</td>
                                    <td>${info.DT_VAC_APLIC}</td>
                                    <td>${info.DT_PROX_DOSE}</td>
                                    <td class="postoBaixa">${info.NMPOSTO}</td>
                                    <td>${info.TEXTVAC}</td>
                                </tr>
                                `;
                        });

                    }
                }
            });

            table.appendChild(tbody);

        } catch (error) {
            alert(error.message)
        }

    }

    //agendar vacina
    static scheduleVaccine(e) {
        e.preventDefault();

        let vaccine = document.getElementById('vacina').value
        let date = document.getElementById('date').value



        try {
            const userId = sessionStorage.getItem('id');
            const posto = sessionStorage.getItem('cdPosto');


            function calculeteDate() {
                const data = new Date(date);

                let dia = String(data.getDate() + 1).padStart(2, '0');
                let mes = String(data.getMonth() + 4).padStart(2, '0');
                let ano = data.getFullYear();


                if (mes > 12) {

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
                success: function (response) {
                    let res = JSON.parse(response);
                    if (res.error === true) {
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

    //mostrar carteira
    static showWallet() {
       let table= document.getElementById('table');
       const tbody = document.createElement('tbody');

       const cdPosto = sessionStorage.getItem('cdPosto');
       const userId = sessionStorage.getItem('id');
       
       $.ajax({
           url: '../../service/mostrarCarteiraService.php',
           data: { cdPosto, userId },
           type: 'GET',
           success: function(response) {
               
              let userData = JSON.parse(response);


               if(userData.error === true) {
                  alert(userData.message);
                  window.location.assign('../Home/');
               } else {
                   userData.data.map(info => {
                       tbody.innerHTML += `
                           <tr>
                               <td>${info.CDCARTEIRA}</td>
                               <td>${info.NMVACINA}</td>
                               <td>${info.FABRICANTE}</td>
                               <td>${info.DT_VAC_APLIC}</td>
                               <td>${info.DT_PROX_DOSE}</td>
                               <td>${info.NMPOSTO}</td>
                               <td>${info.TEXTVAC}</td>
                           <tr>
                           `;
                   });
               }
           }
       })
      
       table.appendChild(tbody);
    }
}