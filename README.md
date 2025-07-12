# Data Intelligence Frontend

Sistema Multi-Tenant de Gestão de Tickets construído com Next.js 15 e TypeScript.

## 🚀 Como Usar

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar variáveis de ambiente
Crie um arquivo `.env.local` com:
```
NEXT_PUBLIC_API_URL=http://localhost:3010
```

### 3. Executar o projeto
```bash
npm run dev
```

### 4. Acessar o sistema
- Abra http://localhost:3000 para ver a lista de tenants disponíveis
- Clique em qualquer tenant para acessar o sistema
- Use as credenciais fornecidas para fazer login

## 🏢 Tenants Disponíveis

| Tenant | URL | Email | Senha |
|--------|-----|-------|-------|
| Crown Company | `/crown` | admin@crown.com | crown123 |
| Lacoste Matriz | `/lacoste-matriz` | admin@lacoste.com | lacoste123 |
| Lacoste Shopping | `/lacoste-loja-shopping` | admin@lacoste-shopping.com | loja123 |
| McDonald's Matriz | `/mcdonalds-matriz` | admin@mcdonalds.com | mcdonalds123 |
| Drogasil Matriz | `/drogasil-matriz` | admin@drogasil.com | drogasil123 |

## 🛠️ Tecnologias

- **Next.js 15** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **shadcn/ui** - Componentes UI
- **Lucide React** - Ícones

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── [tenant]/           # Rotas específicas do tenant
│   │   ├── login/         # Página de login
│   │   ├── dashboard/     # Dashboard principal
│   │   └── page.tsx       # Página inicial do tenant
│   └── page.tsx           # Lista de tenants
├── components/
│   ├── layout/            # Componentes de layout
│   └── ui/                # Componentes UI (shadcn)
├── contexts/
│   └── AuthContext.tsx    # Context de autenticação
└── types/
    └── api.ts             # Tipos TypeScript
```

## 🔐 Autenticação

O sistema usa JWT tokens para autenticação. O fluxo é:

1. Usuário acessa `/{tenant}/login`
2. Insere credenciais (email + senha)
3. Sistema faz POST para `/{tenant}/auth/login`
4. Recebe JWT token e dados do usuário
5. Redireciona para `/{tenant}/dashboard`

## 🎯 Funcionalidades

- ✅ Login multi-tenant
- ✅ Dashboard com informações do usuário/tenant
- ✅ Proteção de rotas
- ✅ Logout
- ✅ Interface responsiva
- ✅ Tratamento de erros

## 📋 Próximos Passos

- [ ] Implementar gestão de tickets
- [ ] Adicionar mais páginas (usuários, relatórios, etc.)
- [ ] Implementar refresh token
- [ ] Adicionar testes
- [ ] Melhorar tratamento de erros

## 🔧 API

Este frontend consome a API Multi-Tenant que deve estar rodando em `http://localhost:3010`.

Consulte a documentação da API para mais detalhes sobre os endpoints disponíveis.
