  function removerCaracteres() {
    var numeroOriginal = document.getElementById("numeroOriginalcaracteres").value;
    var numeroSemCaracteres = numeroOriginal.replace(/[\.\,\-\/\\_\*\!\'\"\:\#\(\)\;\ ]/g, "");
    document.getElementById("numeroResultadocaracteres").textContent = numeroSemCaracteres;
    document.getElementById("numeroResultadocaracteres").style.display = "block";
    document.getElementById("numeroResultadocaracteres").classList.add("result-containercaracteres"); // Adicionando a classe com a transição
  }

  function copyToClipboard() {
    const infoText = document.getElementById("numeroResultadocaracteres").innerText;
    const tempInput = document.createElement("textarea");
    tempInput.value = infoText;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
  }

  function limparConteudo() {
    document.getElementById("numeroOriginalcaracteres").value = "";
    document.getElementById("numeroResultadocaracteres").textContent = "";
    document.getElementById("numeroResultadocaracteres").style.display = "none";
    document.getElementById("numeroResultadocaracteres").classList.remove("result-containercaracteres"); // Removendo a classe com a transição
  }

  // Definindo eventos para os botões
  document.getElementById("removecaracteres").addEventListener("click", removerCaracteres);
  document.getElementById("copyButtoncaracteres").addEventListener("click", copyToClipboard);
  document.getElementById("limparcaracteres").addEventListener("click", limparConteudo);

  //Estilizar Botões
  const btnCopiar = document.querySelector('.btn-copiarcaracteres');
  const btnLimpar = document.querySelector('.btn-limparcaracteres');
  //copiar
  btnCopiar.addEventListener('click', () => {
    btnCopiar.innerText = 'Copiado ✔';
    setTimeout(() => {
      btnCopiar.innerText = 'Copiar';
    }, 2000);

  copiar();
});
  //remover
  btnGerar.addEventListener('click', () => {
  inputNFCE = inputNFCE.value;

  corrigirNFCE(inputNFCE);

  btnGerar.innerText = 'REMOVIDO ✔';
  setTimeout(() => {
    btnGerar.innerText = 'REMOVER CARACTERES';
  }, 2000);
});

const fecharcaractere = document.getElementById('closeModalcaracteres');
const caracteres = document.getElementById('caracteres');
const HOME = document.getElementById('HOME');

fecharcaractere.addEventListener('click', () => {
  caracteres.style.display = 'none';
  HOME.style.display = 'block';
});