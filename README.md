# 📊 Data Intelligence Frontend

> Sistema de Gestão de Chamados Multi-Tenant com Arquitetura Hierárquica para Franquias

[![Next.js](https://img.shields.io/badge/Next.js-15.3.5-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.x-38B2AC)](https://tailwindcss.com/)
[![ShadCN/UI](https://img.shields.io/badge/ShadCN%2FUI-Latest-black)](https://ui.shadcn.com/)

## 🏗️ Arquitetura do Sistema

### 🔗 Hierarquia Multi-Tenant

```
👑 CROWN (Crown Company)
├── 🏬 FRANQUEADOR (Lacoste Matriz)
│   ├── 🏪 FRANQUIA (Lacoste Loja Shopping)
│   └── 🏪 FRANQUIA (Lacoste Loja Centro)
├── 🏬 FRANQUEADOR (Nike Matriz)
│   └── 🏪 FRANQUIA (Nike Loja Outlet)
└── 🏬 FRANQUEADOR (McDonald's Matriz)
    └── 🏪 FRANQUIA (McDonald's Loja Praça)
```

### 🎯 Níveis de Acesso

#### 👑 **CROWN (Crown Company)**
- **Visibilidade**: TUDO sem filtros
- **Funcionalidades**: Seleção de marca/segmento, relatórios globais, administração completa

#### 🏬 **FRANQUEADOR (ex: Lacoste Matriz)**
- **Visibilidade**: Todas as lojas da sua marca
- **Funcionalidades**: BI consolidado da marca, gerenciamento de franquias

#### 🏪 **FRANQUIA (ex: Lacoste Loja Shopping)**
- **Visibilidade**: Apenas seus próprios dados
- **Funcionalidades**: BI específico da loja, gerenciamento local

## 🎨 Segmentos Suportados

- **👗 MODA** - Lacoste, Nike, Adidas, Zara
- **🍔 FOOD** - McDonald's, Burger King, KFC
- **💊 FARMA** - Drogasil, Raia, Pacheco
- **💻 TECH** - Apple Store, Samsung
- **💄 BEAUTY** - Sephora, O Boticário
- **⚽ SPORT** - Centauro, Decathlon

## 🚀 Tecnologias Utilizadas

- **[Next.js 15](https://nextjs.org/)** - Framework React com App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Framework CSS utilitário
- **[ShadCN/UI](https://ui.shadcn.com/)** - Componentes React elegantes
- **[Lucide React](https://lucide.dev/)** - Biblioteca de ícones
- **[Sonner](https://sonner.emilkowal.ski/)** - Notificações toast

## 📦 Instalação

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- API NestJS rodando na porta 3010

### Configuração

1. **Clone o repositório**
```bash
git clone https://github.com/danielvmanzoni/data_intelligence_frontend.git
cd data_intelligence_frontend
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
# Crie um arquivo .env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:3010" > .env.local
echo "NODE_ENV=development" >> .env.local
```

4. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

5. **Acesse a aplicação**
```
http://localhost:3000
```

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Produção
npm run build        # Build para produção
npm run start        # Inicia servidor de produção

# Qualidade
npm run lint         # Executa ESLint
```

## 🔐 Autenticação

### Sistema de Login por CNPJ

O sistema utiliza autenticação baseada em CNPJ da empresa:

```typescript
interface LoginRequest {
  cnpj: string;      // 00.000.000/0001-00
  email: string;     // admin@empresa.com
  password: string;  // senha123
}
```

### 🎯 Credenciais de Teste

#### 👑 Crown Company
```
CNPJ: 00.000.000/0001-00
Email: admin@crown.com
Senha: crown123
```

#### 🏬 Franqueador Lacoste
```
CNPJ: 11.111.111/0001-11
Email: admin@lacoste.com
Senha: lacoste123
```

#### 🍔 Franqueador McDonald's
```
CNPJ: 22.222.222/0001-22
Email: admin@mcdonalds.com
Senha: mcdonalds123
```

## 🎨 Funcionalidades Principais

### 📊 Dashboard Hierárquico
- **Métricas em tempo real** baseadas no nível de acesso
- **Gráficos interativos** com dados filtrados automaticamente
- **Tickets recentes** com visibilidade controlada

### 🎫 Gestão de Chamados
- **Numeração sequencial** por tenant (#001, #002, etc.)
- **Filtros automáticos** baseados na hierarquia
- **Sistema de categorização** flexível
- **Controle de SLA** por categoria

### 👥 Controle de Acesso
- **Roles hierárquicos**: CROWN_ADMIN, FRANCHISOR_ADMIN, FRANCHISE_ADMIN, AGENT, USER
- **Isolamento automático** de dados por tenant
- **Visibilidade controlada** por nível de acesso

### 📈 BI e Relatórios
- **Crown**: Relatórios globais + filtros por marca/segmento
- **Franqueador**: Consolidado de todas as franquias
- **Franquia**: Dados específicos da loja

## 🛠️ Estrutura do Projeto

```
src/
├── app/                    # App Router (Next.js 15)
│   ├── dashboard/         # Dashboard principal
│   ├── login/            # Página de login
│   └── layout.tsx        # Layout raiz
├── components/           # Componentes React
│   ├── layout/          # Componentes de layout
│   ├── ui/              # Componentes base (ShadCN)
│   └── dev/             # Componentes de desenvolvimento
├── contexts/            # Contextos React
│   └── AuthContext.tsx  # Contexto de autenticação
├── hooks/               # Hooks customizados
├── lib/                 # Utilitários e configurações
│   ├── api.ts          # Cliente API
│   └── utils.ts        # Utilitários gerais
└── types/              # Tipos TypeScript
    └── api.ts          # Tipos da API
```

## 🧪 Testes e Desenvolvimento

### 🔬 Painel de Testes da API

Em desenvolvimento, o sistema inclui um painel de testes integrado:

- **Testes de conexão** com a API
- **Validação de endpoints** principais
- **Testes de autenticação** com diferentes roles
- **Logs detalhados** para debug

### 🎯 Credenciais de Teste Rápido

Na tela de login (apenas em desenvolvimento):
- Clique em **"Mostrar Credenciais de Teste"**
- Selecione uma das opções para preenchimento automático
- Teste diferentes níveis de acesso

## 🌐 Integração com API

### 🔗 Endpoints Principais

```typescript
// Autenticação
POST /auth/login
GET  /auth/me

// Tenants
GET  /tenants
GET  /tenants/brands
GET  /tenants/segments
GET  /tenants/cnpj/:cnpj

// Tickets
GET  /tickets
POST /tickets
GET  /tickets/stats
GET  /tickets/by-brand/:brand
```

### 📡 Estrutura de Resposta

A API retorna dados diretamente:
```json
{
  "token": "eyJhbGc...",
  "user": {
    "id": "...",
    "name": "...",
    "role": "CROWN_ADMIN"
  },
  "tenant": {
    "id": "...",
    "name": "...",
    "type": "CROWN"
  }
}
```

## 🚀 Deploy e Produção

### 🏗️ Build para Produção

```bash
npm run build
npm run start
```

### 🌍 Variáveis de Ambiente

```env
# Produção
NEXT_PUBLIC_API_URL=https://api.suaempresa.com
NODE_ENV=production

# Desenvolvimento
NEXT_PUBLIC_API_URL=http://localhost:3010
NODE_ENV=development
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📋 Roadmap

- [ ] Implementação de anexos em tickets
- [ ] Sistema de notificações push
- [ ] Modo offline com sincronização
- [ ] Aplicativo mobile (React Native)
- [ ] Dashboard de métricas avançadas
- [ ] Sistema de workflow customizável

## 🐛 Problemas Conhecidos

- **Tailwind CSS v4**: Algumas classes podem não ser reconhecidas (compatibilidade em desenvolvimento)
- **ShadCN/UI**: Alguns componentes podem precisar de ajustes menores

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🏆 Créditos

Desenvolvido com ❤️ para sistemas de franquias escaláveis.

---

### 📞 Suporte

Para suporte técnico ou dúvidas:
- Abra uma [Issue](https://github.com/danielvmanzoni/data_intelligence_frontend/issues)
- Entre em contato através dos canais oficiais

### 🔄 Atualizações Recentes

- ✅ **Sistema de Login Corrigido** - Compatibilidade com nova API
- ✅ **Credenciais de Teste** - Preenchimento automático em desenvolvimento
- ✅ **Painel de Testes** - Integração com API em tempo real
- ✅ **Validação de CNPJ** - Formatação e validação automática
- ✅ **Tratamento de Erros** - Mensagens específicas por tipo de erro

**Última atualização**: Dezembro 2024
