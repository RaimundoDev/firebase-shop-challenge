# Firebase Loja Fullstack 

Essa aplicação foi criada usando ReactJS (com create-react-app) para o frontend e ExpressJS para o backend com Firebase, usando as Functions para prover uma API REST.

## Instalação

Para utilizar, primeiramente instale os módulos.

```
npm install
```

Após isso, é necessário que instale, se já não tiver, as ferramentas de [linha de comando do Firebase](https://firebase.google.com/docs/cli/)
Será necessário fazer login na sua conta do google para usar a ferramenta.

```
npm i -g firebase-tools
firebase login
```
Após a instalação e realizado o processo de login, inicie o firebase no diretório do projeto. Selecione as opções de `hosting`, `functions`, `firestore` e `emulators`.

```
firebase init
```

O próximo passo será escolher um projeto para ser associado a este. Se não existe um projeto criado, faça isso antes de prosseguir. (É necessário criar [banco de dados no firestore](https://firebase.google.com/docs/firestore/quickstart), caso contrário o processo não irá funcionar.)

Após a criação do projeto, escolha a opção `> Use an existing project` e selecione o projeto recém criado.

### Functions Setup

Nas configurações das Funções (Functions Setup), seja cuidadoso para não sobrescrever o arquivo **index.js**. Os outros arquivos podem ser sobrescritos.

Em seguida, instale as dependências quando for solicitado.

### Hosting Setup

Quando solicitado a qual diretório deseja usar como publico, escreva **build**. Após isso, confirme que deseja configurar como um aplicativo de apenas uma página. 

### Emulators Setup

Escolha os seguintes emuladores: `Functions Emulator`, `Firestore Emulator` e `Hosting Emulator`.Não é necessário modificar os valores padrões das portas, mas pode ser realizado sem problemas. Inicie os emuladores com o comando `firebase emulators:start`.

## API

A API foi criada usando as functions do Firebase. Após um deploy bem sucedido, você irá encontrar o link da sua API no painel de controle do Firebase, em funções. No caso dos emuladores, você receberá na terminal essa informação.

Procure por uma linha parecida com essa:
> ✔  functions[us-central1-webApi]: http function initialized (http://localhost:5001/fir-shop-fullstack-76e03/us-central1/webApi).

Copie o link da API e coloque no arquivo **apiURL.js**, localizado na pasta **./src/** e anexe no final **/api/products/**.

```javascript
// Exemplo 

export const apiURL = "http://localhost:5001/fir-shop-fullstack-76e03/us-central1/webApi/api/products/"
```

A API espera recebe os dados no `body` da requisição, e retorna erro caso os dados entregues não sejam os esperados.

```javascript
// Exemplo de objeto 

{
    "name" : "Game",
    "img" : "https://image.jpeg",
    "price" : 100,
    "platform" : ["Windows", "Mac", "Linux"],
    "genres" : ["Ação", "Aventura"]
}
```

### Exemplos de uso da API com Fetch

```javascript

const URL = 'http://localhost:5001/fir-shop-fullstack-76e03/us-central1/webApi/api/products/';

// Metódo GET (Retorna todos os usuários);

const allProducts = async () => {
  await (fetch(URL)
    .then((res) => console.log(res.json));
};


// Método GET (Retorna um usuário)

const product = async (productId) => {
await (fetch(`${URL}${productId}`)
    .then((res) => console.log(res.json));
};


// Método POST (Adiciona um produto)

const addProduct = (productData) => {
  fetch(URL, {
    method: 'POST',
    mode: 'cors',
    headers: {'content-type': 'application/json'},
    body: JSON.stringfy(productData);
  });
};


// Método DELETE (Delete um usuário)

const deleteProduct = (productId) => {
  fetch(`${URL}${productId}`, {
    method: 'delete',
    mode: 'cors'
  });
};


// Método PUT (Edita um produto)

const updateProduct = (productId, productData) => {
  fetch(`${URL}${productId}`, {
    method: 'PUT',
    mode: 'cors',
    headers: {'content-type': 'application/json'},
    body: JSON.stringfy(productData);
  });
};

```

### Acessando a página

Após realizar as modificações no arquivo **apiURL.js**, use o comando `npm run build` para criar uma versão de produção ou use `npm run start` para usar a versão de desenvolvimento. Após isso inicie os emuladores.

```
npm run build # ou npm run start
firebase emulators:start
```

## Página Inicial

Se tudo correr bem, verá a página inicial.

## Deploy

Para realizar o deploy, se não houver nenhum problema, basta digitar o seguinte abaixo(**Não é possível fazer o deploy da aplicação com o [plano gratuito Spark](https://firebase.google.com/pricing/).**):

```
firebase deploy
```

## create-react-appp

Todos os comandos usualmente disponíveis pelo `create-react-app` estão disponíveis, e é possível usar o `npm start` para testar o frontend, mesmo com os emuladores funcionando.

`npm start`

`npm test`

`npm run build`

`npm run eject`
