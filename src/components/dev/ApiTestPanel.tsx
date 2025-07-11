'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Loader2, PlayCircle, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { tenantService, authService } from '@/lib/api'

interface TestResult {
    name: string
    status: 'idle' | 'running' | 'success' | 'error'
    message?: string
}

export function ApiTestPanel() {
    const [isRunning, setIsRunning] = useState(false)
    const [testResults, setTestResults] = useState<TestResult[]>([
        { name: 'Conexão com API', status: 'idle' },
        { name: 'Novos Endpoints', status: 'idle' },
        { name: 'Autenticação', status: 'idle' },
        { name: 'Busca por CNPJ', status: 'idle' }
    ])

    const updateTestResult = (index: number, status: TestResult['status'], message?: string) => {
        setTestResults(prev => prev.map((test, i) =>
            i === index ? { ...test, status, message } : test
        ))
    }

    // Função para testar conexão com API
    const testApiConnection = async (): Promise<boolean> => {
        try {
            const response = await fetch('http://localhost:3010/')
            const text = await response.text()
            console.log('✅ API respondeu:', text)
            return true
        } catch (error) {
            console.error('❌ Erro ao conectar com a API:', error)
            return false
        }
    }

    // Função para testar novos endpoints
    const testNewEndpoints = async (): Promise<boolean> => {
        try {
            await tenantService.getBrands()
            await tenantService.getSegments()
            await tenantService.getAll()
            console.log('✅ Novos endpoints funcionando')
            return true
        } catch (error) {
            console.error('❌ Erro ao testar endpoints:', error)
            return false
        }
    }

    // Função para testar autenticação
    const testAuthentication = async (): Promise<boolean> => {
        try {
            const crownCredentials = {
                cnpj: '00.000.000/0001-00',
                email: 'admin@crown.com',
                password: 'crown123'
            }

            const response = await authService.login(crownCredentials)
            console.log('✅ Login realizado:', response.user.name)
            authService.logout()
            return true
        } catch (error) {
            console.error('❌ Erro na autenticação:', error)
            return false
        }
    }

    // Função para testar busca por CNPJ
    const testCnpjSearch = async (): Promise<boolean> => {
        try {
            const crownCnpj = '00.000.000/0001-00'
            const encodedCnpj = encodeURIComponent(crownCnpj)
            const tenant = await tenantService.getByCnpj(encodedCnpj)
            console.log('✅ Tenant encontrado:', tenant.name)
            return true
        } catch (error) {
            console.error('❌ Erro ao buscar por CNPJ:', error)
            return false
        }
    }

    const runIndividualTest = async (testName: string, testFunction: () => Promise<boolean>) => {
        const index = testResults.findIndex(t => t.name === testName)
        if (index === -1) return

        updateTestResult(index, 'running')
        try {
            const result = await testFunction()
            updateTestResult(index, result ? 'success' : 'error', result ? 'Teste passou' : 'Teste falhou')
        } catch (error) {
            updateTestResult(index, 'error', error instanceof Error ? error.message : 'Erro desconhecido')
        }
    }

    const runAllApiTests = async () => {
        setIsRunning(true)

        // Resetar resultados
        setTestResults(prev => prev.map(test => ({ ...test, status: 'idle' as const })))

        // Executar testes um por um
        await runIndividualTest('Conexão com API', testApiConnection)
        await runIndividualTest('Novos Endpoints', testNewEndpoints)
        await runIndividualTest('Autenticação', testAuthentication)
        await runIndividualTest('Busca por CNPJ', testCnpjSearch)

        setIsRunning(false)
    }

    const getStatusIcon = (status: TestResult['status']) => {
        switch (status) {
            case 'running':
                return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
            case 'success':
                return <CheckCircle className="h-4 w-4 text-green-500" />
            case 'error':
                return <XCircle className="h-4 w-4 text-red-500" />
            default:
                return <AlertCircle className="h-4 w-4 text-gray-400" />
        }
    }

    const getStatusBadge = (status: TestResult['status']) => {
        switch (status) {
            case 'running':
                return <Badge variant="secondary">Executando...</Badge>
            case 'success':
                return <Badge variant="default" className="bg-green-100 text-green-800">Sucesso</Badge>
            case 'error':
                return <Badge variant="destructive">Erro</Badge>
            default:
                return <Badge variant="outline">Aguardando</Badge>
        }
    }

    // Só mostrar em desenvolvimento
    if (process.env.NODE_ENV === 'production') {
        return null
    }

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <PlayCircle className="h-5 w-5" />
                    Testes de Integração da API
                </CardTitle>
                <CardDescription>
                    Teste a integração com a nova API (porta 3010) em ambiente de desenvolvimento
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-3">
                    {testResults.map((test, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                                {getStatusIcon(test.status)}
                                <div>
                                    <p className="font-medium">{test.name}</p>
                                    {test.message && (
                                        <p className="text-sm text-muted-foreground">{test.message}</p>
                                    )}
                                </div>
                            </div>
                            {getStatusBadge(test.status)}
                        </div>
                    ))}
                </div>

                <div className="flex gap-2">
                    <Button
                        onClick={runAllApiTests}
                        disabled={isRunning}
                        className="flex-1"
                    >
                        {isRunning ? (
                            <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Executando Testes...
                            </>
                        ) : (
                            <>
                                <PlayCircle className="h-4 w-4 mr-2" />
                                Executar Todos os Testes
                            </>
                        )}
                    </Button>
                </div>

                <div className="text-sm text-muted-foreground space-y-2">
                    <p><strong>🚀 Antes de testar:</strong></p>
                    <ul className="space-y-1 ml-4">
                        <li>• Certifique-se de que a API está rodando na porta 3010</li>
                        <li>• Execute o script de setup do banco de dados</li>
                        <li>• Verifique se os dados de teste estão carregados</li>
                    </ul>

                    <p><strong>📋 Credenciais de teste:</strong></p>
                    <ul className="space-y-1 ml-4">
                        <li>• Crown: 00.000.000/0001-00 | admin@crown.com | crown123</li>
                        <li>• Lacoste: 11.111.111/0001-11 | admin@lacoste.com | lacoste123</li>
                    </ul>
                </div>
            </CardContent>
        </Card>
    )
} 