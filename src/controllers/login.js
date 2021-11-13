const Form = { 
	//propriedade vinculada ao elemento html
	cpf: document.getElementById('cpf'),
	senha: document.getElementById('senha'),

	//método que pega o valor dos input
	getValues(){
		return{
			cpf: this.cpf.value,
			senha: this.senha.value,
		}
	},

	//metodo que valida as informações
	validation(){
		let { cpf, senha } = this.getValues();

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

		return{
			cpf,
			senha
		}
	},

	//método que é chamado quando o formulário é enviado
	autlogin(event){
		event.preventDefault();
	
		try {
			//chamando uma sequencia de métodos que vai desde pegar os valores até a realização da validação
			const { cpf, senha } = this.validation();
			
			//enviando os dados para o PHP para fazer a consulta com o banco
			$.ajax({
				url: '../../service/login.php',
				data: {cpf, senha},
				type: 'POST',
				success: function(retorno){

					let res =JSON.parse(retorno);

					//verificar aconsistencia do login, caso os dados não sejam compativeis com os do banco entra nesse if e retorna um alert com a mensagem de erro pro usuário se não seta os dados em uma sessão e manda o paciente para a página home e o adm para a página adm
					if(res.error === true){
						alert(res.msg);
					}else{
						
						sessionStorage.setItem('name', res.name);
						sessionStorage.setItem('accessLevel', res.accessLevel);
						sessionStorage.setItem('id', res.id);
						sessionStorage.setItem('cdPosto', res.cdPosto);
						
						if(res.accessLevel >= 1){
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
}