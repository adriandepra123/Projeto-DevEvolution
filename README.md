*Introdução*

Esse trabalho consiste no desenvolvimento de uma aplicação referente a produto x pedidos, utilizando os conhecimentos que foram aprendidos no curso. utilizando a linguagem JavaScript e o NODE.js como interpretador para o beck-end, foram utilizados alguns frameworks como por exemplo: Passport, JWT, express etc...
Banco de dados utilizado foi o MongoDB.


Desenvolvimento

Foram criadas diversas rotas de acordo com o solicitado na proposta do trabalho, todas passando pela autenticação do Passport e tokens JWT.

O que vai precisar para rodar o projeto é:

* Node -> pode verificar se já possui instalado com o comando: node -v
* npm  -> pode verificar se já possui instalado com o comando: npm -v
* MongoDB -> pode verificar se já possui instalado com o seguinte comando: mongod --version

As dependências utilizadas foram as seguintes:

* "dependencies": {
*    "bcrypt": "^5.1.0",
*    "body-parser": "^1.20.2",
*    "cors": "^2.8.5",
*    "dotenv": "^16.0.3",
*    "ejs": "^3.1.9",
*    "express": "^4.18.2",
*    "git": "^0.1.5",
*    "jsonwebtoken": "^9.0.0",
*    "mongoose": "^7.0.2",
*    "passport": "^0.6.0",
*    "passport-jwt": "^4.0.1",
*    "passport-local": "^1.0.0"
*  },
*  "devDependencies": {
*    "nodemon": "^2.0.21"
*  },
  
Testes e dificuldades:
  Os testes realizados foram através do programa Insomnia enviando requisições para as rotas criadas, tive bastante problemas com a parte de autenticação
  do tokem jwt, onde não estava criando o token corretamente, dificultando a usabilidade nas rotas.
  Ao final do projeto não consegui testar 100% todas as rotas, podem ser encontrato bugs e caso isso ocorra, poderá reportar a mim aqui pelo GitHub mesmo.
  
Conclusão:

Foi um trabalho bem desafiador tendo em vista o pouco tempo disponível para realização.
