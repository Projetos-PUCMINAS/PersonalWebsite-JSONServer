//função
async function fetchData() {
    try {
      const response = await fetch('../db/db.json');
      const data = await response.json();

      document.getElementById('imagem-perfil').src = data.avatar_url;
      document.getElementById('texto-perfil').getElementsByTagName('h3')[0].textContent = data.name;
      document.getElementById('texto-perfil').getElementsByTagName('p')[0].textContent = data.bio;
      document.getElementById('localizacao').textContent = data.location;
      document.getElementById('seguidores').textContent = data.followers;
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  }

  fetchData();