# MCP ClickUp Helper

## 📋 Descrição

O MCP ClickUp Helper é um servidor que facilita a interação com a API do ClickUp utilizando o Model Context Protocol (MCP). Esta ferramenta permite consultar e atualizar tarefas no ClickUp diretamente através de um MCP Client.

## 🚀 Tecnologias

- **TypeScript**: Linguagem principal do projeto
- **Node.js**: Ambiente de execução
- **MCP SDK**: @modelcontextprotocol/sdk para integração com o protocolo MCP
- **Axios**: Cliente HTTP para comunicação com a API do ClickUp
- **Zod**: Validação de esquemas
- **Dotenv**: Gerenciamento de variáveis de ambiente

## 🛠️ Requisitos

- Node.js 16 ou superior
- Uma conta no ClickUp com uma chave de API válida
- ID da equipe do ClickUp

## ⚙️ Configuração

1. Clone o repositório
2. Instale as dependências:
   ```
   npm install
   ```
3. Configure as variáveis de ambiente no arquivo `.env`:
   ```
   CLICKUP_API_KEY=sua_chave_api_do_clickup
   TEAM_ID=seu_id_de_equipe
   ```

## 🏗️ Construção

Para compilar o projeto, execute:

```
npm run build
```

## 🚀 Execução

Após a compilação, você pode executar a ferramenta usando o MCP Inspector:

```
npx @modelcontextprotocol/inspector -e CLICKUP_API_KEY=sua_chave_api_do_clickup -e TEAM_ID=seu_id_de_equipe node build/index.js
```

Ou configure as variáveis no arquivo `.env` e execute:

```
npx @modelcontextprotocol/inspector node build/index.js
```

## 🧩 Funcionalidades

- Consultar detalhes de tarefas no ClickUp
- Atualizar o status de tarefas no ClickUp
- Integração com o Model Context Protocol para uso em fluxos de trabalho de IA

## 📄 Licença

Este projeto está disponível como software de código aberto.

## 👨‍💻 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir um pull request ou uma issue. 