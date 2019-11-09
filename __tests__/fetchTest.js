const fetch = require('isomorphic-fetch');

const { requestGET } = require('../src/actions/ActionCreators.ts');

async function tes() {
  requestGET('https://jsonplaceholder.typicode.com/todos/1')
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

tes();
