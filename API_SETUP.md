# 🔧 Configuração da API Atualizada

## 📋 Mudanças Implementadas

### ✅ Atualizações Realizadas

1. **Porta da API atualizada**: `3000` → `3010`
2. **Novos endpoints implementados**:
   - `/tenants/segments` - Listar segmentos disponíveis
   - `/tenants/franchises/{id}` - Obter franquias de um franqueador
3. **Componente de teste em desenvolvimento**: `ApiTestPanel`
4. **Arquivo de testes**: `src/lib/api-test.ts`

### 🚀 Como Usar

#### 1. Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# URL da API (porta atualizada)
NEXT_PUBLIC_API_URL=http://localhost:3010

# Configurações do Next.js
NODE_ENV=development
```

#### 2. Iniciar a API

Certifique-se de que a API NestJS esteja rodando na porta 3010:

```bash
# Na pasta da API
DATABASE_URL="postgresql://tickets:tickets_secure_pass@localhost:5432/tickets_db?schema=public" \
JWT_SECRET="super_secure_jwt_secret_for_production" \
JWT_EXPIRES_IN="7d" \
PORT=3010 \
npm run start:dev
```

#### 3. Iniciar o Frontend

```bash
# Na pasta do frontend
npm run dev
```

#### 4. Testar a Integração

1. Acesse `http://localhost:3000`
2. Faça login (será redirecionado para o dashboard)
3. No dashboard, você verá um painel de "Testes de Integração da API" (apenas em desenvolvimento)
4. Clique em "Executar Todos os Testes" para verificar se tudo está funcionando

### 🔑 Credenciais de Teste

Conforme documentado na API, as credenciais de teste são:

#### Crown Company
- **CNPJ**: `00.000.000/0001-00`
- **Email**: `admin@crown.com`
- **Senha**: `crown123`

#### Franqueador Lacoste
- **CNPJ**: `11.111.111/0001-11`
- **Email**: `admin@lacoste.com`
- **Senha**: `lacoste123`

#### Franqueador McDonald's
- **CNPJ**: `22.222.222/0001-22`
- **Email**: `admin@mcdonalds.com`
- **Senha**: `mcdonalds123`

### 🔧 Testes Manuais

Você também pode testar manualmente usando o console do navegador:

```javascript
// Abrir console do navegador (F12)
// Executar todos os testes
window.testApi.runAllTests()

// Ou testes individuais
window.testApi.testApiConnection()
window.testApi.testNewEndpoints()
window.testApi.testAuthentication()
```

### 📊 Endpoints Testados

- ✅ `GET /` - Verificar se a API está funcionando
- ✅ `GET /tenants/brands` - Listar marcas disponíveis
- ✅ `GET /tenants/segments` - Listar segmentos disponíveis
- ✅ `GET /tenants` - Listar tenants
- ✅ `GET /tenants/cnpj/{cnpj}` - Buscar tenant por CNPJ
- ✅ `POST /auth/login` - Fazer login com CNPJ

### 🚨 Resolução de Problemas

#### API não responde
- Verifique se a API está rodando na porta 3010
- Verifique se o PostgreSQL está rodando
- Verifique se as variáveis de ambiente estão corretas

#### Erro de CORS
- Certifique-se de que a API está configurada para aceitar requisições do localhost:3000

#### Dados não carregam
- Execute o script de setup do banco de dados da API
- Verifique se os dados de teste foram criados

### 🎯 Próximos Passos

1. **Conectar com API real**: Substitua os dados mock por chamadas reais à API
2. **Implementar filtros**: Adicionar filtros por marca e segmento para usuários Crown
3. **Adicionar funcionalidades**: Implementar CRUD completo de tickets, usuários e tenants
4. **Otimizar performance**: Implementar cache e lazy loading

### 📝 Notas Importantes

- O painel de testes só aparece em desenvolvimento (`NODE_ENV=development`)
- As funções de teste estão disponíveis globalmente em `window.testApi`
- O frontend está preparado para toda a arquitetura hierárquica da API
- Todos os tipos TypeScript estão alinhados com a documentação da API

### 🔗 Arquivos Modificados

- `src/lib/api.ts` - Porta atualizada e novos endpoints
- `src/lib/api-test.ts` - Arquivo de testes (novo)
- `src/components/dev/ApiTestPanel.tsx` - Componente de teste (novo)
- `src/app/dashboard/page.tsx` - Painel de testes adicionado
- `API_SETUP.md` - Esta documentação (novo)

---

**Status**: ✅ Frontend atualizado e pronto para integração com a nova API! 