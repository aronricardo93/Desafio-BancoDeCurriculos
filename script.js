'use strict'


                // Validação do CPF

function validaCPF(cpf) {
    
    if(cpf.length != 11) {
        return false;
    } else {
        var numeros = cpf.substring(0,9);
        var digitos = cpf.substring(9);
        var soma = 0;
        
        for(var i = 10; i > 1; i--) {
            soma += numeros.charAt(10 - i) * i;
        }
        

        //O operador condicional (ternário) é o único operador JavaScript que possui três operandos
        var resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

        //Validacao do primeiro digito
        if(resultado != digitos.charAt(0)) {
            return false;
        }
        soma = 0;
        numeros = cpf.substring(0, 10);

        for(var k = 11; k > 1; k--) {
            soma += numeros.charAt(11 - k) * k;
        }

        resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

        //Validação do segundo digito
        if(resultado != digitos.charAt(1)) {
            return false;
        }
        return true;
    }
}

const limparCpf = (cpf) => {
    document.getElementById('cpf-digitado').value = null;
}

function validacao () {
    var cpf = document.getElementById('cpf_digitado').value;

    var resultadoValidacao = validaCPF(cpf);
    
    if(!resultadoValidacao) {
        document.getElementById("cpf_digitado").value = 'CPF inválido';
       
    } else {
        
    }
}

document.getElementById('cpf_digitado')
        .addEventListener('focusout', validacao);
        

// Dessa forma, verifica-se o cep antes de enviar para a API: se tem 8 número E se só foram digitados números do início ao fim.
const eNumero = (numero) => /^[0-9]+$/.test(numero);
const cepValido = (cep) => cep.length == 8 && eNumero(cep);

const pesquisarCep = async() => {
    limparForm();
    const cep = document.getElementById("cep").value;
    const url = `http://viacep.com.br/ws/${cep}/json/`;
    // método assícrono: fetch(url).then(response => response.json()).then(console.log);
    if(cepValido(cep)) {
    const dados =  await fetch(url);
    const endereco = await dados.json();
    if (endereco.hasOwnProperty('erro')) {
        document.getElementById('logradouro').value = 'CEP não encontrado';
    }else {
        preencherForm(endereco);
    }
} else {
    document.getElementById('logradouro').value = 'CEP incorreto';
}
}

document.getElementById('cep')
        .addEventListener('focusout', pesquisarCep);



