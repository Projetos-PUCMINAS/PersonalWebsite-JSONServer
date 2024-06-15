const axios = require('axios');
const fs = require('fs');

async function getdadosusuario(nomeusuario) {
  try {
    const response = await axios.get(`https://api.github.com/users/${nomeusuario}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao obter dados do usuário ${nomeusuario}:`, error);
    return null;
  }
}

async function getRepositoriosUsuario(nomeusuario) {
  try {
    const response = await axios.get(`https://api.github.com/users/${nomeusuario}/repos`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao obter dados dos repositórios do usuário ${nomeusuario}:`, error);
    return null;
  }
}

async function getDadosColaboradores(usernames) {
  const colaboradores = [];

  for (const username of usernames) {
    const dadosUsuario = await getdadosusuario(username);
    if (dadosUsuario) {
      const colaborador = {
        id: dadosUsuario.id,
        name: dadosUsuario.name,
        avatar_url: dadosUsuario.avatar_url
      };
      colaboradores.push(colaborador);
    }
  }

  return colaboradores;
}

async function salvarDados() {
  const nomeusuario = 'marcosffp';
  const dadosusuario = await getdadosusuario(nomeusuario);
  const dadosRepositorios = await getRepositoriosUsuario(nomeusuario);
  const colaboradores = await getDadosColaboradores([
    'alvimdev',
    'joaogscc',
    'gabialvarenga',
    'luisajardim',
    'CarlosJFigueiredo'
  ]);

  if (dadosusuario && dadosRepositorios && colaboradores) {
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
      avatar_url: dadosusuario.avatar_url
    };

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
      topics: repo.topics
    }));

    const carrossel = [
      {
        src: "../public/assets/img/imagem_cloud_tecnologia.jpg",
        alt: "Fluxograma da tecnologia em nuvem"
      },
      {
        src: "../public/assets/img/image_cloud_computing.webp",
        alt: "Inforgrafico de cloud computing"
      },
      {
        src: "../public/assets/img/imagem_tecnologia_mundo.jpg",
        alt: "Tecnologia Quântica por volta do mundo"
      },
      {
        src: "../public/assets/img/imagem_de_represetacao_tq.jpg",
        alt: "Representação da tecnologia quântica"
      },
      {
        src: "../public/assets/img/imagem_tecnologia_quantica.jpg",
        alt: "Infografico da tecnologia em nuvem"
      }
    ];

    const dadosFinais = {
      usuario: githubUser,
      repositorios: repositoriosArray,
      colaboradores: colaboradores,
      carrossel: carrossel
    };

    fs.writeFileSync('./db/db.json', JSON.stringify(dadosFinais, null, 2));
    console.log('Dados do GitHub adicionados ao arquivo db.json com sucesso!');
  } else {
    console.log('Erro ao obter dados do usuário, dos repositórios ou dos colaboradores no GitHub');
  }
}

salvarDados();
