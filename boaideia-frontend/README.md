# **BOA IDEIA**

## Instalação do projeto front-end

* Instalar o node.js

`sudo apt-get install node`

---

* Instalar o yarn

`curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -`

`echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list`

`sudo apt update && sudo apt install yarn`

---

* Entrar na raiz do projeto e instalar as dependências

`yarn`

---

* Executar o projeto em ambiente de dev

`yarn dev`

---

* Buildar o projeto

`yarn build`

---

* Rodar em módo de prod

`yarn start`