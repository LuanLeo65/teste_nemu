# Teste Nemu
API de demonstração para leitura e análise de dados de jornada do usuário.

#Pré-requisitos
Node-js >= 18

1- Para acessar a API, deve entrar ate a basta backend, dentro da pasta teste_nemu

cd teste_nemu/backend

2- Depois, basta iniciar o projeto para baixar as dependencias

npm i

3-Criar o arquivo .env e colocar o valor de PORT na variavel de ambiente, com o valor que desejar

4-Compilar o codigo usando o comando:

npm run build

5-Para ver os testes digitar o comando: 

npm test

6- Para iniciar a API:

npm run dev

Apos iniciar a API, acesse 'GET localhost:(valor colocado na port)/journeys' 
No corpo, mandar no form-data o arquivo xlsx, com a chave file


