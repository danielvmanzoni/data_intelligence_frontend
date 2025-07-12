'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Building2, Loader2, AlertCircle, Crown, Store, Zap } from 'lucide-react'

interface LoginPageProps {
    params: Promise<{ tenant: string }>
}

// Configurações de branding por tenant
const tenantBranding = {
    'crown': {
        name: 'Crown',
        primaryColor: 'bg-yellow-600 hover:bg-yellow-700',
        secondaryColor: 'border-yellow-200',
        icon: Crown,
        iconColor: 'text-yellow-600',
        bgGradient: 'from-yellow-50 to-orange-50'
    },
    'mcdonalds-matriz': {
        name: 'McDonald\'s Matriz',
        primaryColor: 'bg-red-600 hover:bg-red-700',
        secondaryColor: 'border-red-200',
        icon: Store,
        iconColor: 'text-red-600',
        bgGradient: 'from-red-50 to-yellow-50'
    },
    'mcdonalds-loja-praca': {
        name: 'McDonald\'s Loja Praça',
        primaryColor: 'bg-red-600 hover:bg-red-700',
        secondaryColor: 'border-red-200',
        icon: Store,
        iconColor: 'text-red-600',
        bgGradient: 'from-red-50 to-yellow-50'
    },
    'lacoste-matriz': {
        name: 'Lacoste Matriz',
        primaryColor: 'bg-green-600 hover:bg-green-700',
        secondaryColor: 'border-green-200',
        icon: Store,
        iconColor: 'text-green-600',
        bgGradient: 'from-green-50 to-emerald-50'
    },
    'lacoste-loja-shopping': {
        name: 'Lacoste Loja Shopping',
        primaryColor: 'bg-green-600 hover:bg-green-700',
        secondaryColor: 'border-green-200',
        icon: Store,
        iconColor: 'text-green-600',
        bgGradient: 'from-green-50 to-emerald-50'
    },
    'lacoste-loja-centro': {
        name: 'Lacoste Loja Centro',
        primaryColor: 'bg-green-600 hover:bg-green-700',
        secondaryColor: 'border-green-200',
        icon: Store,
        iconColor: 'text-green-600',
        bgGradient: 'from-green-50 to-emerald-50'
    },
    'drogasil-matriz': {
        name: 'Drogasil Matriz',
        primaryColor: 'bg-blue-600 hover:bg-blue-700',
        secondaryColor: 'border-blue-200',
        icon: Store,
        iconColor: 'text-blue-600',
        bgGradient: 'from-blue-50 to-cyan-50'
    },
    'drogasil-loja-bela-vista': {
        name: 'Drogasil Loja Bela Vista',
        primaryColor: 'bg-blue-600 hover:bg-blue-700',
        secondaryColor: 'border-blue-200',
        icon: Store,
        iconColor: 'text-blue-600',
        bgGradient: 'from-blue-50 to-cyan-50'
    }
}

// Credenciais de teste
const testCredentials = {
    'crown': { email: 'admin@crown.com', password: 'crown123' },
    'lacoste-matriz': { email: 'admin@lacoste.com', password: 'lacoste123' },
    'lacoste-loja-shopping': { email: 'admin@lacoste-shopping.com', password: 'loja123' },
    'lacoste-loja-centro': { email: 'admin@lacoste-centro.com', password: 'loja123' },
    'mcdonalds-matriz': { email: 'admin@mcdonalds.com', password: 'mcdonalds123' },
    'mcdonalds-loja-praca': { email: 'admin@mcdonalds-praca.com', password: 'loja123' },
    'drogasil-matriz': { email: 'admin@drogasil.com', password: 'drogasil123' },
    'drogasil-loja-bela-vista': { email: 'admin@drogasil-belavista.com', password: 'loja123' },
}

export default function LoginPage({ params }: LoginPageProps) {
    const router = useRouter()
    const { login, isAuthenticated, isLoading: authLoading } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [tenant, setTenant] = useState('')

    // Extrair tenant dos params
    useEffect(() => {
        const getTenant = async () => {
            const { tenant: tenantSlug } = await params
            setTenant(tenantSlug)
        }
        getTenant()
    }, [params])

    // Redirecionar se já estiver autenticado
    useEffect(() => {
        if (isAuthenticated && !authLoading && tenant) {
            router.replace(`/${tenant}/dashboard`)
        }
    }, [isAuthenticated, authLoading, tenant, router])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            await login(tenant, email, password)
        } catch {
            setError('Email ou senha incorretos')
        } finally {
            setIsLoading(false)
        }
    }

    const handleQuickLogin = async () => {
        const creds = testCredentials[tenant as keyof typeof testCredentials]
        if (!creds) return

        setError('')
        setIsLoading(true)

        try {
            await login(tenant, creds.email, creds.password)
        } catch {
            setError('Erro no login rápido')
        } finally {
            setIsLoading(false)
        }
    }

    // Loading states
    if (authLoading || !tenant) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        )
    }

    // Se já estiver autenticado, não renderizar nada (deixar o useEffect redirecionar)
    if (isAuthenticated) {
        return null
    }

    const branding = tenantBranding[tenant as keyof typeof tenantBranding] || {
        name: tenant,
        primaryColor: 'bg-primary hover:bg-primary/90',
        secondaryColor: 'border-primary/20',
        icon: Building2,
        iconColor: 'text-primary',
        bgGradient: 'from-background to-muted/20'
    }

    const IconComponent = branding.icon
    const hasTestCredentials = testCredentials[tenant as keyof typeof testCredentials]

    return (
        <div className={`min-h-screen bg-gradient-to-br ${branding.bgGradient} flex items-center justify-center p-4`}>
            <Card className={`w-full max-w-md shadow-xl border-2 ${branding.secondaryColor}`}>
                <CardHeader className="text-center">
                    <div className="flex items-center justify-center mb-4">
                        <div className={`h-16 w-16 ${branding.primaryColor} rounded-xl flex items-center justify-center shadow-lg`}>
                            <IconComponent className="h-8 w-8 text-white" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-800">
                        {branding.name}
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                        Entre com suas credenciais para acessar o sistema
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Login Rápido para Testes */}
                    {hasTestCredentials && (
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Zap className="h-4 w-4" />
                                <span>Modo de Teste</span>
                            </div>
                            <Button
                                onClick={handleQuickLogin}
                                variant="outline"
                                className={`w-full ${branding.secondaryColor} ${branding.iconColor} hover:bg-gray-50`}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Entrando...
                                    </>
                                ) : (
                                    <>
                                        <Zap className="mr-2 h-4 w-4" />
                                        Login Rápido (Teste)
                                    </>
                                )}
                            </Button>
                            <div className="text-xs text-gray-500 text-center">
                                {hasTestCredentials.email}
                            </div>
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-background px-2 text-muted-foreground">ou</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Formulário Manual */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="email">E-mail</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Digite seu e-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isLoading}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Senha</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Digite sua senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isLoading}
                                required
                            />
                        </div>

                        <Button
                            type="submit"
                            className={`w-full ${branding.primaryColor} text-white shadow-lg`}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Entrando...
                                </>
                            ) : (
                                'Entrar'
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
} 