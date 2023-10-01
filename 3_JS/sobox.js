/* DADOS */

const soboxsheetURL = `https://docs.google.com/spreadsheets/d/1v15f9FgEGHEuIqM_UNkoOAo704EL7Whm0d60gl_CrFI/edit#gid=0`;

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
                if (columns[2].textContent.trim() !== '') {

                    const errorsressumosoboxCell = document.createElement('td');
                    const errorsressumosoboxData = columns[1].textContent.trim();
                    errorsressumosoboxCell.innerHTML = `<span>${errorsressumosoboxData}</span>`;

                    errorsressumosoboxCell.classList.add('erro1'); // Substitua 'sua-classe-aqui' pelo nome da classe desejada                    

                    const viewButtonCell = document.createElement('td'); // Criar uma nova célula para o botão
                    const viewButton = document.createElement('img'); // Criar um elemento de imagem
                    viewButton.setAttribute('src', '/IMG/lupa.png'); // Definir o atributo 'src' para o caminho da imagem
                    
                    // Adicionar uma classe ao elemento de imagem
                    viewButton.classList.add('lupa1'); // Substitua 'sua-classe-aqui' pelo nome da classe desejada
                    
                    // Adicionar o elemento de imagem à célula da tabela
                    viewButtonCell.appendChild(viewButton);

                    // Adicionar um evento de clique ao botão para exibir os detalhes da linha
                    viewButton.addEventListener('click', () => {
                        // Obter os dados das colunas relevantes da linha
                        const sistema = columns[0].textContent.trim(); // Supondo que a primeira coluna seja ID_sobox
                        const erros = columns[2].textContent.trim(); // Supondo que a segunda coluna seja ERROS
                        const solucoes = columns[3].textContent.trim(); // Supondo que a quinta coluna seja SOLUCOES
                        const script = columns[4].textContent.trim(); 
                        const descricao_anexo = columns[5].textContent.trim(); 
                        const anexo = columns[6].textContent.trim(); 

                        // Construir o HTML para exibir os dados no modalContent
                        const modalContent = document.getElementById('modalContentsobox');
                        modalContent.innerHTML = `
                                <div class="modal1">
                                    <h3>${sistema}</h3>
                                </div>
                                <div id="column">
                                    <div class="modal2" id="modal2">
                                        <h3>Erro Detalhado: </h3></br>
                                        <p id="P_sobox">${erros}</p>
                                    </div>
                                    <div class="modal3">
                                        <h3>Soluções: </h3></br>
                                        <p id="P_sobox1">${solucoes}</p>
                                    </div>
                                </div>
                                <div class="modal4">
                                    <h3>Scripts / Anexos: </h3><br>
                                    <p id="P_sobox2">${script}</p><br>
                                    ${anexo ? `<a href="${anexo}" target="_blank" class="buttonDownload">${descricao_anexo}</a>` : ''}
                                </div>

                            `;



                        // Exibir o card/modal
                        const infoModal = document.getElementById('infoModalsobox');
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
                          formatarTextoComQuebrasDeLinha('P_sobox');
                          formatarTextoComQuebrasDeLinha('P_sobox1');
                          formatarTextoComQuebrasDeLinha2('P_sobox2');
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
const closeModalsoboxButton = document.getElementById('closeModalsobox');
const infoModalsobox = document.getElementById('infoModalsobox');

closeModalsoboxButton.addEventListener('click', () => {
    infoModalsobox.style.display = 'none';
});


// Chamar a função para carregar os dados da planilha
loadsoboxSheetData(soboxsheetURL);

/* FIM DADOS */