# Data Intelligence Frontend - Demo

Este é o frontend do sistema de Data Intelligence, uma aplicação multi-tenant para gestão de tickets e suporte.

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

A aplicação estará disponível em `http://localhost:3000`

## 🔑 Acessando a Aplicação

### Tenants Disponíveis

A aplicação suporta múltiplos tenants. Para acessar, use um dos seguintes URLs:

- Crown IT (Admin): `http://localhost:3000/crown`
  - Email: admin@crown.com
  - Senha: 123456

### Funcionalidades Implementadas

1. **Sistema de Tickets**
   - Criação de tickets
   - Visualização em lista
   - Detalhes do ticket
   - Atualização de status e prioridade
   - UI otimista para melhor experiência do usuário

2. **Gestão de Categorias**
   - Categorização de tickets
   - Cores e ícones personalizados
   - SLA por categoria

3. **Dashboard**
   - Visão geral dos tickets
   - Contadores por status
   - Filtros e pesquisa

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

### Padrões Utilizados

1. **UI Otimista**
   - Atualizações imediatas na interface
   - Fallback em caso de erro
   - Throttling para evitar chamadas desnecessárias

2. **Gestão de Estado**
   - Estados locais para UI
   - Custom hooks para lógica de negócio
   - Context API para estado global

3. **Componentes**
   - Componentes atômicos
   - Shadcn/ui para base de componentes
   - Tailwind CSS para estilização

## 🤝 Contribuindo

1. Crie uma branch para sua feature:
```bash
git checkout -b feature/nome-da-feature
```

2. Faça commit das alterações:
```bash
git commit -m "feat: Descrição da feature"
```

3. Push para a branch:
```bash
git push origin feature/nome-da-feature
```

4. Abra um Pull Request

## 📫 Suporte

Para suporte ou dúvidas, abra uma issue no repositório ou contate a equipe de desenvolvimento.

## 📄 Licença

Este projeto está sob a licença [LICENÇA]. Veja o arquivo LICENSE para mais detalhes.
