/* DADOS */

const sgasheetURL = `https://docs.google.com/spreadsheets/d/1PJaUNl46WXZMG9J2R0ZRqWWCIg8Lg_CryODZxOua_CY/edit#gid=0`;

// Função para carregar os dados da planilha na tabela com o id "data-table"
function loadsgaSheetData(url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const htmlDocument = parser.parseFromString(data, 'text/html');
            const tableRows = htmlDocument.querySelectorAll('tbody tr');

            // Limpar a tabela antes de adicionar novos dados
            const dataTableBody = document.querySelector('#data-table-sga tbody');
            dataTableBody.innerHTML = '';
            // Definir o limite máximo de linhas a serem carregadas (até a última linha preenchida)
            const maxRows = tableRows.length;

            // Percorrer as linhas da planilha e adicionar apenas as linhas preenchidas à tabela
            for (let i = 3; i < maxRows; i++) {
                const row = tableRows[i];
                const columns = row.querySelectorAll('td');

                // Verificar se todas as colunas relevantes (ID_sga, ERROS, FOTOS, SOLUCOES) estão preenchidas
                if (columns[2].textContent.trim() !== '') {

                    const errorsressumosgaCell = document.createElement('td');
                    const errorsressumosgaData = columns[1].textContent.trim();
                    errorsressumosgaCell.innerHTML = `<span>${errorsressumosgaData}</span>`;

                    errorsressumosgaCell.classList.add('erro1'); // Substitua 'sua-classe-aqui' pelo nome da classe desejada

                    const viewButtonCell = document.createElement('td'); // Criar uma nova célula para o botão
                    const viewButton = document.createElement('img'); // Criar um elemento de imagem
                    viewButton.setAttribute('src', 'IMG/lupa.png'); // Definir o atributo 'src' para o caminho da imagem


                    // Adicionar uma classe ao elemento de imagem
                    viewButton.classList.add('lupa1'); // Substitua 'sua-classe-aqui' pelo nome da classe desejada

                    // Adicionar o elemento de imagem à célula da tabela
                    viewButtonCell.appendChild(viewButton);

                    // Adicionar um evento de clique ao botão para exibir os detalhes da linha
                    viewButton.addEventListener('click', () => {
                        // Obter os dados das colunas relevantes da linha
                        const sistema = columns[0].textContent.trim();
                        const erros = columns[2].textContent.trim();
                        const solucoes = columns[3].textContent.trim();
                        const script = columns[4].textContent.trim();
                        const descricao_anexo = columns[5].textContent.trim();
                        const anexo = columns[6].textContent.trim();
                        const imagemLink = columns[7].textContent.trim();

                        // Dividir a variável imagemLink em várias imagens usando o ponto e vírgula como separador
                        const imagens = imagemLink.split('§');

                        // Criar uma array de links e descrições de anexo separados pelo caractere especial §
                        const separador = '§';
                        const linksArray = anexo.split(separador);
                        const imagensArray = imagemLink.split(separador);
                        const descricaoAnexoArray = descricao_anexo.split(separador);

                        // Criar uma string que contenha todas as tags <a> com os links e descrições correspondentes
                        const linksString = linksArray.map((link, index) => `
                            <a href="${link}" id="P_sga${index + 1}" target="_blank" class="buttonDownload">${descricaoAnexoArray[index]}</a>
                        `).join('');

                        // Criar uma string que contenha todas as tags <img> com as imagens correspondentes
                        const imagensString = imagensArray.map((link, index) => `
                        <div class="imagem-div">
                            <img class="img_anexo imagem-div1" id="P_sga4${index + 1}" src="${link}" alt="" >
                        </div>
                        `).join('');

                        

                        // Verificar se tanto 'anexo' quanto 'imagensString' estão vazios
                        const anexoVazio = anexo.trim() == '';
                        const imagensStringVazio = imagensString.trim() == '';

                        const ambosVazios = anexoVazio && imagensStringVazio;

                        // Construir o HTML para exibir os dados no modalContent com base nas condições
                        const modalContent = document.getElementById('modalContent');
                        modalContent.innerHTML = `
                        <div class="modal1">
                        <h3>${sistema}</h3>
                            </div>
                            <div id="column">
                                <div class="modal2" id="modal2" class="scroll-modal">
                                    <h3>Erro Detalhado: </h3><br>
                                    <p id="P_sga">${erros}</p>
                                </div>
                                <div class="modal3" class="scroll-modal">
                                    <h3>Soluções: </h3><br>
                                    <p id="P_sga1">${solucoes}</p>
                                </div>
                            </div>
                            <div id="column">
                                <div class="modal4" style="${script ? '' : 'display: none;'}">
                                    <h3>Scripts: </h3><br>
                                    <p id="P_sga2" class="scroll-modal">${script}</p>
                                </div>
                                <div id="Modalanexo" class="modal5" style="${ambosVazios ? 'display: none;' : '' }">
                                    <h3>
                                        ${!anexoVazio && !imagensStringVazio ? 'Anexo e Imagem' : ''}
                                        ${anexoVazio && !imagensStringVazio ? 'Imagem' : ''}
                                        ${!anexoVazio && imagensStringVazio ? 'Anexo' : ''}
                                    </h3><br>
                                    <div class="anexo-main" style="${!anexoVazio ? '' : 'display: none;'}">
                                        ${linksString}
                                    </div>
                                    <hr>
                                    <div class="imagem-div-main" style="${!imagensStringVazio ? 0 : 'display: none;'}">
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
                        transformarEmListaOrdenada('P_sga'); // Substituir 'P_sga1' pelo ID desejado
                        transformarEmListaOrdenada('P_sga1'); // Substituir 'P_sga2' pelo ID desejado                        


                        // Adicionar um evento de clique ao link "Clique para trocar a imagem"
                        /* const trocarImagemLink = document.getElementById('trocarImagem'); */
                        const imagemDivs = document.querySelectorAll('.imagem-div');
                        const modalContainer = document.getElementById('modalContainer');
                        const modalContainerborda = document.getElementById('modalContainer-borda');

                        let imagemAtual = 0;

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
                                            <a href="#" id="fecharImagem">❎</a>
                                        </div>
                                `;
                                modalContainer.appendChild(imagemAmpliada);

                                // Exibir o modal
                                modalContainerborda.style.display = 'flex';

                                // Adicionar um evento de clique ao link "Fechar"
                                const fecharImagemLink = imagemAmpliada.querySelector('#fecharImagem');
                                fecharImagemLink.addEventListener('click', () => {
                                    // Ocultar o modal ao fechar a imagem

                                    modalContainerborda.style.display = 'none';
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
                            var elemento2 = document.querySelector('#' + elementId);

                            if (elemento2) {
                                var texto = elemento2.innerHTML;
                                var arrayDeLinhas2 = texto.split('§');
                                var novoTexto2 = arrayDeLinhas2.join('<br>');
                                elemento2.innerHTML = novoTexto2;
                            }
                        }


                        // Para usar a função com outro campo, basta chamar a função com o ID do novo elemento:
                        formatarTextoComQuebrasDeLinha('P_sga');
                        formatarTextoComQuebrasDeLinha('P_sga1');
                        formatarTextoComQuebrasDeLinha2('P_sga2');
                        formatarTextoComQuebrasDeLinha2('P_sga3');
                        formatarTextoComQuebrasDeLinha2('P_sga4');
                        formatarTextoComQuebrasDeLinha2('P_sga5');
                    });

                    viewButtonCell.appendChild(viewButton); // Adicionar o botão à célula

                    const newRow = document.createElement('tr');
                    newRow.appendChild(errorsressumosgaCell);
                    newRow.appendChild(viewButtonCell); // Adicionar a célula do botão à linha

                    dataTableBody.appendChild(newRow);
                }
            }


        })

        .catch(error => console.error('Erro ao carregar dados da planilha:', error));
}

// Fechar o card/modal quando o botão de fechar é clicado
const closeModalsgaButton = document.getElementById('closeModal');
const infoModalsga = document.getElementById('infoModal');

closeModalsgaButton.addEventListener('click', () => {
    infoModalsga.style.display = 'none';
});


// Chamar a função para carregar os dados da planilha
loadsgaSheetData(sgasheetURL);

/* FIM DADOS */