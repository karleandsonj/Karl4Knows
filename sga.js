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
                        const sistema = columns[0].textContent.trim(); // Supondo que a primeira coluna seja ID_sga
                        const erros = columns[2].textContent.trim(); // Supondo que a segunda coluna seja ERROS
                        const solucoes = columns[3].textContent.trim(); // Supondo que a quinta coluna seja SOLUCOES
                        const script = columns[4].textContent.trim(); 
                        const descricao_anexo = columns[5].textContent.trim(); 
                        const anexo = columns[6].textContent.trim(); 
                        const imagemLink = columns[6].textContent.trim(); // Supondo que a oitava coluna seja o link da imagem

                        // Construir o HTML para exibir os dados no modalContent
                        const modalContent = document.getElementById('modalContentsga');
                        modalContent.innerHTML = `
                                <div class="modal1">
                                    <h3>${sistema}</h3>
                                </div>
                                <div id="column">
                                    <div class="modal2" id="modal2">
                                        <h3>Erro Detalhado: </h3></br>
                                        <p id="P_sga">${erros}</p>
                                    </div>
                                    <div class="modal3">
                                        <h3>Soluções: </h3></br>
                                        <p id="P_sga1">${solucoes}</p>
                                    </div>
                                </div>
                                <div class="modal4">
                                    <h3>Scripts / Anexos: </h3><br>
                                    <p id="P_sga2">${script}</p>              
                                </div>
                                <div class="modal5">
                                    <h3>Anexos: </h3><br>
                                    ${anexo ? `<a href="${anexo}" target="_blank" class="buttonDownload">${descricao_anexo}</a>` : ''}
                                    <img id="P_sga3" src="${imagemLink}" alt="Imagem Exibida">
                                </div>
                            `;



                        // Exibir o card/modal
                        const infoModal = document.getElementById('infoModalsga');
                        infoModal.style.display = 'block';

                        function formatarTextoComQuebrasDeLinha(elementId) {
                            var elemento = document.querySelector('#' + elementId);
                          
                            if (elemento) {
                              var texto = elemento.innerHTML;
                              var arrayDeLinhas = texto.split(';');
                              var novoTexto = arrayDeLinhas.join('<br><br>');
                              elemento.innerHTML = novoTexto;
                            }
                          }

                          function formatarTextoComQuebrasDeLinha2(elementId) {
                            var elemento2 = document.querySelector('#' + elementId);
                          
                            if (elemento2) {
                              var texto = elemento2.innerHTML;
                              var arrayDeLinhas2 = texto.split(';');
                              var novoTexto2 = arrayDeLinhas2.join('<br>');
                              elemento2.innerHTML = novoTexto2;
                            }
                          }
                          
                          
                          // Para usar a função com outro campo, basta chamar a função com o ID do novo elemento:
                          formatarTextoComQuebrasDeLinha('P_sga');
                          formatarTextoComQuebrasDeLinha('P_sga1');
                          formatarTextoComQuebrasDeLinha2('P_sga2');
                          formatarTextoComQuebrasDeLinha2('P_sga3');
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
const closeModalsgaButton = document.getElementById('closeModalsga');
const infoModalsga = document.getElementById('infoModalsga');

closeModalsgaButton.addEventListener('click', () => {
    infoModalsga.style.display = 'none';
});


// Chamar a função para carregar os dados da planilha
loadsgaSheetData(sgasheetURL);

/* FIM DADOS */