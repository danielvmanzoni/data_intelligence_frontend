'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Building2, Loader2, Crown, Store } from 'lucide-react'

interface Tenant {
  id: string
  name: string
  subdomain: string
  cnpj: string
  brand: string | null
  segment: string
}

const credentials = {
  'crown': { email: 'admin@crown.com', password: 'crown123' },
  'lacoste-matriz': { email: 'admin@lacoste.com', password: 'lacoste123' },
  'lacoste-loja-shopping': { email: 'admin@lacoste-shopping.com', password: 'loja123' },
  'lacoste-loja-centro': { email: 'admin@lacoste-centro.com', password: 'loja123' },
  'mcdonalds-matriz': { email: 'admin@mcdonalds.com', password: 'mcdonalds123' },
  'mcdonalds-loja-praca': { email: 'admin@mcdonalds-praca.com', password: 'loja123' },
  'drogasil-matriz': { email: 'admin@drogasil.com', password: 'drogasil123' },
  'drogasil-loja-bela-vista': { email: 'admin@drogasil-belavista.com', password: 'loja123' },
}

export default function HomePage() {
  const [tenants, setTenants] = useState<Tenant[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const response = await fetch('http://localhost:3010/tenants')
        if (!response.ok) {
          throw new Error('Erro ao buscar tenants')
        }
        const data = await response.json()
        setTenants(data)
      } catch {
        setError('Erro ao carregar tenants. Verifique se a API está rodando.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchTenants()
  }, [])

  const getIcon = (brand: string | null | undefined) => {
    if (!brand) return <Building2 className="h-6 w-6 text-gray-500" />
    if (brand === 'Crown') return <Crown className="h-6 w-6 text-yellow-500" />
    if (brand.includes('McDonald')) return <Store className="h-6 w-6 text-red-500" />
    if (brand.includes('Lacoste')) return <Store className="h-6 w-6 text-green-500" />
    if (brand.includes('Drogasil')) return <Store className="h-6 w-6 text-blue-500" />
    return <Building2 className="h-6 w-6 text-gray-500" />
  }

  const getCredentials = (subdomain: string) => {
    return credentials[subdomain as keyof typeof credentials]
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Carregando tenants...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Erro</h1>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Data Intelligence Frontend</h1>
          <p className="text-muted-foreground">
            Sistema Multi-Tenant de Gestão de Tickets
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tenants.map((tenant) => {
            const creds = getCredentials(tenant.subdomain)
            return (
              <Card key={tenant.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    {getIcon(tenant.brand)}
                    <div>
                      <CardTitle className="text-lg">{tenant.name}</CardTitle>
                      <CardDescription>{tenant.brand}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">CNPJ:</span>
                      <span className="text-sm">{tenant.cnpj}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Segmento:</span>
                      <Badge variant="secondary">{tenant.segment}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Subdomain:</span>
                      <code className="text-sm bg-muted px-2 py-1 rounded">{tenant.subdomain}</code>
                    </div>
                  </div>

                  {creds && (
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs font-medium mb-2">Credenciais de Teste:</p>
                      <p className="text-xs">Email: {creds.email}</p>
                      <p className="text-xs">Senha: {creds.password}</p>
                    </div>
                  )}

                  <Link href={`/${tenant.subdomain}`} className="w-full">
                    <Button className="w-full">
                      Acessar Sistema
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            API rodando em: <code>http://localhost:3010</code>
          </p>
        </div>
      </div>
    </div>
  )
}
