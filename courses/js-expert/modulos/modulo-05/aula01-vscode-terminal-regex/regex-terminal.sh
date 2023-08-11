# a partir da pasta raiz
find . -name *.test.js
# Ignorar tudo que estiver dentro de node_modules
find . -name *.test.js -not -path "*node_modules**"

find . -name *.js -not -path "*node_modules**"

npm i -g ipt