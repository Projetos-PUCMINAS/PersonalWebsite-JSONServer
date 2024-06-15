async function fetchData() {
  try {
    const response = await fetch('../db/db.json');
    const data = await response.json();

    const usuario = data.usuario;
    const repositorios = data.repositorios;

    document.getElementById('imagem-perfil').src = usuario.avatar_url;
    document.getElementById('texto-perfil').getElementsByTagName('h3')[0].textContent = usuario.name;
    document.getElementById('texto-perfil').getElementsByTagName('p')[0].textContent = usuario.bio;
    document.getElementById('localizacao').textContent = usuario.location;
    document.getElementById('seguidores').textContent = usuario.followers;

    const repositoriosSection = document.getElementById('repositorios');
    const repositoriosContainer = repositoriosSection.querySelector('.cardss .row');

    repositoriosContainer.innerHTML = '';

    repositorios.forEach(repo => {
      const card = document.createElement('div');
      card.classList.add('col');

      card.innerHTML = `
        <div class="card h-100 repo" onclick="fetchRepoDetails(${repo.id})"> 
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

    createCarousel(data.carrossel);
    createColaboradores(data.colaboradores);
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
  }
}

function createCarousel(carrosselItems) {
  const indicators = document.querySelector('.carousel-indicators');
  const inner = document.querySelector('.carousel-inner');

  indicators.innerHTML = '';
  inner.innerHTML = '';

  carrosselItems.forEach((item, index) => {
    const indicator = document.createElement('button');
    indicator.type = 'button';
    indicator.dataset.bsTarget = '#carouselExampleIndicators';
    indicator.dataset.bsSlideTo = index;
    indicator.ariaLabel = `Slide ${index + 1}`;
    if (index === 0) {
      indicator.classList.add('active');
      indicator.ariaCurrent = 'true';
    }
    indicators.appendChild(indicator);

    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');
    if (index === 0) {
      carouselItem.classList.add('active');
    }

    const img = document.createElement('img');
    img.src = item.src;
    img.classList.add('d-block', 'w-100');
    img.alt = item.alt;

    carouselItem.appendChild(img);
    inner.appendChild(carouselItem);
  });
}

function createColaboradores(colaboradores) {
  const trabalhoContainer = document.querySelector('.trabalho');

  trabalhoContainer.innerHTML = '';

  colaboradores.forEach(colaborador => {
    const colegaDiv = document.createElement('div');
    colegaDiv.classList.add('colega');

    const nome = colaborador.name || 'Colaborador';
    const githubUsername = colaborador.name ? colaborador.name.toLowerCase().replace(/\s/g, '') : 'github';

    colegaDiv.innerHTML = `
      <img src="${colaborador.avatar_url}" alt="imagem de perfil do ${nome}" width="120px" height="120px">
      <h3><a href="https://github.com/${githubUsername}" target="_blank">${nome}</a></h3>
    `;

    trabalhoContainer.appendChild(colegaDiv);
  });
}

async function fetchRepoDetails(repoId) {
  try {
    const response = await fetch(`../db/db.json`);
    const data = await response.json();

    const repositorio = data.repositorios.find(repo => repo.id === repoId);

    window.location.href = `repo.html?id=${repositorio.id}&name=${repositorio.name}&description=${encodeURIComponent(repositorio.description || '')}&html_url=${repositorio.html_url}&stargazers_count=${repositorio.stargazers_count}&watchers_count=${repositorio.watchers_count}&created_at=${repositorio.created_at}&topicos=${repositorio.topicos}`;
  } catch (error) {
    console.error('Erro ao carregar dados do repositório:', error);
  }
}

fetchData();
