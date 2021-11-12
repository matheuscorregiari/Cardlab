const Form = { 
	//propriedade vinculada ao elemento html
	cpf: document.getElementById('cpf'),
	senha: document.getElementById('senha'),

	//retor
	getValues(){
		return{
			cpf: this.cpf.value,
			senha: this.senha.value,
		}
	},

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

	autlogin(event){
		event.preventDefault();
	
		try {
			const { cpf, senha } = this.validation();
			
			$.ajax({
				url: '../../service/login.php',
				data: {cpf, senha},
				type: 'POST',
				success: function(retorno){

					let res =JSON.parse(retorno);
					if(res.error === true){
						alert(res.msg);
					}else{
						
						sessionStorage.setItem('name', res.name);
						sessionStorage.setItem('accessLevel', res.accessLevel);
						sessionStorage.setItem('id', res.id);
						sessionStorage.setItem('cdPosto', res.cdPosto);
						
						window.location.href = '../Home/';
					}
				}
			})			
		} catch (error) {
			alert(error.message);
		}
	}
}