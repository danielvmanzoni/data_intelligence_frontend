# Data Intelligence Frontend - Demo

Este é o frontend do sistema de Data Intelligence, uma aplicação multi-tenant para gestão de tickets e suporte.

> ⚠️ **IMPORTANTE**: Esta demo contém apenas as funcionalidades de gestão de tickets implementadas e testadas. Outras funcionalidades mencionadas estão em desenvolvimento e não devem ser consideradas para demonstração.

## ✨ Funcionalidades Disponíveis para Demo

1. **Autenticação**
   - Acesso via `/crown/login`
   - Login com email e senha

2. **Gestão de Tickets** (`/crown/tickets`)
   - ✅ Listagem de tickets
   - ✅ Criação de novos tickets
   - ✅ Visualização detalhada
   - ✅ Atualização de status e prioridade
   - ✅ Interface otimista para melhor experiência

> 🚧 **Nota**: Outras rotas e funcionalidades estão em desenvolvimento e não fazem parte desta demonstração.

## 🚀 Configuração do Ambiente

### Pré-requisitos

- Node.js 18+ (recomendado: 20.x)
- pnpm 8+ (recomendado: última versão)
- API rodando localmente (veja a seção API abaixo)

### Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITORIO]
cd data_intelligence_frontend
```

2. Mude para a branch demo:
```bash
git checkout demo
```

3. Instale as dependências:
```bash
pnpm install
```

4. Configure as variáveis de ambiente:
```bash
# Crie um arquivo .env.local na raiz do projeto com:
NEXT_PUBLIC_API_URL=http://localhost:3010
```

5. Inicie o servidor de desenvolvimento:
```bash
pnpm dev
```

## 🔑 Acessando a Demo

1. Acesse: `http://localhost:3000/crown/login`
2. Use as credenciais:
   - Email: `admin@crown.com`
   - Senha: `123456`
3. Após o login, você será redirecionado para o dashboard
4. Navegue para a seção de tickets em `/crown/tickets`

### Fluxo de Demonstração Recomendado

1. **Login**
   - Acesse a página de login
   - Use as credenciais fornecidas

2. **Gestão de Tickets**
   - Crie um novo ticket usando o botão "Novo Chamado"
   - Visualize a lista de tickets
   - Clique em um ticket para ver os detalhes
   - Teste a atualização de status e prioridade
   - Observe a atualização instantânea da interface

## 🔧 API

### Configuração da API

1. Clone o repositório da API:
```bash
git clone [URL_DO_REPOSITORIO_API]
cd data_intelligence_api
```

2. Instale as dependências:
```bash
pnpm install
```

3. Configure o banco de dados:
```bash
# Configure suas variáveis de ambiente no .env
# Execute as migrations
pnpm prisma migrate dev
```

4. Inicie a API:
```bash
pnpm dev
```

A API estará disponível em `http://localhost:3010`

## 📝 Notas de Desenvolvimento

### Estrutura do Projeto

- `/src/app/[tenant]` - Rotas e páginas específicas por tenant
- `/src/components` - Componentes reutilizáveis
- `/src/hooks` - Custom hooks para lógica de negócio
- `/src/lib` - Utilitários e configurações
- `/src/types` - Definições de tipos TypeScript

### Padrões Implementados

1. **UI Otimista**
   - Atualizações imediatas na interface
   - Fallback em caso de erro
   - Throttling para evitar chamadas desnecessárias

2. **Gestão de Estado**
   - Estados locais para UI
   - Custom hooks para lógica de negócio
   - Context API para estado global

### Em Desenvolvimento (Não Disponível na Demo)

> ⚠️ As seguintes funcionalidades estão em desenvolvimento e NÃO devem ser consideradas para demonstração:

- Dashboard e relatórios
- Gestão de usuários
- Configurações do tenant
- Gestão de categorias
- Notificações
- Comentários em tickets
- Atribuição de tickets
- Avaliações e feedback

## 📫 Suporte

Para suporte ou dúvidas durante a demo, contate a equipe de desenvolvimento.
