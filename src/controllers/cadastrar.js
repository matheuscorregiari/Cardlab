//construção do objeto
const Form = {
    //propriedade vinculada ao elemento html
    email: document.getElementById('email'),
    senha: document.getElementById('senha'),
    telefone: document.getElementById('telefone'),
    telefone2: document.getElementById('telefone2'),
    sexo: document.getElementsByName('sexo'),
    nome: document.getElementById('nome'),
    endereco: document.getElementById('endereco'),
    tpsang: document.getElementById('tpsang'),
    rg: document.getElementById('rg'),
    cpf: document.getElementById('cpf'),
    dtnasc: document.getElementById('dtnasc'),
    posto: document.getElementById('posto'),


    //método de captura dos valores do formulário
    getValor() {

        //for para captura do valor da array sexo
        let check;

        for (let i = 0; i < this.sexo.length; i++) {

            if (this.sexo[i].checked) {
                check = this.sexo[i];
            }
        }


        //retorno dos valores do objeto
        return {
            email: this.email.value,
            senha: this.senha.value,
            telefone: this.telefone.value,
            telefone2: this.telefone2.value | null,
            sexo: check.value,
            nome: this.nome.value,
            endereco: this.endereco.value,
            tpsang: this.tpsang.value,
            rg: this.rg.value,
            cpf: this.cpf.value,
            dtnasc: this.dtnasc.value,
            posto: this.posto.value
        }
    },

    //método de validação do formulário
    valid() {

        let { email, senha, telefone, telefone2, sexo, nome, endereco, tpsang, rg, cpf, dtnasc, posto } = this.getValor();

        let regex = /^(?=(?:.*?[A-Z]){1})(?=(?:.*?[0-9]){1})(?=(?:.*?[!@#$%*()_+^&}{:;?.]){1})(?!.*\s)[0-9a-zA-Z!@#$%;*(){}_+^&]*$/;

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
              
      
              telefone2 = telefone2 ? telefone2 : null;
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


        //criando objeto para retornar dados validados
        return {
            email,
            senha,
            telefone,
            telefone2,
            sexo,
            nome,
            endereco,
            rg,
            cpf,
            tpsang,
            dtnasc,
            posto
        }
    },


    //método de recebimento dos dados do formulário
    received(event) {

        //impede que atualiza a pag até ao enviar do form
        event.preventDefault();
        console.log('a')

        try {
            //chamando uma sequencia de métodos que vai desde pegar os valores até a realização da validação
            const { cpf, dtnasc, tpsang, email, endereco, nome, rg, senha, sexo, telefone, telefone2, posto } = this.valid();

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
}


