/* DADOS */

const soboxsheetURL = `https://docs.google.com/spreadsheets/d/1v15f9FgEGHEuIqM_UNkoOAo704EL7Whm0d60gl_CrFI/edit?usp=drive_link`;

// Função para carregar os dados da planilha na tabela com o id "data-table"
function loadsoboxSheetData(url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const htmlDocument = parser.parseFromString(data, 'text/html');
            const tableRows = htmlDocument.querySelectorAll('tbody tr');

            // Limpar a tabela antes de adicionar novos dados
            const dataTableBody = document.querySelector('#data-table-sobox tbody');
            dataTableBody.innerHTML = '';
            // Definir o limite máximo de linhas a serem carregadas (até a última linha preenchida)
            const maxRows = tableRows.length;

            // Percorrer as linhas da planilha e adicionar apenas as linhas preenchidas à tabela
            for (let i = 3; i < maxRows; i++) {
                const row = tableRows[i];
                const columns = row.querySelectorAll('td');

                // Verificar se todas as colunas relevantes (ID_sobox, ERROS, FOTOS, SOLUCOES) estão preenchidas
                if (columns[0].textContent.trim() !== '') {

                    const errorsressumosoboxCell = document.createElement('td');
                    const errorsressumosoboxData = columns[2].textContent.trim();
                    errorsressumosoboxCell.innerHTML = `<span>${errorsressumosoboxData}</span>`;

                    errorsressumosoboxCell.classList.add('erro1'); // Substitua 'sua-classe-aqui' pelo nome da classe desejada

                    const viewButtonCell = document.createElement('td'); // Criar uma nova célula para o botão

                    const viewButton = document.createElement('img');

                    viewButton.setAttribute('src', 'IMG/lupa.png');
                    viewButton.classList.add('lupa1');

                    viewButtonCell.classList.add('visu_erro');

                    // Adicionar os botões à célula da tabela
                    viewButtonCell.appendChild(viewButton);



                    // Adicionar um evento de clique ao botão para exibir os detalhes da linha
                    viewButton.addEventListener('click', () => {
                        // Obter os dados das colunas relevantes da linha
                        const sistema = columns[0].textContent.trim();
                        const erros = columns[3].textContent.trim();
                        const solucoes = columns[4].textContent.trim();
                        const script = columns[5].textContent.trim();
                        const imagemLink = columns[6].textContent.trim();
                        const descricao_anexo = columns[7].textContent.trim();
                        const anexo = columns[8].textContent.trim();

                        /*                         // Selecionando os inputs pelos IDs
                                                const errosInput = document.getElementById('P_sobox-edit');
                                                const solucoesInput = document.getElementById('P_sobox1-edit');
                                                const scriptInput = document.getElementById('P_sobox2-edit');
                        
                                                // Atribuindo os valores das constantes aos inputs
                                                errosInput.value = erros;
                                                solucoesInput.value = solucoes;
                                                scriptInput.value = script; */

                        /* console.log(anexo) */

                        // Dividir a variável imagemLink em várias imagens usando o ponto e vírgula como separador

                        const imagens = imagemLink.split('§');

                        // Criar uma array de links e descrições de anexo separados pelo caractere especial §
                        const separador = '§';
                        const linksArray = anexo.split(separador);
                        const imagensArray = imagemLink.split(separador);
                        const descricaoAnexoArray = descricao_anexo.split(separador);

                        // Criar uma string que contenha todas as tags <a> com os links e descrições correspondentes
                        const linksString = linksArray.map((link, index) => `
                            <a href="${link}" id="P_sobox${index + 1}" target="_blank" class="buttonDownload">${descricaoAnexoArray[index]}</a>
                        `).join('');

                        // Criar uma string que contenha todas as tags <img> com as imagens correspondentes
                        const imagensString = imagensArray.map((link, index) => `
                        <div class="imagem-div" >
                            <img class="img_anexo imagem-div1" id="P_sobox4${index + 1}" src="${link}" alt="">
                        </div>
                        `).join('');

                        // Construir o HTML para exibir os dados no modalContent com base nas condições
                        const modalContent = document.getElementById('modalContent');
                        modalContent.innerHTML = `
                            <div class="modal1">
                                <h3>${sistema}</h3>
                                <a id="EDITFORMSHEET-sobox" title="Editar!"><img src="IMG/EDIT.png" class="EDIT-FORM-SHEET"></a>
                            </div>
                            <div id="column">
                                <div class="modal2" id="modal2" class="scroll-modal">
                                    <h3>Erro Detalhado: </h3>
                                    <hr class="hr-rot">
                                    <p id="P_sobox">${erros}</p>
                                </div>
                                <div class="modal3" class="scroll-modal">
                                    <h3>Soluções: </h3>
                                    <hr class="hr-rot">
                                    <p id="P_sobox1">${solucoes}</p>
                                </div>
                            </div>
                            <div id="column">
                                <div class="modal4" style="${script ? '' : 'display: none;'}">
                                    <h3>Scripts:</h3>
                                    <a href="#" title="Copiar!" id="copyLink" onclick="copyToClipboardscriptsobox()" >📄</a>
                                    <hr class="hr-rot">
                                    <p id="P_sobox2" class="scroll-modal">${script}</p>
                                </div>
                                <div id="Modalanexo" class="modal5" style="${anexo || imagemLink ? '' : 'display: none;'}">
                                    <h3>
                                        ${anexo && imagemLink ? 'Arquivo e Imagem' : ''}
                                        ${!anexo && imagemLink ? 'Imagem' : ''}
                                        ${anexo && !imagemLink ? 'Arquivo' : ''}
                                    </h3>
                                    <hr class="hr-rot">
                                    <div class="anexo-main" style="${anexo ? '' : 'display: none;'}">
                                        ${linksString}
                                    </div>
                                    <hr style="${anexo && imagemLink ? '' : 'display: none;'}" class="hr-rot">
                                    <div class="imagem-div-main" style="${imagemLink ? '' : 'display: none;'}">
                                        ${imagensString}
                                    </div>
                                </div>
                            </div>
                        `;


                        // Adicionar um ouvinte de evento ao link EDITFORMSHEET dentro do modal
                        const openEditFormButton = document.getElementById('EDITFORMSHEET-sobox');
                        const editFormDiv = document.getElementById('editform');

                        openEditFormButton.addEventListener('click', function () {
                            editFormDiv.style.display = 'block';
                            AnexoScript.style.display = 'none';
                            ErroSolucao.style.display = 'block';
                            FORMEDIT_BUTON2.classList.remove('activeEDIT');
                            FORMEDIT_BUTON1.classList.add('activeEDIT');
                        });

                        const EditForm = document.getElementById('EditFormContent');
                        EditForm.innerHTML = `
                                <input type="text" id="uniqueID_edit" name="uniqueID" readonly style="display: none;">
                                <div class="header-edit">
                                    <div class="modal0-edit">
                                        <h3>${sistema}</h3>
                                    </div>
                                    <div id="edit-ErroSolucao" class="edit-ErroSolucao">Erro / Solucao</div>
                                    <div id="edit-AnexoScript" class="edit-AnexoScript">Anexo / Script</div>
                                </div>
                                <div class="ErroSolucaoFORM-EDIT" id="ErroSolucaoFORM-EDIT">
                                    <div class="modal1-edit" id="modal1-edit">
                                        <h3>Erro Resumido: </h3>
                                        <input type="text" id="P_sobox0_edit" placeholder="Erro Resumido" class="campo0-edit">
                                    </div>
                                    <div class="modal2-edit" id="modal2-edit">
                                        <h3>Erro Detalhado: </h3>
                                        <textarea type="text" id="P_sobox_edit" placeholder="Erros" class="campo-edit"></textarea>
                                    </div>
                                    <div class="modal3-edit">
                                        <h3>Soluções: </h3>
                                        <textarea type="text" id="P_sobox1_edit" placeholder="Soluções" class="campo-edit"></textarea>
                                    </div>
                                </div>
                                <div class="AnexoScriptFORM-EDIT" id="AnexoScriptFORM-EDIT" style="display: none;">
                                    <div class="modal4-edit">
                                        <h3>Scripts:</h3>
                                        <textarea type="text" id="P_sobox2_edit" placeholder="Script" class="campo-edit"></textarea>
                                    </div>
                                </div>

                                <div class="botao_edit">

                                    <div id="loadinganx-edit" style="display: none;">
                                        Enviando...
                                    </div>
                                    <div id="loadinganxenv-edit" style="display: none;">
                                        Concluido...
                                    </div>
                                    <div id="loadingarq-edit" style="display: none;">
                                        Concluido...
                                    </div>
                
                                    <button type="submit" id="submit-edit" class="bt-edt"> Salvar </button>
            
                                </div>
                        `;

                        /* ----------------------------------------------------------------------------- */

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

                            reloadButtonedit.addEventListener('click', function () {
                                setTimeout(function () {
                                    divToCloseedit.style.display = 'none';
                                });

                                setTimeout(function () {
                                    location.reload();
                                }, 2000); // 2000 milissegundos = 2 segundos
                            });
                        }

                        /* ----------------------------------------------------------------------------- */

                        const FORMEDIT_BUTON1 = document.getElementById('edit-ErroSolucao');
                        const FORMEDIT_BUTON2 = document.getElementById('edit-AnexoScript');
                        const closeModalEditForm = document.getElementById('closeModalEDForm');
                        const ErroSolucao = document.getElementById('ErroSolucaoFORM-EDIT');
                        const AnexoScript = document.getElementById('AnexoScriptFORM-EDIT');


                        closeModalEditForm.addEventListener('click', () => {
                            FORMEDIT_BUTON1.classList.remove('activeEDIT');
                            FORMEDIT_BUTON2.classList.remove('activeEDIT');
                            editFormDiv.style.display = 'none';
                        });

                        FORMEDIT_BUTON1.addEventListener('click', () => {
                            FORMEDIT_BUTON2.classList.remove('activeEDIT');
                            FORMEDIT_BUTON1.classList.add('activeEDIT');
                            AnexoScript.style.display = 'none';
                            ErroSolucao.style.display = 'block';
                        });

                        FORMEDIT_BUTON2.addEventListener('click', () => {
                            FORMEDIT_BUTON1.classList.remove('activeEDIT');
                            FORMEDIT_BUTON2.classList.add('activeEDIT');
                            AnexoScript.style.display = 'block';
                            ErroSolucao.style.display = 'none';
                        });

                        const uniqueID = document.getElementById("uniqueID");
                        const P_sobox0_edit = document.getElementById("P_sobox0_edit");
                        const P_sobox_edit = document.getElementById("P_sobox_edit");
                        const P_sobox1_edit = document.getElementById("P_sobox1_edit");
                        const P_sobox2_edit = document.getElementById("P_sobox2_edit");
                        P_sobox0_edit.value = errorsressumosoboxData;
                        P_sobox_edit.value = erros;
                        P_sobox1_edit.value = solucoes;
                        P_sobox2_edit.value = script;
                        uniqueID.value = uniqueID;

                        const imagemDivMain = document.querySelector('.imagem-div-main');

                        imagemDivMain.addEventListener('wheel', (e) => {
                            // Impedir o comportamento padrão da roda do mouse
                            e.preventDefault();

                            // Definir a quantidade de pixels a serem rolados por clique
                            const scrollAmount = 100;

                            // Rolar a div horizontalmente com base na direção da roda do mouse
                            if (e.deltaY > 0) {
                                imagemDivMain.scrollLeft += scrollAmount;
                            } else {
                                imagemDivMain.scrollLeft -= scrollAmount;
                            }
                        });


                        function transformarEmListaOrdenada(idDoElemento) {
                            // Obtém a referência ao elemento <p> com o ID especificado
                            var elementoParagrafo = document.getElementById(idDoElemento);

                            if (elementoParagrafo) {
                                // Obtém o texto do elemento <p>
                                var conteudo = elementoParagrafo.textContent;

                                // Divida o conteúdo em linhas (supondo que cada item da lista esteja em uma nova linha)
                                var linhas = conteudo.split('§');

                                // Cria um elemento <ol> (lista ordenada) para a lista numerada
                                var listaOrdenada = document.createElement('ol');

                                // Para cada linha, crie um elemento <li> (item da lista) e adicione-o à lista ordenada
                                for (var i = 0; i < linhas.length; i++) {
                                    var linha = linhas[i].trim(); // Remove espaços em branco em excesso
                                    if (linha.length > 0) {
                                        var itemLista = document.createElement('li');
                                        itemLista.textContent = linha;
                                        listaOrdenada.appendChild(itemLista);
                                    }
                                }

                                // Substitui o elemento <p> pelo elemento <ol> criado
                                elementoParagrafo.parentNode.replaceChild(listaOrdenada, elementoParagrafo);
                            } else {
                                console.log('Elemento não encontrado com ID: ' + idDoElemento);
                            }
                        }

                        // Chame a função com o ID do elemento desejado
                        transformarEmListaOrdenada('P_sobox'); // Substituir 'P_sobox1' pelo ID desejado
                        transformarEmListaOrdenada('P_sobox1'); // Substituir 'P_sobox2' pelo ID desejado                        


                        // Adicionar um evento de clique ao link "Clique para trocar a imagem"
                        /* const trocarImagemLink = document.getElementById('trocarImagem'); */
                        const imagemDivs = document.querySelectorAll('.imagem-div');
                        const modalContainer = document.getElementById('modalContainer');

                        const modalContainerborda = document.getElementById('modalContainer-borda');

                        /* let imagemAtual = 0; */

                        /* trocarImagemLink.addEventListener('click', () => {
                            // Ocultar a imagem atual
                            imagemDivs[imagemAtual].style.display = 'none';
                
                            // Avançar para a próxima imagem
                            imagemAtual = (imagemAtual + 1) % imagens.length;
                
                            // Exibir a nova imagem
                            imagemDivs[imagemAtual].style.display = 'block';
                        }); */

                        imagemDivs.forEach((imagemDiv, index) => {
                            const imagem = imagemDiv.querySelector('img');

                            imagem.addEventListener('click', () => {
                                // Exibir a imagem ampliada em um modal ou em um elemento específico da página
                                const imagemAmpliada = document.createElement('div');
                                imagemAmpliada.classList.add('imagem-ampliada');
                                imagemAmpliada.innerHTML = `
                                    <img src="${imagens[index]}" alt="">
                                    <div class="img-amp-close">
                                        <a href="#" id="fecharImagem">✖️</a> 
                                    </div>
                                `;
                                modalContainer.appendChild(imagemAmpliada);

                                // Exibir o modal
                                modalContainerborda.style.display = 'flex';

                                // Adicionar um evento de clique ao link "Fechar" apenas para a imagem ampliada atual
                                const fecharImagemLink = imagemAmpliada.querySelector('#fecharImagem');
                                fecharImagemLink.addEventListener('click', () => {
                                    // Ocultar o modal ao fechar a imagem
                                    modalContainerborda.style.display = 'none';

                                    // Remover a imagem ampliada do DOM após fechar
                                    modalContainer.removeChild(imagemAmpliada);
                                });
                            });
                        });


                        // Exibir o card/modal
                        const infoModal = document.getElementById('infoModal');
                        infoModal.style.display = 'block';

                        function formatarTextoComQuebrasDeLinha(elementId) {
                            var elemento = document.querySelector('#' + elementId);

                            if (elemento) {
                                var texto = elemento.value || elemento.innerHTML;
                                var arrayDeLinhas = texto.split('§');
                                var novoTexto = arrayDeLinhas.join('\n\n');

                                if (elemento.tagName.toLowerCase() === 'textarea') {
                                    elemento.value = novoTexto;
                                } else {
                                    elemento.innerHTML = novoTexto;
                                }
                            }
                        }

                        function formatarTextoComQuebrasDeLinha2(elementId) {
                            var elemento = document.querySelector('#' + elementId);

                            if (elemento) {
                                elemento.style.whiteSpace = 'pre'; // Aplicar a propriedade 'white-space' com valor 'pre'
                                var texto = elemento.value || elemento.innerHTML;
                                var arrayDeLinhas = texto.split('§');
                                var novoTexto = arrayDeLinhas.join('\n');

                                if (elemento.tagName.toLowerCase() === 'textarea') {
                                    elemento.value = novoTexto;
                                } else {
                                    elemento.innerHTML = novoTexto;
                                }

                                elemento.style.whiteSpace = 'pre-wrap'; // Permite quebras de linha e espaço branco
                                elemento.style.wordWrap = 'break-word'; // Força quebra de palavra em caso de overflow
                            }
                        }


                        function formatarTextoComQuebrasDeLinhaEDIT(elementId) {
                            var elemento = document.querySelector('#' + elementId);

                            if (elemento) {
                                var texto = elemento.value || elemento.innerHTML;
                                var arrayDeLinhas = texto.split('§');
                                var novoTexto = arrayDeLinhas.join('\n');

                                if (elemento.tagName.toLowerCase() === 'textarea') {
                                    elemento.value = novoTexto;
                                } else {
                                    elemento.innerHTML = novoTexto;
                                }
                            }
                        }

                        function formatarTextoComQuebrasDeLinhaEDIT2(elementId) {
                            var elemento = document.querySelector('#' + elementId);

                            if (elemento) {
                                elemento.style.whiteSpace = 'pre'; // Aplicar a propriedade 'white-space' com valor 'pre'
                                var texto = elemento.value || elemento.innerHTML;
                                var arrayDeLinhas = texto.split('§');
                                var novoTexto = arrayDeLinhas.join('\n');

                                if (elemento.tagName.toLowerCase() === 'textarea') {
                                    elemento.value = novoTexto;
                                } else {
                                    elemento.innerHTML = novoTexto;
                                }

                                elemento.style.whiteSpace = 'pre-wrap'; // Permite quebras de linha e espaço branco
                                elemento.style.wordWrap = 'break-word'; // Força quebra de palavra em caso de overflow
                            }
                        }


                        // Para usar a função com outro campo, basta chamar a função com o ID do novo elemento:
                        formatarTextoComQuebrasDeLinha('P_sobox');
                        formatarTextoComQuebrasDeLinha('P_sobox1');
                        formatarTextoComQuebrasDeLinha2('P_sobox2');
                        formatarTextoComQuebrasDeLinha2('P_sobox3');
                        formatarTextoComQuebrasDeLinha2('P_sobox4');
                        formatarTextoComQuebrasDeLinha2('P_sobox5');

                        //quebrar linha do edit
                        formatarTextoComQuebrasDeLinhaEDIT('P_sobox_edit');
                        formatarTextoComQuebrasDeLinhaEDIT('P_sobox1_edit');
                        formatarTextoComQuebrasDeLinhaEDIT2('P_sobox2_edit');
                        formatarTextoComQuebrasDeLinhaEDIT2('P_sobox3_edit');
                        formatarTextoComQuebrasDeLinhaEDIT2('P_sobox4_edit');
                        formatarTextoComQuebrasDeLinhaEDIT2('P_sobox5_edit');
                    });

                    viewButtonCell.appendChild(viewButton); // Adicionar o botão à célula

                    const newRow = document.createElement('tr');
                    newRow.appendChild(errorsressumosoboxCell);
                    newRow.appendChild(viewButtonCell); // Adicionar a célula do botão à linha

                    dataTableBody.appendChild(newRow);
                }
            }


        })

        .catch(error => console.error('Erro ao carregar dados da planilha:', error));
}

// Fechar o card/modal quando o botão de fechar é clicado
const closeModalsoboxButton = document.getElementById('closeModal');
const infoModalsobox = document.getElementById('infoModal');

closeModalsoboxButton.addEventListener('click', () => {
    infoModalsobox.style.display = 'none';
});


// Chamar a função para carregar os dados da planilha
loadsoboxSheetData(soboxsheetURL);

/* FIM DADOS */

/* Copiar Script-sobox*/
function copyToClipboardscriptsobox() {
    const infoText = document.getElementById("P_sobox2").innerText;
    const tempInput = document.createElement("textarea");
    tempInput.value = infoText;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    // Estilizar o botão após a cópia
    const btnCopiar = document.getElementById('copyLink');
    btnCopiar.innerText = '  ✔  ';
    setTimeout(() => {
        btnCopiar.innerText = '📄';
    }, 3000);
}
