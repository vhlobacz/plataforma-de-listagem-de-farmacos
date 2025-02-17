$(document).ready(function () {
  // the "href" attribute of .modal-trigger must specify the modal ID that   wants to be triggered
  $('.modal-trigger').leanModal();
});

$(document).ready(function () {
  $("#flip").click(function () {
    $("#panel").slideToggle("slow");
  });
});

//FORMULARIO

const form = document.getElementById('form');
const campos = document.querySelectorAll('.required');
const cepRegex = /^\d{2}\d{3}\d{3}$/;

function setError(index) {
  campos[index].style.color = 'red';
}

function removeError(index) {
  campos[index].style.color = 'green';
}

function validarCep() {
  if (campos[0].value.length == 8 && cepRegex.test(campos[0].value)) {
    removeError(0);
  }
  else {
    setError(0);
  }
}



function limpa_formulário_cep() {
  //Limpa valores do formulário de cep.
  document.getElementById('cep').value = ("");
  document.getElementById('rua').value = ("");
  document.getElementById('numero').value = ("");
  document.getElementById('bairro').value = ("");
  document.getElementById('cidade').value = ("");
  document.getElementById('uf').value = ("");
}

function meu_callback(conteudo) {
  if (!("erro" in conteudo)) {
    //Atualiza os campos com os valores.
    document.getElementById('rua').value = (conteudo.logradouro);
    document.getElementById('bairro').value = (conteudo.bairro);
    document.getElementById('cidade').value = (conteudo.localidade);
    document.getElementById('uf').value = (conteudo.uf);
  } //end if.
  else {
    //CEP não Encontrado.
    limpa_formulário_cep();
    alert("CEP não encontrado.");
  }
}

function pesquisacep(valor) {

  //Nova variável "cep" somente com dígitos.
  var cep = valor.replace(/\D/g, '');

  //Verifica se campo cep possui valor informado.
  if (cep != "") {

    //Expressão regular para validar o CEP.
    var validacep = /^[0-9]{8}$/;

    //Valida o formato do CEP.
    if (validacep.test(cep)) {

      //Preenche os campos com "..." enquanto consulta webservice.
      document.getElementById('rua').value = "...";
      document.getElementById('bairro').value = "...";
      document.getElementById('cidade').value = "...";
      document.getElementById('uf').value = "...";


      //Cria um elemento javascript.
      var script = document.createElement('script');

      //Sincroniza com o callback.
      script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';

      //Insere script no documento e carrega o conteúdo.
      document.body.appendChild(script);

    } //end if.
    else {
      //cep é inválido.
      limpa_formulário_cep();
      alert("Formato de CEP inválido.");
    }
  } //end if.
  else {
    //cep sem valor, limpa formulário.
    limpa_formulário_cep();
  }
};


const cadastrarEndereco = function () {
  let enderecos = [];

  if (localStorage.meusEnderecos) {
    enderecos = JSON.parse(localStorage.getItem('meusEnderecos'));
  }
  else {
    localStorage.meusEnderecos = JSON.stringify([]);
  }





  let endereco = {
    cep: document.getElementById('cep').value,
    rua: document.getElementById('rua').value,
    numero: document.getElementById('numero').value,
    bairro: document.getElementById('bairro').value,
    cidade: document.getElementById('cidade').value,
    estado: document.getElementById('uf').value,
    pagamento: document.querySelector('input[name="pagamento"]:checked').value
  }
  limpa_formulário_cep()

  enderecos.push(endereco)

  console.log(localStorage.meusEnderecos);
  localStorage.meusEnderecos = JSON.stringify(enderecos);
  console.log(localStorage.meusEnderecos);

  let listaEnderecosDOM = document.getElementById('listaDeEnderecos');
  let padraoEndereco = document.createElement('div');
  let padraoCep = document.createElement('span');
  padraoCep.innerHTML = endereco.cep;
  padraoEndereco.appendChild(padraoCep);
  listaEnderecosDOM.appendChild(padraoEndereco);
}

$(document).ready(function () {
  $('.modal').modal();
});



