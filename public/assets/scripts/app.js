// Função para carregar e exibir os dados do usuário e repositórios
async function fetchData() {
  try {
    // Faz a requisição para o arquivo JSON
    const response = await fetch('../db/db.json');
    const data = await response.json();

    // Extrai os dados do usuário e dos repositórios do JSON
    const usuario = data.usuario;
    const repositorios = data.repositorios;

    // Atualiza os elementos da página com os dados do usuário
    document.getElementById('imagem-perfil').src = usuario.avatar_url;
    document.getElementById('texto-perfil').getElementsByTagName('h3')[0].textContent = usuario.name;
    document.getElementById('texto-perfil').getElementsByTagName('p')[0].textContent = usuario.bio;
    document.getElementById('localizacao').textContent = usuario.location;
    document.getElementById('seguidores').textContent = usuario.followers;

    // Cria os cards dos repositórios
    const repositoriosSection = document.getElementById('repositorios');
    const repositoriosContainer = repositoriosSection.querySelector('.cardss .row');

    // Limpa o conteúdo existente
    repositoriosContainer.innerHTML = '';

    // Itera sobre os dados dos repositórios e cria os cards dinamicamente
    repositorios.forEach(repo => {
      const card = document.createElement('div');
      card.classList.add('col');

      card.innerHTML = `
        <div class="card h-100" onclick="fetchRepoDetails(${repo.id})"> 
          <div class="card-body">
              <h5 class="card-title">${repo.name}</h5>
            <p class="card-text">${repo.description || 'Sem descrição'}</p>
            <div class="icones">
              <i class="fa-solid fa-heart"></i>
              <p>${repo.stargazers_count}</p>
              <i class="fa-solid fa-users"></i>
              <p>${repo.watchers_count}</p>
            </div>
          </div>
        </div>
      `;
      repositoriosContainer.appendChild(card);
    });
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
  }
}

// Função para buscar detalhes do repositório e redirecionar para repo.html
async function fetchRepoDetails(repoId) {
  try {
    // Faz a requisição para obter os detalhes do repositório com base no ID
    const response = await fetch(`../db/db.json`); // Substitua pelo caminho correto do seu arquivo JSON
    const data = await response.json();

    // Encontra o repositório com base no ID
    const repositorio = data.repositorios.find(repo => repo.id === repoId);

    // Redireciona para a página repo.html com os detalhes do repositório como parâmetros de consulta
    window.location.href = `repo.html?id=${repositorio.id}&name=${repositorio.name}&description=${encodeURIComponent(repositorio.description || '')}&html_url=${repositorio.html_url}&stargazers_count=${repositorio.stargazers_count}&watchers_count=${repositorio.watchers_count}&created_at=${repositorio.created_at}&topicos=${repositorio.topicos}`;
  } catch (error) {
    console.error('Erro ao carregar dados do repositório:', error);
  }
}

fetchData();
