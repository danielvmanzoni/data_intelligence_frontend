'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'

interface LoginPageProps {
    params: Promise<{ tenant: string }>
}

export default function LoginPage({ params }: LoginPageProps) {
    const router = useRouter()
    const { login, isAuthenticated, isLoading: authLoading } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<{ email?: string; password?: string }>({})
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

    const validateForm = () => {
        const newErrors: { email?: string; password?: string } = {}

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!email || !emailRegex.test(email)) {
            newErrors.email = 'E-mail inválido'
        }

        if (!password || password.length < 6) {
            newErrors.password = 'Senha deve conter ao menos 6 caracteres'
        }

        setError(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setIsLoading(true)

        try {
            await login(tenant, email, password)
        } catch {
            setError({ password: 'E-mail ou senha incorretos' })
        } finally {
            setIsLoading(false)
        }
    }

    // Loading states
    if (authLoading || !tenant) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-white" />
            </div>
        )
    }

    // Se já estiver autenticado, não renderizar nada (deixar o useEffect redirecionar)
    if (isAuthenticated) {
        return null
    }

    return (
        <div className="min-h-screen bg-black flex">
            {/* Formulário à esquerda */}
            <div className="w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Input
                                type="email"
                                placeholder="E-MAIL"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                    if (error.email) {
                                        setError(prev => ({ ...prev, email: undefined }))
                                    }
                                }}
                                className="bg-transparent text-white border-white/20 h-12 outline-none focus:outline-none focus-visible:outline-none focus:border-red-500 focus-visible:border-red-500 focus:ring-red-500/50 focus-visible:ring-red-500/50"
                                error={!!error.email}
                                disabled={isLoading}
                            />
                            {error.email && (
                                <p className="text-red-500 text-sm">{error.email}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Input
                                type="password"
                                placeholder="SENHA"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                    if (error.password) {
                                        setError(prev => ({ ...prev, password: undefined }))
                                    }
                                }}
                                className="bg-transparent text-white border-white/20 h-12 outline-none focus:outline-none focus-visible:outline-none focus:border-red-500 focus-visible:border-red-500 focus:ring-red-500/50 focus-visible:ring-red-500/50"
                                error={!!error.password}
                                disabled={isLoading}
                            />
                            {error.password && (
                                <p className="text-red-500 text-sm">{error.password}</p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-12 !bg-red-500 hover:bg-red-600 text-white"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Entrando...
                                </>
                            ) : (
                                'ENTRAR'
                            )}
                        </Button>
                    </form>
                </div>
            </div>

            {/* Logo à direita */}
            <div className="w-1/2 flex items-center justify-center">
                <img src="/CrownIT_dark_300X300.svg" alt="Crown IT" className="max-w-md" />
            </div>
        </div>
    )
} 