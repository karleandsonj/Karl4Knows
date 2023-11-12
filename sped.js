/* DADOS */

const spedsheetURL = `https://docs.google.com/spreadsheets/d/1O6hUqHNwcJOs5IaaL-RDl0wCkry5T6Ui3G_a2nnOYmc/edit#gid=0`;

// Função para carregar os dados da planilha na tabela com o id "data-table"
function loadspedSheetData(url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const htmlDocument = parser.parseFromString(data, 'text/html');
            const tableRows = htmlDocument.querySelectorAll('tbody tr');

            // Limpar a tabela antes de adicionar novos dados
            const dataTableBody = document.querySelector('#data-table-sped tbody');
            dataTableBody.innerHTML = '';
            // Definir o limite máximo de linhas a serem carregadas (até a última linha preenchida)
            const maxRows = tableRows.length;

            // Percorrer as linhas da planilha e adicionar apenas as linhas preenchidas à tabela
            for (let i = 3; i < maxRows; i++) {
                const row = tableRows[i];
                const columns = row.querySelectorAll('td');

                // Verificar se todas as colunas relevantes (ID_sped, ERROS, FOTOS, SOLUCOES) estão preenchidas
                if (columns[0].textContent.trim() !== '') {

                    const errorsressumospedCell = document.createElement('td');
                    const errorsressumospedData = columns[2].textContent.trim();
                    errorsressumospedCell.innerHTML = `<span>${errorsressumospedData}</span>`;

                    errorsressumospedCell.classList.add('erro1'); // Substitua 'sua-classe-aqui' pelo nome da classe desejada

                    const viewButtonCell = document.createElement('td'); // Criar uma nova célula para o botão
                    const viewButton = document.createElement('img');
                    viewButton.setAttribute('src', 'IMG/lupa.png');
                    viewButton.classList.add('lupa1');

                    viewButtonCell.classList.add('visu_erro');

                    const editButton = document.createElement('img'); // Criar um botão "EDIT"
                    editButton.setAttribute('src', 'IMG/lapis.png');
                    editButton.classList.add('edit1'); // Adicionar uma classe ao botão

                    // Adicionar os botões à célula da tabela
                    viewButtonCell.appendChild(viewButton);

                    // Adicione o botão "EDIT" à célula
                    viewButtonCell.appendChild(editButton);

                    const closeModalButtonFormED = document.getElementById('closeModalEDForm');
                    const editform = document.getElementById('editform');

                    closeModalButtonFormED.addEventListener('click', function () {
                        editform.style.display = 'none';
                    });

                    editButton.addEventListener('click', function () {
                        editform.style.display = 'block';
                    });






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

                        /* console.log(anexo) */

                        // Dividir a variável imagemLink em várias imagens usando o ponto e vírgula como separador
                        const imagens = imagemLink.split('§');
                        /* const anexos = anexo.split('§'); */

                        // Criar uma array de links e descrições de anexo separados pelo caractere especial §
                        const separador = '§';
                        const linksArray = anexo.split(separador);
                        const imagensArray = imagemLink.split(separador);
                        const descricaoAnexoArray = descricao_anexo.split(separador);

                        // Criar uma string que contenha todas as tags <a> com os links e descrições correspondentes
                        const linksString = linksArray.map((link, index) => `
                            <a href="${link}" id="P_sped${index + 1}" target="_blank" class="buttonDownload">${descricaoAnexoArray[index]}</a>
                        `).join('');

                        // Criar uma string que contenha todas as tags <img> com as imagens correspondentes
                        const imagensString = imagensArray.map((link, index) => `
                        <div class="imagem-div" >
                            <img class="img_anexo imagem-div1" id="P_sped4${index + 1}" src="${link}" alt="">
                        </div>
                        `).join('');

                        // Construir o HTML para exibir os dados no modalContent com base nas condições
                        const modalContent = document.getElementById('modalContent');
                        modalContent.innerHTML = `
                            <div class="modal1">
                                <h3>${sistema}</h3>
                            </div>
                            <div id="column">
                                <div class="modal2" id="modal2" class="scroll-modal">
                                    <h3>Erro Detalhado: </h3><br>
                                    <p id="P_sped">${erros}</p>
                                </div>
                                <div class="modal3" class="scroll-modal">
                                    <h3>Soluções: </h3><br>
                                    <p id="P_sped1">${solucoes}</p>
                                </div>
                            </div>
                            <div id="column">
                                <div class="modal4" style="${script ? '' : 'display: none;'}">
                                    <h3>Scripts: </h3>
                                    <a href="#" id="copyLink" onclick="copyToClipboardscriptsped()" >📄</a> <br>
                                    <p id="P_sped2" class="scroll-modal">${script}</p>
                                </div>
                                <div id="Modalanexo" class="modal5" style="${anexo || imagemLink ? '' : 'display: none;'}">
                                    <h3>
                                        ${anexo && imagemLink ? 'Arquivo e Imagem' : ''}
                                        ${!anexo && imagemLink ? 'Imagem' : ''}
                                        ${anexo && !imagemLink ? 'Arquivo' : ''}
                                    </h3>
                                    <br>
                                    <div class="anexo-main" style="${anexo ? '' : 'display: none;'}">
                                        ${linksString}
                                    </div>
                                    <hr style="${anexo && imagemLink ? '' : 'display: none;'}">
                                    <div class="imagem-div-main" style="${imagemLink ? '' : 'display: none;'}">
                                        ${imagensString}
                                    </div>
                                </div>
                            </div>
                        `;


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
                        transformarEmListaOrdenada('P_sped'); // Substituir 'P_sped1' pelo ID desejado
                        transformarEmListaOrdenada('P_sped1'); // Substituir 'P_sped2' pelo ID desejado                        


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

                        //pular linhas onde tiver caracter §
                        function formatarTextoComQuebrasDeLinha(elementId) {
                            var elemento = document.querySelector('#' + elementId);

                            if (elemento) {
                                var texto = elemento.innerHTML;
                                var arrayDeLinhas = texto.split('§');
                                var novoTexto = arrayDeLinhas.join('<br><br>');
                                elemento.innerHTML = novoTexto;
                            }
                        }

                        function formatarTextoComQuebrasDeLinha2(elementId) {
                            var elemento = document.querySelector('#' + elementId);

                            if (elemento) {
                                elemento.style.whiteSpace = 'pre'; // Aplicar a propriedade 'white-space' com valor 'pre'
                                var texto = elemento.innerHTML;
                                var arrayDeLinhas = texto.split('§');
                                var novoTexto = arrayDeLinhas.join('<br>');
                                elemento.innerHTML = novoTexto;
                                elemento.style.whiteSpace = 'pre-wrap'; // Permite quebras de linha e espaço branco
                                elemento.style.wordWrap = 'break-word'; // Força quebra de palavra em caso de overflow
                            }
                        }


                        // Para usar a função com outro campo, basta chamar a função com o ID do novo elemento:
                        formatarTextoComQuebrasDeLinha('P_sped');
                        formatarTextoComQuebrasDeLinha('P_sped1');
                        formatarTextoComQuebrasDeLinha2('P_sped2');
                        formatarTextoComQuebrasDeLinha2('P_sped3');
                        formatarTextoComQuebrasDeLinha2('P_sped4');
                        formatarTextoComQuebrasDeLinha2('P_sped5');
                    });

                    viewButtonCell.appendChild(viewButton); // Adicionar o botão à célula

                    const newRow = document.createElement('tr');
                    newRow.appendChild(errorsressumospedCell);
                    newRow.appendChild(viewButtonCell); // Adicionar a célula do botão à linha

                    dataTableBody.appendChild(newRow);
                }
            }


        })

        .catch(error => console.error('Erro ao carregar dados da planilha:', error));
}

// Fechar o card/modal quando o botão de fechar é clicado
const closeModalspedButton = document.getElementById('closeModal');
const infoModalsped = document.getElementById('infoModal');

closeModalspedButton.addEventListener('click', () => {
    infoModalsped.style.display = 'none';
});


// Chamar a função para carregar os dados da planilha
loadspedSheetData(spedsheetURL);

/* FIM DADOS */

/* Copiar Script-sped */
function copyToClipboardscriptsped() {
    const infoText = document.getElementById("P_sped2").innerText;
    const tempInput = document.createElement("textarea");
    tempInput.value = infoText;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    // Estilizar o botão após a cópia
    const btnCopiar = document.getElementById('copyLink');
    btnCopiar.innerText = '📄 ✔';
    setTimeout(() => {
        btnCopiar.innerText = '📄';
    }, 3000);
}