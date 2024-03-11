# Readme - Aplicação React.js
Este documento descreve a estrutura e as funcionalidades da aplicação React.js, que utiliza a API de gerenciamento de clientes mencionada anteriormente.

## Estrutura da Aplicação
A aplicação React.js foi desenvolvida para interagir com a API de gerenciamento de clientes, oferecendo uma interface amigável para realizar operações CRUD e visualizar informações sobre a ordem de visitação dos clientes.

## Componentes Principais
- **Listagem de Clientes (/customers):** A tela inicial da aplicação exibe uma lista de clientes obtida através da rota GET /customers da API. Cada cliente é exibido com informações básicas, e botões de ação estão disponíveis para cadastrar, editar e excluir clientes.

- **Cadastro de Clientes (/customers/insert):** A rota /customers/insert permite adicionar novos clientes à base de dados. Ao acessar essa rota, o usuário é apresentado a um formulário de cadastro para inserir as informações do novo cliente.

- **Edição de Clientes (/customers/update/{id}):** A rota /customers/update/{id} possibilita a edição dos dados de um cliente específico. Ao clicar no botão de edição na tela de listagem, o usuário é direcionado para um formulário preenchido com as informações do cliente selecionado.

- **Exclusão de Clientes (/customers/delete/{id}):** A rota /customers/delete/{id} permite a remoção de um cliente específico. Ao acionar o botão de exclusão na tela de listagem, o usuário é direcionado para uma confirmação antes de excluir o cliente.

- **Ordem de Visitação (/customers/calcular-rota):** O botão "Ordem de Visitação" aciona a rota POST /customers/calcular-rota da API. O resultado dessa chamada é utilizado para exibir uma modal na qual são apresentados os clientes na ordem ideal de visitação, conforme calculado pela função calcularRota da API.

## Modal de Ordem de Visitação
A modal exibe a lista de clientes na ordem calculada pela função calcularRota da API. Essa funcionalidade oferece ao usuário uma visão rápida e eficiente da sequência recomendada para visitar os clientes.

## Configuração e Execução
Para executar a aplicação, siga os passos abaixo:

- Certifique-se de ter o Node.js instalado na sua máquina.
- Clone este repositório e navegue até o diretório da aplicação.
- Execute o comando abaixo para instalar as dependências.

```javascript
npm install
```

- Execute o comando abaixo para iniciar o servidor de desenvolvimento.

```javascript
npm start
```

- A aplicação estará disponível em http://localhost:3000.