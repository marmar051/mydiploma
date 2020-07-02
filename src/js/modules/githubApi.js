export default class GithubApi {
  constructor(options) {
    this.options = options;
  }

  //Получение коммитов от Github
  getCommits() {
    return (fetch(`https://api.github.com/repos/MARMAR051/mydiploma/commits?sha=master`, {
      method: 'GET',
      headers: {
          authorization: 'OAUTH-TOKEN'
      }
    })
    .then((res) => {
      return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => console.log(err))
    );
  }
}