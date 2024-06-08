const axios = require('axios');
const fs = require('fs');

async function getUserData(username) {
  try {
    const response = await axios.get(`https://api.github.com/users/marcosffp`);
    return response.data;
  } catch (error) {
    console.error('Erro ao obter dados do usuário:', error);
    return null;
  }
}

async function main() {
  const username = 'marcosffp'; // Define o username do usuário do GitHub que você deseja obter
  const userData = await getUserData(username);

  if (userData) {
    // Cria um objeto para armazenar os dados do usuário
    const githubUser = {
      id: userData.id,
      login: userData.login,
      name: userData.name,
      bio: userData.bio,
      location: userData.location,
      followers: userData.followers,
      following: userData.following,
      public_repos: userData.public_repos,
      public_gists: userData.public_gists,
    };

    // Converte o objeto para JSON
    const json = JSON.stringify(githubUser, null, 2);

    // Cria um arquivo JSON e escreve os dados nele
    fs.writeFileSync('./db/db.json', json);

    console.log('Dados do GitHub adicionados ao arquivo github_user.json com sucesso!');
  } else {
    console.log('Usuário não encontrado no GitHub');
  }
}

main();