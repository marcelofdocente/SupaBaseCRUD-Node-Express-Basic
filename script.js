
// script.js Front-End
// recebendo os valores digitados no input da página HTML - Referências aos elementos HTML
const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const btnCadastrar = document.getElementById('btn-cadastrar');
const tabelaUsuarios = document.getElementById('tabela-usuarios');
const btnConsultar = document.getElementById('btn-consultar');
const btnAtualizarTabela = document.getElementById('btn-atualizartabela');
const btnLimparTabela = document.getElementById('btn-limpartabela');


// Função para cadastrar um novo usuário
// aqui a chamada é diferente da função Consultar Usuário
const cadastrarUsuario = async () => {
    const nome = nomeInput.value;
    const email = emailInput.value;

    //validacao de dados
    if (nome.trim() === '' || email.trim() === '') {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    if (!validateEmail(email)) {
        alert('Por favor, insira um endereço de e-mail válido.');
        return;
    }
    
    // faz requisição para API do Back-End
    try {
        const response = await fetch('http://localhost:3000/users', { //faz requisição para API do Back-End
            method: 'POST', //define o método HTTP como POST para cadastrar
            headers: {
                'Content-Type': 'application/json' //define o cabeçalho para enviar dados JSON
            },
            body: JSON.stringify({ name: nome, email: email }) //converte os dados para JSON
        });
        
        if (!response.ok) {
            const error = await response.json(); //obter mensagem de erro
            alert(error.error); //exibe mensagem de erro da API
            return;
        }


        // Limpa os campos de input
        nomeInput.value = '';
        emailInput.value = '';

        // Atualiza a tabela de usuários
        atualizarTabela();

        // Mensagem de sucesso
        alert('Usuário cadastrado com sucesso!');
    
    } catch (error) {
        alert('Erro ao cadastrar usuário.');
    }
};


// Funcao para validar endereco de e-mail
function validateEmail(email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

// Função para excluir um usuário
const excluirUsuario = async (id) => {
    if (!confirm(`Tem certeza que deseja excluir o usuário com ID ${id}?`)) {
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/users/${id}`, { //faz requisição para API do Back-End
            method: 'DELETE', //define o método HTTP como DELETE para exclusão
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const error = await response.json(); //obter mensagem de erro
            alert(error.error); //exibe mensagem de erro da API
            return;
        }

        // Atualiza a tabela de usuários
        atualizarTabela();

        // Mensagem de sucesso
        alert('Usuário excluído com sucesso!');

    } catch (error) {
        alert('Erro ao excluir usuário.');
    }
};


// Adiciona o evento de clique ao botão de cadastrar
btnCadastrar.addEventListener('click', cadastrarUsuario);


// Função para consultar usuários
async function consultarUsuarios() {
    try {
        const response = await fetch('http://localhost:3000/users'); //Requisição para consultar todos usuarios via API Banck-End
        const data = await response.json();
        return data; // retorna os dados da resposta

        // exibir o resultado da consulta na console
        console.log(data);

    }catch (error) {
        console.error("Erro ao consultar usuários: ", error);
        alert ("Erro ao consultar usuários. Verifique a conexão.");
        return null; // retorna null em caso de erro
    }
}


// Nova atualização da Tabela
async function atualizarTabela() {
    try {
        const data = await consultarUsuarios(); //aguarda a Promise ser resolvida

        if (data) { //verifica se a consulta foi bem-sucedida
            
            // Limpa a tabela antes de preencher
            //tabelaUsuarios.querySelector('tbody').innerHTML = '';
            LimparRecriarTabela();

            // Preenche a tabela com os dados dos usuários
            data.forEach(usuario => {
                const row = tabelaUsuarios.insertRow();
                const idCell = row.insertCell();
                const nomeCell = row.insertCell();
                const emailCell = row.insertCell();
                const acoesCell = row.insertCell();
            
                idCell.textContent = usuario.id;
                nomeCell.textContent = usuario.name;
                emailCell.textContent = usuario.email;
            
                // Botão para excluir o usuário
                const btnExcluir = document.createElement('button');
                btnExcluir.textContent = 'Excluir';
                btnExcluir.addEventListener('click', () => {
                    excluirUsuario(usuario.id);
                });
                acoesCell.appendChild(btnExcluir);
            });

        } else {
            alert("Erro ao obter dados dos usuários.");
        }
    
    } catch (error) {
        console.error('Erro durante a atualização da Tabela de Usuários: ', error);
        alert('Erro ao atualizara tabela de usuários.');
    }  
    
};


// Botão para Atualizar a Tabela com as infos dos usuários
btnAtualizarTabela.addEventListener('click', function() {
    atualizarTabela();
});



// Teste - Consultar Usuarios
btnConsultar.addEventListener('click', function(){
    const data = consultarUsuarios();
    console.log(data);
});



async function LimparRecriarTabela() {
    try {
        // Limpa toda a tabela
        tabelaUsuarios.innerHTML = '';

        // Recria o cabeçalho da tabela
        const thead = document.createElement('thead');
        const tr = document.createElement('tr');
        const idCell = document.createElement('th');
        const nomeCell = document.createElement('th');
        const emailCell = document.createElement('th');
        const acoesCell = document.createElement('th');

        idCell.textContent = 'ID';
        nomeCell.textContent = 'Nome';
        emailCell.textContent = 'Email';
        acoesCell.textContent = 'Ações';

        tr.appendChild(idCell);
        tr.appendChild(nomeCell);
        tr.appendChild(emailCell);
        tr.appendChild(acoesCell);

        thead.appendChild(tr);
        tabelaUsuarios.appendChild(thead);

        // Cria o <tbody> novamente
        const tbody = document.createElement('tbody');
        tabelaUsuarios.appendChild(tbody);

    } catch (error) {
        console.error("Erro ao Limpar a Tabela de Usuários: ", error);
        alert("Erro ao Limpar a Tabela de Usuários.");
        return null;
    }
}



// Teste - Limpar Tabela, e recria cabeçalho
btnLimparTabela.addEventListener('click', function() {
    LimparRecriarTabela();
});


// Carrega a tabela de usuários ao iniciar a página
atualizarTabela();


