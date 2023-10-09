
# Ruby Agenda


## Sobre o projeto

Projeto completo modelo de um sistema de `Agenda de Contatos`, integrando `API`, `Frontend` e `Banco de Dados`.

* Integração e auxílio na busca de endereços por `CEP`, através de requisição ao `Via CEP`.
* Geolocalização de endereços via `Geocoder`, para definir `Latitude` e `Longitude` de um contato.
* Sistema de criptografia de senhas e tokens utilizando `JWT` e `BCrypt`.


A API oferece endpoints para criar, listar, atualizar e excluir contatos pessoais.

Você pode acessar a documentação completa dos endpoints em [Collection Postman](https://documenter.getpostman.com/view/30167854/2s9YJbzNNU).

### Tecnologias

#### Frontend
- Linguagem `Vue.js (v3)` utilizando framework `Quasar + Vite (v2.3)`;
#### Backend
- Linguagem `Ruby (v2.7.8)` utilizando framework `Ruby on Rails (v5.2.8)`
- Banco de dados `Postgresql@15`

### Instalação

Clone o projeto
```bash
git clone https://github.com/MarkoAurelio/ruby-agenda.git
```

Instale as dependências no diretório principal
```bash
cd ruby-agenda
yarn
```

Entre no diretório da api e instale as dependências e configure o banco de dados
```bash
cd ruby-agenda/api
bundle install
rails db:create
rails db:migrate
```

Vamos alimentar o banco com alguns dados ficticios
```bash
rails db:seed
```

Entre no diretório do frontend e instale as dependências
```bash
cd ruby-agenda/front
yarn
```

### Rodando em modo de desenvolvimento

API + Frontend utilizando `npm-run-all`
```bash
cd ruby-agenda
npm run dev
```

Somente API
```bash
cd ruby-agenda/api
rails s
```

Somente Frontend
```bash
cd ruby-agenda/front
quasar dev
```
[Lista de comandos Quasar - DEV](https://quasar.dev/quasar-cli-webpack/commands-list#dev)

### Rodando testes

Inserido alguns testes na API para garantir o bom funcionamento da plataforma. Para rodá-los, dirija-se ao diretório da API

```bash
cd ruby-agenda/api
bundle exec rspec
```
