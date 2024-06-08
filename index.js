const axios = require('axios');
const fs = require('fs');

// Função para obter dados do usuário do GitHub
async function getdadosusuario(nomeusuario) {
  try {
    const response = await axios.get(`https://api.github.com/users/marcosffp`);
    return response.data;
  } catch (error) {
    console.error('Erro ao obter dados do usuário:', error);
    return null;
  }
}

// Função para obter dados dos repositórios do usuário do GitHub
async function getRepositoriosUsuario(nomeusuario) {
  try {
    const response = await axios.get(`https://api.github.com/users/marcosffp/repos`);
    return response.data;
  } catch (error) {
    console.error('Erro ao obter dados dos repositórios:', error);
    return null;
  }
}

// Função para salvar dados do usuário e dos repositórios em um único arquivo JSON
async function salvarDados() {
  const nomeusuario = 'marcosffp'; // Define o nome do usuário do GitHub que você deseja obter
  const dadosusuario = await getdadosusuario(nomeusuario);
  const dadosRepositorios = await getRepositoriosUsuario(nomeusuario);

  if (dadosusuario && dadosRepositorios) {
    // Cria um objeto para armazenar os dados do usuário
    const githubUser = {
      id: dadosusuario.id,
      login: dadosusuario.login,
      name: dadosusuario.name,
      bio: dadosusuario.bio,
      location: dadosusuario.location,
      followers: dadosusuario.followers,
      following: dadosusuario.following,
      public_repos: dadosusuario.public_repos,
      public_gists: dadosusuario.public_gists,
      avatar_url: dadosusuario.avatar_url,
    };

    // Cria um array para armazenar os dados dos repositórios
    const repositoriosArray = dadosRepositorios.map(repo => ({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description,
      html_url: repo.html_url,
      stargazers_count: repo.stargazers_count,
      watchers_count: repo.watchers_count,
      language: repo.language,
      forks_count: repo.forks_count,
      open_issues_count: repo.open_issues_count,
      created_at: repo.created_at,
      updated_at: repo.updated_at,
      pushed_at: repo.pushed_at,
    }));

    // Cria um objeto final para armazenar os dados do usuário e dos repositórios
    const dadosFinais = {
      usuario: githubUser,
      repositorios: repositoriosArray,
    };

    // Converte o objeto final para JSON
    const json = JSON.stringify(dadosFinais, null, 2);

    // Cria um arquivo JSON e escreve os dados nele
    fs.writeFileSync('./db/db.json', json);

    console.log('Dados do GitHub adicionados ao arquivo dados_github.json com sucesso!');
  } else {
    console.log('Erro ao obter dados do usuário ou dos repositórios no GitHub');
  }
}

salvarDados();
