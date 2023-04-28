
# Desafio BackEnd   

Projeto realizado como teste para a empresa UOL EdTech.

As principais tecnologias utilizadas foram: Nestjs, GraphQL e MongoDB.


## Como rodar

Localmente

```bash
  npm install
  npm run seed
  npm start
```
    
Com Docker

```bash
  docker compose -f "docker-compose.yml" up -d --build 
```

## Como Testar
Criei [essa collection no postman](https://www.postman.com/dark-rocket-623610/workspace/public/collection/27162979-c277d98d-5390-42ab-886a-a73b15b16c77?action=share&creator=27162979) onde já tem todas as Queries e Mutations com os inputs necessários e algumas automações, como salvar o token e o id do ultimo Content gerado para usar nas proximas chamadas.

Não criei sistema de autenticação com senha, então é só mandar o email no login que já vai autenticar e devolver o Authorization token.

Rodando a seed vai criar dois usuários, um com a role admin e outro com a role user.

## Testes Automatizados
```bash
  npm run test 
```