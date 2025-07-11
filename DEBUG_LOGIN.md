# 🐛 Debug do Problema de Login

## 🔍 Problema Identificado

O usuário consegue fazer login (recebe token), mas o frontend está lançando um erro na linha 155 do `api.ts`.

## ✅ Correções Implementadas

### 1. **Adaptação da Estrutura de Resposta**
A nova API retorna dados diretamente, não em uma estrutura `{ success, data, error }`. Adicionamos:

```typescript
// A nova API retorna dados diretamente, não em uma estrutura { success, data, error }
// Vamos adaptar para manter compatibilidade
if (data && typeof data === 'object' && !('success' in data)) {
  return {
    success: true,
    data: data as T,
  };
}
```

### 2. **Tratamento Inteligente de Login**
Agora o login tenta múltiplas estruturas de resposta:

- **Padrão antigo**: `{ success: true, data: { token, user, tenant } }`
- **Nova API com wrapper**: `{ data: { token, user, tenant } }`
- **Nova API direta**: `{ token, user, tenant }`

### 3. **Logs de Debug Adicionados**
```
🔄 Fazendo login com: { cnpj, email }
📡 Resposta da API: [objeto completo]
✅ Login [tipo] - token: [primeiros 20 chars]...
```

## 🧪 Como Testar

### 1. **Abrir Console do Navegador**
1. Pressione `F12` para abrir DevTools
2. Vá para a aba **Console**
3. Deixe aberto durante o teste

### 2. **Testar Login**
1. Acesse `http://localhost:3000/login`
2. Use as credenciais de teste (botão "Mostrar Credenciais de Teste")
3. Observe os logs no console

### 3. **Logs Esperados** (Login bem-sucedido)
```
🔄 Fazendo login com: { cnpj: "00.000.000/0001-00", email: "admin@crown.com" }
📡 Resposta da API: { token: "eyJhbGc...", user: {...}, tenant: {...} }
✅ Login direto - token: eyJhbGciOiJIUzI1NiIs...
```

### 4. **Se Ainda Houver Erro**
Observe a estrutura exata da "📡 Resposta da API" e compare com o que esperamos.

## 🔧 Estruturas de Resposta Suportadas

### Estrutura 1: Padrão Antigo
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGc...",
    "user": { "id": "...", "name": "...", ... },
    "tenant": { "id": "...", "name": "...", ... }
  }
}
```

### Estrutura 2: Nova API com Wrapper
```json
{
  "data": {
    "token": "eyJhbGc...",
    "user": { "id": "...", "name": "...", ... },
    "tenant": { "id": "...", "name": "...", ... }
  }
}
```

### Estrutura 3: Nova API Direta (Esperada)
```json
{
  "token": "eyJhbGc...",
  "user": { "id": "...", "name": "...", ... },
  "tenant": { "id": "...", "name": "...", ... }
}
```

## 🚨 Se o Problema Persistir

### 1. **Copiar Logs do Console**
Copie todos os logs que aparecem quando você tenta fazer login.

### 2. **Verificar Estrutura da API**
A resposta da API pode ter uma estrutura diferente do esperado. Os logs vão mostrar exatamente o que está sendo retornado.

### 3. **Possíveis Soluções Adicionais**
Se a API retorna uma estrutura completamente diferente, precisaremos ajustar o código baseado nos logs reais.

## 🔄 Testar Agora

1. **Inicie o servidor**: `npm run dev`
2. **Acesse**: `http://localhost:3000/login`
3. **Abra o Console**: F12 → Console
4. **Faça login** com as credenciais de teste
5. **Observe os logs** e reporte qualquer erro que aparecer

---

**Status**: ✅ Correções implementadas, aguardando teste do usuário 