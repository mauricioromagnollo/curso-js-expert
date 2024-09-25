# Módulo 02 - **JavaScript Testing**

Observacão:

> Para executar qualquer um dos exemplos, lembre de conferir a versão do Node.js `node -v` e instalar as dependências `npm install`.

## Aula 01 - Trabalhando com **Mocks**

Imagine que você está testando uma aplicação do ponto A ao ponto C.

A &rarr; B &rarr; C

Agora vamos supor que do ponto A ao ponto B já foi testado e está tudo funcionando corretamente. Então para testar do ponto B ao ponto C, você precisa "simular" o ponto A ao ponto B ou melhor, você precisa "mockar" o ponto A ao ponto B.

Essa é a função dos Mocks, são objetos que você utiliza simulando um resultado, podendo ser positivo ou negativo, para que você possa testar e moldar o comportamento do seu código, trazendo diversos cenários para que você possa testar.

Então podemos dizer que os Mocks são estados da nossa aplicação que simulam um comportamento, um retorno, um erro, etc. Nos ajudando a evitar retrabalho e a testar de forma mais eficiente diferentes cenários.

O exemplo dessa aula se encontra no diretório **[aula-01-mocks](./aula-01-mocks/)**, onde foram criados mocks no formato de arquivos .csv (poderia ser JSON, XML, JavaScript, etc) para simular os diferentes tipos de .csv que poderiam ser recebidos pela aplicação e o código, incluindo o teste, foi escrito no diretório **src**.

Observações:

- O objetivo é converter para JSON e retornar o conteúdo do arquivo .csv.
- Os requisitos estão descritos no arquivo **[requirements.txt](./aula-01-mocks/requirements.txt)**.
- A versão do Node.js se contra no arquivo .node-version e para executar os testes basta rodar o comando `npm test`.
- Os testes foram escritos de forma "simples" sem utilizar nenhum framework ou bliblioteca de testes. Curiosidade: Os testes do Node.js são escritos dessa forma no repositorio oficial do Node.js.

## Aula 02 - Trabalhando com **Stubs**

Os stubs servem para substituir algum comportamento do sistema/função que você não quer que seja executado durante o teste. Por exemplo, imagine que você tem uma função que faz uma requisição para uma API externa e você não quer que essa requisição seja feita durante o teste, então você cria um stub para substituir essa função.

Ou seja, os stubs substituem um comportamento específico, retornando um mock específico, para que você possa testar o comportamento do seu código.

Os nossos testes não devem depender de serviços externos ou de conexão com a internet, então os stubs são muito úteis para substituir essas dependências.

O exemplo dessa aula se encontra no diretório **[aula-02-stubs](./aula-02-stubs/)**, onde utilizamos a API do Star Wars <https://swapi.dev/> para buscar informações sobre os planetas e criamos um stub para substituir essa requisição nos testes, ou seja, não devemos fazer requisições em API's externas nos testes.
