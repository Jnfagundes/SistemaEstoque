//Criação do objeto que recebe o usiario e a senha
const usuarioLogin ={
    username: "djrc",
    password:"1234"
};

//função para fazer o login
function login(){
    const username = document.getElementById("usuario").value;
    const password = document.getElementById("senha").value;

    //Analisando o usuário e a senha digitada
    if (username === usuarioLogin.username && password === usuarioLogin.password){
        document.getElementById('telaLogin').style.display = "none";
        document.getElementById('consultas').style.display = "block";
    }
    else{
        alert("Usuário ou senha incorretos.");
    }
};

//função para cadastrar produtos
function cadastrar(){

}

