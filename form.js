/* INICIO FIRE BASE */



/* Fim FIRE BASE */
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

// Gere o ID único
const uniqueID = generateUniqueID();

// Atualize o campo "uniqueID" no formulário
document.getElementById('uniqueID').value = uniqueID;

/* FIM Envio de IMAGEM */

const scriptURL = 'https://script.google.com/macros/s/AKfycbw6D9QRNHrEVTgndJz8k-xxS-5iaYfIJ8IFUBbe2PXW4jrSulGwiabNHK3GNrvagFvWMQ/exec'
const form = document.forms['meu-formulario']

let url = "https://script.google.com/macros/s/AKfycbxL2m_EwZsm2y66BCL24Nwm4RDK2LUqg_85rKCeQd7XOUsjGcswdVNWcL5gdYWiaB4dog/exec";
let urlarq = "https://script.google.com/macros/s/AKfycbzoxWyoI2m_wm5XudxuDbts6dMkdr37RetdFuCInkg92I_t1CJkM_2LjvFuVac7s4QqWg/exec";
let file = document.getElementById("imgimpt");
let filearq = document.getElementById("anexoimpt");
let img = document.getElementById("imgimpt1");
let arq = document.getElementById("anexoimpt");
let progress = document.getElementById("progress");
let imageUrl = "";

form.addEventListener('submit', e => {
    e.preventDefault();
    addloading();
    let loadinganx = document.getElementById("loadinganx");
    loadinganx.style.display = 'block'; // Mostra o elemento de carregamento

    let files = file.files;
    let filesarq = filearq.files;

    // Função para enviar uma única imagem para o Drive e processar a resposta
    const sendImageToDrive = (file) => {
        return new Promise((resolve, reject) => {
            let fr = new FileReader();
            fr.addEventListener('loadend', () => {
                let res = fr.result;
                let spt = res.split("base64,")[1];
                let obj = {
                    base64: spt,
                    type: file.type,
                    name: file.name
                }
                // Esta linha envia uma solicitação POST para o URL especificado na variável "url", com o objeto "obj" como corpo da solicitação.
                fetch(url, {
                    method: "POST",
                    body: JSON.stringify(obj)
                })
                    // Esta linha aguarda a resposta do servidor e a converte para JSON
                    .then(response => response.json())
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
            fr.readAsDataURL(file);
        });
    }

    // Array de promessas para enviar todas as imagens
    const imagePromises = Array.from(files).map(file => sendImageToDrive(file));

    const fileNames = [];

    console.log(fileNames)

    // Função para enviar o arquivo anexo e processar a resposta
    const sendAttachmentToDrive = (filearq) => {
        return new Promise((resolve, reject) => {
            let fr1 = new FileReader();
            fr1.addEventListener('loadend', () => {
                let res1 = fr1.result;
                let spt1 = res1.split("base64,")[1];
                let obj1 = {
                    base64: spt1,
                    type: filearq.type,
                    name: filearq.name
                }
                // Esta linha envia uma solicitação POST para o URL especificado na variável "url", com o objeto "obj" como corpo da solicitação.
                fetch(urlarq, {
                    method: "POST",
                    body: JSON.stringify(obj1)
                })
                    // Esta linha aguarda a resposta do servidor e a converte para JSON
                    .then(response => response.json())
                    .then(data1 => {
                        fileNames.push(filearq.name);
                        resolve(data1);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
            fr1.readAsDataURL(filearq);

        });
    }
    // Array de promessas para enviar todos os anexos
    const attachmentPromises = Array.from(filesarq).map(filearq => sendAttachmentToDrive(filearq));

    // Promessas para envio de imagens e anexos
    const promises = [...imagePromises, ...attachmentPromises];

    Promise.all(promises)
        .then(data => {
            // Agora você tem um array com os dados de imagens e anexos enviados
            // Você pode processar esses dados conforme necessário

            // Por exemplo, você pode gerar os URLs das imagens e anexos e atualizar o formulário
            const imageUrls = data.filter(item => item.imageId).map(item => "https://drive.google.com/uc?id=" + item.imageId);
            const attachmentUrls = data.filter(item => item.anexoId).map(item => "https://drive.google.com/u/0/uc?id=" + item.anexoId + "&export=download");
            /* const nomearq = data.filter(item => item.anexoId).map(item => filearq.name); */

            const nomearq1 = document.getElementById("nomearq1");
            nomearq1.value = fileNames.join('§'); // Concatena os nomes dos arquivos em uma única string

            const imgimpt2 = document.getElementById("imgimpt2");
            imgimpt2.value = imageUrls.join('§'); // Concatena os URLs das imagens em uma única string

            const anexoimpt2 = document.getElementById("anexoimpt2");
            anexoimpt2.value = attachmentUrls.join('§'); // Concatena os URLs dos anexos em uma única string

            // Agora que as imagens e anexos foram enviados para o Drive e os URLs foram gerados, você pode enviar o formulário.
            sendForm();
        })
        .catch(error => {
            console.error('Erro ao enviar imagens e anexos:', error);
        });
});




function sendForm() {
    // Aqui você deve colocar a lógica para enviar o formulário
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            if (response.status === 200) {
                // Atualize a imagem no formulário com o URL da imagem
                // No caso de várias imagens, você pode atualizar uma área do formulário ou uma lista de miniaturas, por exemplo.
                console.log('Formulário enviado com sucesso');
                removeloading(); // Remova o alerta de sucesso após o sucesso
            } else {
                console.error('Erro no servidor:', response.status);
            }
        })
        .catch(error => console.error('Erro na requisição:', error.message));
}


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
    let loadinganx = document.getElementById("loadinganx");
    loadinganx.style.display = 'none'; // Mostra o elemento de carregamento
    let loadinganxenv = document.getElementById("loadinganxenv");
    loadinganxenv.style.display = 'block'; // Mostra o elemento de carregamento
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
        }, 2000); // 2000 milissegundos = 2 segundos


    });

}

/* FIM API para enviar Form para Planilha "FORM" */
