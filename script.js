const result = document.getElementById("result");
const erroDiv = document.getElementById("erro");
const submitButton = document.getElementById("submit");

submitButton.onclick = function (event) {
  event.preventDefault();

  erroDiv.style.display = "none";
  result.style.display = "none";

  let cep = document.getElementById("cep").value;
  if (vetifyCep(cep)) callApi(cep);
};

function vetifyCep(cep) {
  cep = cep.replace("-", "");
  if (cep.length !== 8 || isNaN(cep)) {
    showError("Por favor, insira um CEP no formato 12345678 ou 12345-678");
    return false;
  }
  return true;
}

function callApi(cep) {
  fetch(`https://viacep.com.br/ws/${cep}/json/`, { mode: "cors" })
    .then((res) => res.json())
    .then((data) => {
      if (data.erro) showError("CEP não encontrado.");
      else showResult(data);
    })
    .catch((err) => {
      showError("Erro ao consultar o CEP.");
    });
}

function showResult(data) {
  erroDiv.style.display = "none";
  document.getElementById("street").innerText =
    (data.logradouro || "N/A") + ", ";
  document.getElementById("complement").innerText =
    (data.complemento || "N/A") + ", ";
  document.getElementById("neighborhood").innerText =
    (data.bairro || "N/A") + ", ";
  document.getElementById("locale").innerText = data.localidade + ", ";
  document.getElementById("uf").innerText = data.uf + " - ";
  document.getElementById("cepText").innerText = data.cep;
  result.style.display = "block";
}

function showError(mensagem) {
  erroDiv.innerText = mensagem;
  erroDiv.style.display = "block";
  result.style.display = "none";
}
