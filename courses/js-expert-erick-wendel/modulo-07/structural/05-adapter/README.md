# Adapter

Você planeja fazer um sistema que vai emitir boletos de diversas instituições financeiras. Você baixou as respectivas bibliotecas de integração de cada um dos bancos. Mas a forma de emitir um boleto no Bank Of America é diferente da forma de emitir do Itaú, por exemplo. 

No bank of america o método se chama `transmit` e no Itaú se chama `emitir`. Com o design pattern adapter, você garante que vai existir um método único, por exemplo, para emitir um boleto, independente do banco.

O adapter é bastante utilizado nesse caso de manter a compatibilidade entre diferentes funções que fazem a mesma coisa, mas com nomes diferentes. O padrão adapter vem justamente disso, ser um adaptador. Quem já não sofreu com tomadas diferentes em viagens internacionais? O adaptador de tomada é um exemplo de adapter.

## Caso de Uso

Vamos criar um sistema que obtem dados de arquivos xml e json. Vamos simular que são api's diferentes, que não podem mudar de nome. Vamos criar classes adaptadoras que vão garantir as assinaturas.