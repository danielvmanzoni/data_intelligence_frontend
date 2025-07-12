# 🎭 Sistema de Mock para Tenants

## 📋 Visão Geral

O sistema atualmente utiliza dados mockados para simular tenants enquanto a API backend não estiver implementada. Isso permite testar e desenvolver a funcionalidade multi-tenant sem depender de uma API real.

## 🏗️ Como Funciona

### Localização do Mock
O mock está implementado em: `src/contexts/TenantContext.tsx`

### Tenants Disponíveis

| Tenant | URL | Cores | Logo |
|--------|-----|-------|------|
| **Crown** | `/crown` | Dourado (#FFD700) + Laranja (#FFA500) | next.svg |
| **Lacoste** | `/lacoste` | Verde (#00A651) + Verde Escuro (#004225) | vercel.svg |
| **McDonald's** | `/mcdonalds` | Amarelo (#FFC72C) + Vermelho (#DA291C) | globe.svg |
| **Drogasil** | `/drogasil` | Azul (#0066CC) + Azul Escuro (#004499) | window.svg |

### Funcionalidades do Mock

- ✅ **Simulação de delay**: 500ms para simular latência da API
- ✅ **Dados de tenant completos**: ID, nome, CNPJ, tipo, segmento
- ✅ **Temas personalizados**: Cores, logos, taglines
- ✅ **Tratamento de erros**: Tenant não encontrado
- ✅ **Loading states**: Estados de carregamento

## 🔄 Substituindo por API Real

### 1. Localize o código no TenantContext

```typescript
// src/contexts/TenantContext.tsx
const fetchTenant = async () => {
  // ... código atual com mock
  
  // TODO: Substituir pelo código abaixo quando a API estiver pronta
  // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tenants/${tenantSlug}`)
  // 
  // if (!response.ok) {
  //   throw new Error(`Tenant '${tenantSlug}' não encontrado`)
  // }
  //
  // const data = await response.json()
  // setTenant(data.tenant)
  // setTheme(data.theme)
}
```

### 2. Substitua o mock pela API real

```typescript
const fetchTenant = async () => {
  try {
    setIsLoading(true)
    setError(null)

    // Usar API real
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tenants/${tenantSlug}`)
    
    if (!response.ok) {
      throw new Error(`Tenant '${tenantSlug}' não encontrado`)
    }

    const data = await response.json()
    setTenant(data.tenant)
    setTheme(data.theme)
  } catch (err) {
    console.error('Erro ao buscar tenant:', err)
    setError(err instanceof Error ? err.message : 'Erro ao carregar tenant')
  } finally {
    setIsLoading(false)
  }
}
```

### 3. Remove a função getMockTenantData

Quando a API estiver pronta, simplesmente remova a função `getMockTenantData` e todo o código de mock.

## 🔗 Estrutura Esperada da API

### Endpoint
```
GET /api/tenants/{tenant}
```

### Resposta Esperada
```json
{
  "tenant": {
    "id": "crown-123",
    "name": "Crown Company",
    "cnpj": "00.000.000/0001-00",
    "subdomain": "crown",
    "type": "CROWN",
    "status": "ACTIVE",
    "segment": "TECH",
    "brand": "Crown",
    "settings": {},
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "theme": {
    "id": "crown-theme",
    "name": "Crown Company",
    "subdomain": "crown",
    "logo": "https://cdn.exemplo.com/crown-logo.png",
    "primaryColor": "#FFD700",
    "secondaryColor": "#FFA500",
    "backgroundColor": "#FFFFFF",
    "textColor": "#000000",
    "accentColor": "#FF6B00",
    "brandName": "Crown Company",
    "tagline": "Excelência em Gestão Global",
    "favicon": "https://cdn.exemplo.com/crown-favicon.ico"
  }
}
```

## 🎨 Personalizando Temas

### Adicionando Novos Tenants

Para adicionar um novo tenant ao mock, edite a função `getMockTenantData`:

```typescript
const mockTenants: Record<string, { tenant: Tenant; theme: TenantTheme }> = {
  // ... tenants existentes
  
  novoTenant: {
    tenant: {
      id: 'novo-123',
      name: 'Novo Tenant',
      cnpj: '44.444.444/0001-44',
      subdomain: 'novo',
      type: 'FRANCHISOR',
      status: 'ACTIVE',
      segment: 'TECH',
      brand: 'Novo',
      settings: {},
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z'
    },
    theme: {
      id: 'novo-theme',
      name: 'Novo Tenant',
      subdomain: 'novo',
      logo: '/file.svg',
      primaryColor: '#6366F1',
      secondaryColor: '#4F46E5',
      backgroundColor: '#FFFFFF',
      textColor: '#000000',
      accentColor: '#EC4899',
      brandName: 'Novo Tenant',
      tagline: 'Inovação e Tecnologia',
      favicon: '/favicon.ico'
    }
  }
}
```

### Logos Temporários Disponíveis

Na pasta `public/`:
- `next.svg` - Logo do Next.js
- `vercel.svg` - Logo da Vercel
- `globe.svg` - Ícone de globo
- `window.svg` - Ícone de janela
- `file.svg` - Ícone de arquivo

## 🚨 Importante

- **Remover após implementação**: Este sistema de mock deve ser removido quando a API estiver pronta
- **Não usar em produção**: Este mock é apenas para desenvolvimento
- **Logs no console**: O sistema irá logar erros quando tenants não forem encontrados

## 🔍 Debug

Para debugar problemas com tenants:

1. **Verifique o console**: Erros de tenant aparecerão no console do navegador
2. **URL correta**: Confirme que a URL está no formato `/[tenant]`
3. **Tenant existe**: Verifique se o tenant está na lista do mock
4. **Environment**: Confirme que `NEXT_PUBLIC_API_URL` está configurado

## 📝 Próximos Passos

1. **Implementar API**: Criar endpoint `/api/tenants/{tenant}` no backend
2. **Upload de logos**: Sistema para upload de logos personalizados
3. **Admin panel**: Interface para gerenciar temas de tenants
4. **Cache**: Implementar cache para dados de tenant
5. **CDN**: Usar CDN para assets estáticos (logos, favicons) 