<div align='justify'>

# JavaScript Testing

## Mocks

Os mocks são utilizados principalmente em testes de unidade. 

Nos testes em geral, você testa as suas funcionalidas do ponto A -> B. Mas se você precisa testar do ponto B -> C, você irá testar o ponto A -> B novamente? É aí que entra os mocks.

Você cria objetos que partem do princípio que o teste A está funcionando, guarda o resultado em um objeto fixo, para que você consiga testar de B -> C sem depender do A.

Com os mocks você pode criar objetos diferentes fixados para testar cenários diferentes e, com isso, conseguir testar todos os cenários possíveis.

## Stubs

São utilizados para substituir comportamentos de um sistema, por objetos estáticos. Onde você também cria diferentes mocks, para cada cenário específico.

Ex: 
  - Banco de dados externo, que te cobra pelo uso!
  - API de cep que você utiliza externa, onde você pode mockar e definir o retorno para cada cenário!

PS: Nossos testes de unidade, não deve depender de nenhuma conexão ou serviço externo! Você parte do princípio que o sistema de terceiro funciona corretamente.

No exemplo da [aula-02-stubs](./aula-02-stubs/), nós utilizamos a biblioteca sinon.js para fazer um stub da API do star wars. Dessa forma, nós mockamos o retorno da API e fizemos um stub para sempre que chamar a BASE_URL_1, irá retornar o resultado do mock.tatooine, o mesmo vale para a BASE_URL_2.

```js
  const service = new Service()
  const stub = sinon.stub(service, service.makeRequest.name)

  stub
    .withArgs(BASE_URL_1)
    .resolves(mocks.tatooine)

  stub
    .withArgs(BASE_URL_2)
    .resolves(mocks.alderaan)
```


## Spies

Os spies servem para observar as suas funções, validando quantas vezes elas foram chamadas... com quais parâmetros e quais resultados elas retornaram. É extremamente útil também em cenários onde você cria funções recursivas, ou tem uma lógica complexa com condições de parada.

No exemplo da [aula-03-spies](./aula-03-spies/), nós utilizamos o sinon.js para criar "spy" da nossa função execute do fibonacci.

Fizemos o teste para saber quantas vezes a função foi chamada, usando o `callCount` do método `spy` do sinon.js:

```js
  {
    const fibonacci = new Fibonacci()
    const spy = sinon.spy(fibonacci, fibonacci.execute.name)
    const expectedCallCount = 4
    
    // .next, for await e rest/spread
    for await (const i of fibonacci.execute(3)) {}

    assert.deepStrictEqual(spy.callCount, expectedCallCount)
  }
```

Fizemos o teste também para saber o que a função retorna na sua terceira chamada usando o `spy.getCall(2)`. Dado que é uma função recursiva.

```js
  {
    const fibonacci = new Fibonacci()
    const spy = sinon.spy(fibonacci, fibonacci.execute.name)
    const [...results] = fibonacci.execute(5)
    const { args } = spy.getCall(2)
    const expectedResult = [ 0, 1, 1, 2, 3 ]
    const expectedParams = Object.values({
      input: 3,
      current: 1,
      next: 2
    })
    assert.deepStrictEqual(args, expectedParams)
    assert.deepStrictEqual(results, expectedResult)
  }
``` 

## Testes End To End (E2E)

Os testes E2E testam as rotas da nossa aplicação, ou seja, testa como o cliente vai interagir com a nossa aplicação, os dados que serão enviados e retornados da nossa api.

No exemplo da [aula-04-coverage-e2e](./aula-04-coverage-e2e/), nós utilizamos o mocha, supertest e o instanbul (nyc) para testar as rotas da nossa aplicação. Além disso, criamos um arquivo de configurações do nyc [.nycrc.json](./aula-04-coverage-e2e/.nycrc.json), que só permite que o test coverage passe, se tudo estiver 100% coberto e testado.


## Test Drive Development e Behaviour Driven Development

Test Drive Development (TDD) -> A metodologia TDD diz que devemos seguir um ciclo de processo. Primeiro escrevemos um teste que falha, adicionamos a implementação e o teste passa... refatoramos o código... e o fluxo se repete até que as suas funções fiquem atomicas, com a menor interdependência possível.

Behaviour Driven Development (BDD) -> É um conjunto de práticas que deveria ser utilizado junto com TDD. Ele tem uma relação mais próxima com a área de negócios e te diz o que você deveria testar com uma linguagem mais obliqua. Onde os analistas escrevem as especificações das regras, do ponto de vista de negócio/não técnico. Ex: Como usuário do sistema, eu quero saber a multiplicação de dois valores, onde eu passo 2 e 5 e me retorna 10. 

O BDD fala sobre como o sistema deve se comportar.

Referencias:

- https://medium.com/javascript-scene/behavior-driven-development-bdd-and-functional-testing-62084ad7f1f2
- https://codeutopia.net/blog/2015/03/01/unit-testing-tdd-and-bdd/#:~:text=When%20applied%20to%20automated%20testing,implementation%20detail%20in%20unit%20tests.&text=You%20should%20not%20test%20implementation%2C%20but%20instead%20behavior
- https://www.npmjs.com/package/mocha-cucumber
- https://www.sitepoint.com/bdd-javascript-cucumber-gherkin/

Projeto: [aula-05-projeto-tdd-bdd](./aula-05-projeto-tdd-bdd/)

</div>