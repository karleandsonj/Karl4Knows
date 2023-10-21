const meuFormulario = document.getElementById('meu-formulario');
const camposDeTexto = meuFormulario.querySelectorAll('input');

// Adiciona event listeners para o evento "keydown" nos campos de texto
camposDeTexto.forEach(function (campo) {
    campo.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Impede o comportamento padrão (envio do formulário)
        }
    });
});


//adicionado para inserir caracter § sempre que tiver uma quebra de linha nos textarea
document.getElementById('submit').addEventListener('click', function () {
    console.log('Botão "Enviar" clicado.');
    const textarea1 = document.getElementById('texto-1');
    const textarea2 = document.getElementById('texto-2');
    const textarea3 = document.getElementById('texto-3');
    const text1 = textarea1.value;
    const text2 = textarea2.value;
    const text3 = textarea3.value;
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    const lines3 = text3.split('\n');
    const formattedText1 = lines1.join('§');
    const formattedText2 = lines2.join('§');
    const formattedText3 = lines3.join('§');
    textarea1.value = formattedText1;
    textarea2.value = formattedText2;
    textarea3.value = formattedText3;
    /* 
        function addAsteriskToText(textarea) {
            textarea.value = '*' + textarea.value;
        }
    
        // Chama a função para cada área de texto
        addAsteriskToText(textarea1);
        addAsteriskToText(textarea2); */

});

/* FORM ABRIR CORRIGIR NO HIDDEN DO CSS O DISPLAY DEPOIS */
const openFormButton = document.getElementById('openForm');
const envioForm = document.getElementById('envioForm');
const openAnexo = document.getElementById('openAnexo');
const openErro = document.getElementById('openErro');
const AbrirAnexo = document.getElementById('form_anexo');
const AbrirErro = document.getElementById('form_erro');
const desfoque = document.getElementById('desfoque');
const closeModalButtonForm1 = document.getElementById('closeModalForm');

const senhaContainer = document.getElementById('senhaContainer');
const senhaInput = document.getElementById('senhaInput');
const verificarSenhaButton = document.getElementById('verificarSenha');
const butcard = document.getElementById('but_card');
const butalert = document.getElementById('but_alert');

// Defina a senha válida
const senhaValida = '123';

// Função para abrir o campo de senha
function abrirSenhaContainer() {
    senhaContainer.style.display = 'block';
    butcard.style.display = 'none';
    butalert.style.display = 'none';

    // Adicione um ouvinte de evento ao documento para fechar o módulo de senha ao clicar fora dele
    document.addEventListener('click', fecharSenhaContainerAoClicarFora);

    // Foque no campo de senha (assumindo que você tenha um campo de senha)
    const campoSenha = document.getElementById('senhaInput'); // Substitua 'campoSenha' pelo ID do seu campo de senha
    if (campoSenha) {
        campoSenha.focus();
    }
}


// Função para fechar o campo de senha
function fecharSenhaContainer() {
    senhaContainer.style.display = 'none';
    butcard.style.display = '';
    butalert.style.display = '';

    // Remova o ouvinte de evento do documento
    document.removeEventListener('click', fecharSenhaContainerAoClicarFora);
}

// Função para verificar a senha
function verificarSenha() {
    const senhaInserida = senhaInput.value;

    if (senhaInserida === senhaValida) {
        // Senha correta, execute o código desejado
        envioForm.style.display = 'block';
        AbrirErro.style.display = 'block';
        AbrirAnexo.style.display = 'none';
        desfoque.style.display = 'block';
    } else {
        // Senha incorreta, exiba uma mensagem de erro
        alert('Senha incorreta. Por favor, tente novamente.');
        location.reload(); // Isso recarregará a página
    }
}

// Adicione um ouvinte de evento ao botão "Cad. Erro" para abrir o campo de senha
openFormButton.addEventListener('click', function (e) {
    e.stopPropagation(); // Impedir a propagação do evento para o documento
    abrirSenhaContainer();
});

// Adicione um ouvinte de evento ao botão "Verificar" para verificar a senha
verificarSenhaButton.addEventListener('click', function (e) {
    e.stopPropagation(); // Impedir a propagação do evento para o documento
    verificarSenha();
});

// Ouvinte de evento de teclado para o campo de senha
senhaInput.addEventListener('keydown', function (e) {
    // Verifique se a tecla pressionada é a tecla "Enter" (código de tecla 13)
    if (e.key === 'Enter') {
        verificarSenha();
    }
});

// Função para fechar o campo de senha ao clicar fora dele
function fecharSenhaContainerAoClicarFora(e) {
    if (!senhaContainer.contains(e.target)) {
        fecharSenhaContainer();
    }
}

// Impedir a propagação de cliques dentro do módulo de senha para evitar o fechamento imediato
senhaContainer.addEventListener('click', function (e) {
    e.stopPropagation();
});

// Adicione um ouvinte de evento ao documento para fechar o campo de senha ao clicar fora dele
document.addEventListener('click', function () {
    fecharSenhaContainer();
});


// Adicione um ouvinte de evento ao botão "Verificar" para verificar a senha
verificarSenhaButton.addEventListener('click', function (e) {
    e.stopPropagation(); // Impedir a propagação do evento para o documento
    verificarSenha();
});

// Função para fechar o módulo de senha ao clicar fora dele
function fecharSenhaContainerAoClicarFora(e) {
    if (!senhaContainer.contains(e.target)) {
        fecharSenhaContainer();
    }
}

// Impedir a propagação de cliques dentro do módulo de senha para evitar o fechamento imediato
senhaContainer.addEventListener('click', function (e) {
    e.stopPropagation();
});

// Adicione um ouvinte de evento ao documento para fechar o módulo de senha ao clicar fora dele
document.addEventListener('click', function () {
    fecharSenhaContainer();
});


/* verificarSenhaButton.addEventListener('click', () => {
    envioForm.style.display = 'block';
    AbrirErro.style.display = 'block';
    AbrirAnexo.style.display = 'none';
    desfoque.style.display = 'block';
}); */

closeModalButtonForm1.addEventListener('click', () => {
    desfoque.style.display = 'none';
});

closeModalButtonForm1.addEventListener('click', () => {
    infoModalForm.style.display = 'none';
});

openAnexo.addEventListener('click', () => {
    AbrirAnexo.style.display = 'block';
    AbrirErro.style.display = 'none';
});

openErro.addEventListener('click', () => {
    AbrirAnexo.style.display = 'none';
    AbrirErro.style.display = 'block';
});


/* FORM FIM */

/* Inicio Ativar botão */

const link1 = document.getElementById('openErro');
const link2 = document.getElementById('openAnexo');
const divCadastroErros = document.getElementById('divCadastroErros');
const divAnexo = document.getElementById('divAnexo');
const openFormButton1 = document.getElementById('openForm');

openFormButton1.addEventListener('click', () => {
    link1.classList.add('active');
    link2.classList.remove('active');
});

link1.addEventListener('click', () => {
    openFormButton1.classList.add('active');
    link1.classList.add('active');
    link2.classList.remove('active');
});

link2.addEventListener('click', () => {
    link1.classList.remove('active');
    link2.classList.add('active');
});

/* Fim Ativar botão */

/* função IMG ee ANEXO */

function excluirImagem() {
    var input = document.getElementById("imgimpt");
    input.value = ""; // Limpa o valor do input
    verificarInput('imgimpt', '.excluirimg'); // Oculta o botão novamente
}

function excluirAnexo() {
    var input = document.getElementById("anexoimpt");
    input.value = ""; // Limpa o valor do input
    verificarInput('anexoimpt', '.excluiranx'); // Oculta o botão novamente
}


function verificarInput(inputId, botaoSelector) {
    var input = document.getElementById(inputId);
    var botaoExcluir = document.querySelector(botaoSelector);

    if (input.files.length > 0) {
        botaoExcluir.style.display = "flex";
    } else {
        botaoExcluir.style.display = "none";
    }
}

/* ------------------------------------------------------------------------------------------------ */

// Função para gerar um ID único com base na data e hora atual
function generateUniqueID() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adicione 1 ao mês, pois os meses são baseados em zero
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

    // Combine as informações da data e hora para criar o ID
    const uniqueID = `${day}${month}${year}${hours}${minutes}${seconds}`;

    return uniqueID;
}

/* INICIO API para enviar Form para Planilha "FORM" */
const handleSubmit = (event) => {
    event.preventDefault();

    addloading();

    const sistema = document.querySelector('select[name=sistema]').value;
    const erro_resumido = document.querySelector('input[name=erro_resumido]').value;
    const erro = document.querySelector('textarea[name=erro]').value;
    const solucao = document.querySelector('textarea[name=solucao]').value;
    const script = document.querySelector('textarea[name=script]').value;
    const anexo = document.querySelector('input[name=arq_anexo]').value;
    const imagem = document.querySelector('input[name=img_anexo]').value;

    // Crie um ID único
    const uniqueID = generateUniqueID();

    fetch('https://api.sheetmonkey.io/form/2qyovDumZThgeSJs7A4ZHD', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sistema, erro_resumido, erro, solucao, script, anexo, imagem, uniqueID }),
    }).then(() => {
        removeloading();
    });
}

document.querySelector('form').addEventListener('submit', handleSubmit);/* location.reload(true); */

const addloading = () => {
    const load = document.querySelector('#load');
    load.innerHTML = `
        <div class="loader">
            <div class="justify-content-center jimu-primary-loading">
            </div> 
        </div>`;

}

const reloadButton = document.querySelector('#reloadButton');
const divToClose = document.querySelector('#alerta1');
const removeloading = () => {
    const alerta = document.querySelector('#alerta');
    alerta.innerHTML = `
        <div class="d-flex justify-content-center mt-5 h-100" id="alerta1">
            <div class="d-flex align-items-center align-self-center card p-3 text-center cookies">
                <span class="mt-2"><b>Informações salvas com sucesso</b><br><b>Se não aparecer Press "F5"<br> <i>OBRIGADO!</i></b></span>
                <button class="btn btn-dark mt-3 px-4" type="button" id="reloadButton">✔️</button>
            </div>
        </div>`;

    const reloadButton = document.querySelector('#reloadButton');
    const divToClose = document.querySelector('#alerta1');

    reloadButton.addEventListener('click', function () {
        setTimeout(function () {
            divToClose.style.display = 'none';
        });

        setTimeout(function () {
            location.reload();
        }, 4000); // 2000 milissegundos = 2 segundos


    });

}

/* FIM API para enviar Form para Planilha "FORM" */
