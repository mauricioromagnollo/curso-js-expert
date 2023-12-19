# Template Method

## Cenário

Imagine que você está implementando um sistema de CRUD de usuários. E você implementou as funções de criar e listar usuários. Agora uma pessoa do seu time precisa implementar a função de atualizar um usuário. 

Ao criar essa função, a pessoa não observou a forma que você implementou as funções de criar e listar usuários e acabou implementando de uma forma diferente. Por exemplo, ela não abriu e fechou a conexão com o banco a cada requisição, ela não validou os dados de entrada, ela gerou um vazamento de memória...

Será que existe alguma forma de você garantir, que independente do método que a pessoa implemente, ela vai seguir um padrão que você definiu? Por exemplo: Abrir conexão, validar os dados, fechar conexão... e na ordem que você definiu?

É para isso que serve o padrão Template Method, a proposta do padrão é garantir um fluxo de métodos definido a sequência a ser executada. Agora você vai criar uma classe abstrata ou interface, que define uma sequência de passos e esses passos são implementados por classes filhas, definindo a ordem e a sequência de passos.