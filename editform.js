const scriptURLEDIT = 'https://script.google.com/macros/s/AKfycbw6D9QRNHrEVTgndJz8k-xxS-5iaYfIJ8IFUBbe2PXW4jrSulGwiabNHK3GNrvagFvWMQ/exec';
const formEdit = document.forms['EditFormContent'];

// Associar a função sendFormEdit ao evento de clique do botão
const submitButton = document.getElementById('submit-edit');
submitButton.addEventListener('click', e => {
    e.preventDefault();
    addloadingedit();
    let loadinganxedit = document.getElementById("loadinganx-edit");
    loadinganxedit.style.display = 'block'; // Mostra o elemento de carregamento

    // Chamar a função sendFormEdit
    sendFormEdit();
});

function sendFormEdit() {
    // Aqui você deve colocar a lógica para enviar o formulário
    fetch(scriptURLEDIT, { method: 'POST', body: new FormData(formEdit) })
        .then(response => {
            if (response.status === 200) {
                // Atualize a imagem no formulário com o URL da imagem
                // No caso de várias imagens, você pode atualizar uma área do formulário ou uma lista de miniaturas, por exemplo.
                console.log('Formulário enviado com sucesso');
                removeloadingedit(); // Remova o alerta de sucesso após o sucesso
            } else {
                console.error('Erro no servidor:', response.status);
            }
        })
        .catch(error => console.error('Erro na requisição:', error.message));
}

const addloadingedit = () => {
    const load = document.querySelector('#load');
    load.innerHTML = `
        <div class="loader">
            <div class="justify-content-center jimu-primary-loading">
            </div> 
        </div>`;
}

const reloadButtonedit = document.querySelector('#reloadButton');
const divToCloseedit = document.querySelector('#alerta1');
const removeloadingedit = () => {
    let loadinganxedit = document.getElementById("loadinganx-edit");
    loadinganxedit.style.display = 'none'; // Mostra o elemento de carregamento
    let loadinganxenvedit = document.getElementById("loadinganxenv-edit");
    loadinganxenvedit.style.display = 'block'; // Mostra o elemento de carregamento
    const alertaedit = document.querySelector('#alerta');
    alertaedit.innerHTML = `
        <div class="d-flex justify-content-center mt-5 h-100" id="alerta1">
            <div class="d-flex align-items-center align-self-center card p-3 text-center cookies">
                <span class="mt-2"><b>Informações salvas com sucesso</b><br><b>Se não aparecer Press "F5"<br> <i>OBRIGADO!</i></b></span>
                <button class="btn btn-dark mt-3 px-4" type="button" id="reloadButton">✔️</button>
            </div>
        </div>`;

    reloadButtonedit.addEventListener('click', function() {
        setTimeout(function() {
            divToCloseedit.style.display = 'none';
        });

        setTimeout(function() {
            location.reload();
        }, 2000); // 2000 milissegundos = 2 segundos
    });
}