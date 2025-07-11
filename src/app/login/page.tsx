'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthExtended } from '@/contexts/AuthContext'
import { useToast } from '@/hooks/useToast'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Eye, EyeOff, Building2, Crown, Store, Loader2, AlertCircle, Info } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function LoginPage() {
    const router = useRouter()
    const { login, isAuthenticated, isLoading: authLoading } = useAuthExtended()
    const { error, success } = useToast()

    const [formData, setFormData] = useState({
        cnpj: '',
        email: '',
        password: '',
    })
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [cnpjError, setCnpjError] = useState('')
    const [showTestCredentials, setShowTestCredentials] = useState(false)

    // Redirecionar se já estiver autenticado (com useEffect para evitar problemas de renderização)
    useEffect(() => {
        if (isAuthenticated && !authLoading) {
            router.push('/dashboard')
        }
    }, [isAuthenticated, authLoading, router])

    // Função para formatar CNPJ
    const formatCNPJ = (value: string) => {
        const cleaned = value.replace(/\D/g, '')
        if (cleaned.length <= 14) {
            const match = cleaned.match(/^(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})$/)
            if (match) {
                let formatted = ''
                if (match[1]) formatted += match[1]
                if (match[2]) formatted += '.' + match[2]
                if (match[3]) formatted += '.' + match[3]
                if (match[4]) formatted += '/' + match[4]
                if (match[5]) formatted += '-' + match[5]
                return formatted
            }
        }
        return value
    }

    // Função para validar CNPJ (mais flexível)
    const validateCNPJ = (cnpj: string) => {
        const cleaned = cnpj.replace(/\D/g, '')

        if (cleaned.length !== 14) {
            return false
        }

        // Verificar se todos os dígitos são iguais
        if (/^(\d)\1{13}$/.test(cleaned)) {
            return false
        }

        // Algoritmo de validação do CNPJ
        const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
        const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]

        const calculateDigit = (cnpj: string, weights: number[]) => {
            const sum = cnpj
                .slice(0, weights.length)
                .split('')
                .reduce((acc, digit, index) => acc + parseInt(digit) * weights[index], 0)

            const remainder = sum % 11
            return remainder < 2 ? 0 : 11 - remainder
        }

        const digit1 = calculateDigit(cleaned, weights1)
        const digit2 = calculateDigit(cleaned, weights2)

        return parseInt(cleaned[12]) === digit1 && parseInt(cleaned[13]) === digit2
    }

    // Função para verificar se é um CNPJ de teste conhecido
    const isTestCNPJ = (cnpj: string) => {
        const testCNPJs = [
            '00.000.000/0001-00', // Crown
            '11.111.111/0001-11', // Lacoste
            '22.222.222/0001-22', // McDonald's
            '33.333.333/0001-33', // Drogasil
            '11.111.111/0002-22', // Lacoste Shopping
            '11.111.111/0003-33', // Lacoste Centro
        ]
        return testCNPJs.includes(cnpj)
    }

    const handleCNPJChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        const formattedValue = formatCNPJ(value)

        setFormData(prev => ({ ...prev, cnpj: formattedValue }))

        // Validar CNPJ se estiver completo
        const cleanedValue = formattedValue.replace(/\D/g, '')
        if (cleanedValue.length === 14) {
            if (!validateCNPJ(formattedValue) && !isTestCNPJ(formattedValue)) {
                setCnpjError('CNPJ inválido')
            } else {
                setCnpjError('')
            }
        } else {
            setCnpjError('')
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Validações
        if (!formData.cnpj || !formData.email || !formData.password) {
            error('Por favor, preencha todos os campos obrigatórios.')
            return
        }

        const cleanedCNPJ = formData.cnpj.replace(/\D/g, '')
        if (cleanedCNPJ.length !== 14) {
            setCnpjError('CNPJ deve conter 14 dígitos')
            return
        }

        if (!validateCNPJ(formData.cnpj) && !isTestCNPJ(formData.cnpj)) {
            setCnpjError('CNPJ inválido')
            return
        }

        setIsLoading(true)

        try {
            await login(formData)
            success('Login realizado com sucesso!')
            router.push('/dashboard')
        } catch (err) {
            // Tratamento de erros mais específico
            if (err instanceof Error) {
                if (err.message.includes('401') || err.message.includes('credenciais')) {
                    error('CNPJ, e-mail ou senha incorretos. Verifique suas credenciais.')
                } else if (err.message.includes('404') || err.message.includes('tenant')) {
                    error('Empresa não encontrada. Verifique o CNPJ informado.')
                } else if (err.message.includes('500') || err.message.includes('server')) {
                    error('Erro no servidor. Tente novamente em alguns minutos.')
                } else if (err.message.includes('network') || err.message.includes('fetch')) {
                    error('Erro de conexão. Verifique sua internet ou se a API está funcionando.')
                } else {
                    error(err.message || 'Erro ao fazer login. Tente novamente.')
                }
            } else {
                error('Erro inesperado. Tente novamente.')
            }
            console.error('Login error:', err)
        } finally {
            setIsLoading(false)
        }
    }

    const fillTestCredentials = (type: 'crown' | 'lacoste' | 'mcdonalds') => {
        const credentials = {
            crown: {
                cnpj: '00.000.000/0001-00',
                email: 'admin@crown.com',
                password: 'crown123'
            },
            lacoste: {
                cnpj: '11.111.111/0001-11',
                email: 'admin@lacoste.com',
                password: 'lacoste123'
            },
            mcdonalds: {
                cnpj: '22.222.222/0001-22',
                email: 'admin@mcdonalds.com',
                password: 'mcdonalds123'
            }
        }

        setFormData(credentials[type])
        setCnpjError('')
    }

    const getTenantTypeInfo = () => {
        return [
            {
                icon: Crown,
                title: 'Crown Company',
                description: 'Acesso total ao sistema - Vê todas as franquias e marcas',
                color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
                example: 'Crown'
            },
            {
                icon: Building2,
                title: 'Franqueador',
                description: 'Gestão das suas franquias - Vê todas as suas lojas',
                color: 'bg-blue-100 text-blue-800 border-blue-200',
                example: 'Lacoste Matriz'
            },
            {
                icon: Store,
                title: 'Franquia',
                description: 'Gestão da sua loja - Vê apenas seus dados',
                color: 'bg-green-100 text-green-800 border-green-200',
                example: 'Lacoste Loja Shopping'
            },
        ]
    }

    // Não renderizar nada se ainda estiver carregando a autenticação
    if (authLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                    <p className="text-muted-foreground">Carregando...</p>
                </div>
            </div>
        )
    }

    // Não renderizar se já estiver autenticado
    if (isAuthenticated) {
        return null
    }

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Panel - Login Form */}
                <div className="flex items-center justify-center">
                    <Card className="w-full max-w-md">
                        <CardHeader className="text-center">
                            <div className="flex items-center justify-center mb-4">
                                <div className="h-12 w-12 bg-primary rounded-lg flex items-center justify-center">
                                    <Building2 className="h-6 w-6 text-primary-foreground" />
                                </div>
                            </div>
                            <CardTitle className="text-2xl font-bold">
                                Data Intelligence
                            </CardTitle>
                            <CardDescription>
                                Sistema de Gestão de Chamados Multi-Tenant
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="cnpj">CNPJ da Empresa *</Label>
                                    <Input
                                        id="cnpj"
                                        type="text"
                                        placeholder="00.000.000/0001-00"
                                        value={formData.cnpj}
                                        onChange={handleCNPJChange}
                                        maxLength={18}
                                        className={cnpjError ? 'border-destructive' : ''}
                                        disabled={isLoading}
                                    />
                                    {cnpjError && (
                                        <p className="text-sm text-destructive flex items-center gap-1">
                                            <AlertCircle className="h-3 w-3" />
                                            {cnpjError}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">E-mail *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="usuario@empresa.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                        disabled={isLoading}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password">Senha *</Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Digite sua senha"
                                            value={formData.password}
                                            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                                            disabled={isLoading}
                                            required
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                                            onClick={() => setShowPassword(!showPassword)}
                                            disabled={isLoading}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </Button>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full h-11"
                                    disabled={isLoading || !!cnpjError || !formData.cnpj || !formData.email || !formData.password}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                            Entrando...
                                        </>
                                    ) : (
                                        "Entrando no Sistema"
                                    )}
                                </Button>
                            </form>

                            {/* Test Credentials Section */}
                            {process.env.NODE_ENV === 'development' && (
                                <div className="space-y-3">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setShowTestCredentials(!showTestCredentials)}
                                        className="w-full"
                                        disabled={isLoading}
                                    >
                                        <Info className="h-4 w-4 mr-2" />
                                        {showTestCredentials ? 'Ocultar' : 'Mostrar'} Credenciais de Teste
                                    </Button>

                                    {showTestCredentials && (
                                        <Alert>
                                            <Info className="h-4 w-4" />
                                            <AlertDescription>
                                                <div className="space-y-2">
                                                    <p className="font-medium">Credenciais de Teste:</p>
                                                    <div className="grid grid-cols-1 gap-2">
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => fillTestCredentials('crown')}
                                                            className="justify-start h-auto p-2"
                                                            disabled={isLoading}
                                                        >
                                                            <Crown className="h-4 w-4 mr-2 text-yellow-600" />
                                                            <div className="text-left">
                                                                <div className="font-medium">Crown Company</div>
                                                                <div className="text-xs text-muted-foreground">admin@crown.com</div>
                                                            </div>
                                                        </Button>
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => fillTestCredentials('lacoste')}
                                                            className="justify-start h-auto p-2"
                                                            disabled={isLoading}
                                                        >
                                                            <Building2 className="h-4 w-4 mr-2 text-blue-600" />
                                                            <div className="text-left">
                                                                <div className="font-medium">Lacoste Matriz</div>
                                                                <div className="text-xs text-muted-foreground">admin@lacoste.com</div>
                                                            </div>
                                                        </Button>
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => fillTestCredentials('mcdonalds')}
                                                            className="justify-start h-auto p-2"
                                                            disabled={isLoading}
                                                        >
                                                            <Building2 className="h-4 w-4 mr-2 text-red-600" />
                                                            <div className="text-left">
                                                                <div className="font-medium">McDonald&apos;s Matriz</div>
                                                                <div className="text-xs text-muted-foreground">admin@mcdonalds.com</div>
                                                            </div>
                                                        </Button>
                                                    </div>
                                                </div>
                                            </AlertDescription>
                                        </Alert>
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Right Panel - Information */}
                <div className="flex items-center justify-center">
                    <div className="space-y-6">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold mb-2">
                                Sistema Multi-Tenant Hierárquico
                            </h2>
                            <p className="text-muted-foreground">
                                Projetado especificamente para sistemas de franquias
                            </p>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Tipos de Acesso</h3>
                            {getTenantTypeInfo().map((tenant, index) => (
                                <div key={index} className="flex items-start space-x-3">
                                    <div className="mt-1">
                                        <tenant.icon className="h-5 w-5 text-primary" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2 mb-1">
                                            <span className="font-medium">{tenant.title}</span>
                                            <Badge className={tenant.color}>
                                                {tenant.example}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            {tenant.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Separator />

                        <div className="space-y-3">
                            <h3 className="text-lg font-semibold">Segmentos Suportados</h3>
                            <div className="grid grid-cols-2 gap-2">
                                <Badge variant="outline" className="justify-center">👗 Moda</Badge>
                                <Badge variant="outline" className="justify-center">🍔 Alimentação</Badge>
                                <Badge variant="outline" className="justify-center">💊 Farmácia</Badge>
                                <Badge variant="outline" className="justify-center">💻 Tecnologia</Badge>
                                <Badge variant="outline" className="justify-center">💄 Beleza</Badge>
                                <Badge variant="outline" className="justify-center">⚽ Esporte</Badge>
                            </div>
                        </div>

                        <Separator />

                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold">Funcionalidades</h3>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                                <li>• Gestão hierárquica de chamados</li>
                                <li>• Controle de acesso por tenant</li>
                                <li>• Relatórios segmentados</li>
                                <li>• BI com visibilidade controlada</li>
                                <li>• Autenticação por CNPJ</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 