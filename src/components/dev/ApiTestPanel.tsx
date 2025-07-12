'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PlayCircle, CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react'
import { authService } from '@/lib/api'

interface TestResult {
    name: string
    status: 'idle' | 'running' | 'success' | 'error'
    message?: string
}

export function ApiTestPanel() {
    const [isRunning, setIsRunning] = useState(false)
    const [testResults, setTestResults] = useState<TestResult[]>([
        { name: 'Conexão com API', status: 'idle' },
        { name: 'Listar Tenants', status: 'idle' },
        { name: 'Autenticação Crown', status: 'idle' },
        { name: 'Autenticação Lacoste', status: 'idle' }
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

    // Função para testar listagem de tenants
    const testListTenants = async (): Promise<boolean> => {
        try {
            const response = await fetch('http://localhost:3010/tenants')
            const tenants = await response.json()
            console.log('✅ Tenants encontrados:', tenants.length)
            return true
        } catch (error) {
            console.error('❌ Erro ao listar tenants:', error)
            return false
        }
    }

    // Função para testar autenticação Crown
    const testCrownAuthentication = async (): Promise<boolean> => {
        try {
            const crownCredentials = {
                email: 'admin@crown.com',
                password: 'crown123',
                tenant: 'crown'
            }

            const response = await authService.login(crownCredentials)
            console.log('✅ Login Crown realizado:', response.user.name)
            authService.logout()
            return true
        } catch (error) {
            console.error('❌ Erro na autenticação Crown:', error)
            return false
        }
    }

    // Função para testar autenticação Lacoste
    const testLacosteAuthentication = async (): Promise<boolean> => {
        try {
            const lacosteCredentials = {
                email: 'admin@lacoste.com',
                password: 'lacoste123',
                tenant: 'lacoste-matriz'
            }

            const response = await authService.login(lacosteCredentials)
            console.log('✅ Login Lacoste realizado:', response.user.name)
            authService.logout()
            return true
        } catch (error) {
            console.error('❌ Erro na autenticação Lacoste:', error)
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
        await runIndividualTest('Listar Tenants', testListTenants)
        await runIndividualTest('Autenticação Crown', testCrownAuthentication)
        await runIndividualTest('Autenticação Lacoste', testLacosteAuthentication)

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
                        <li>• Crown: admin@crown.com | crown123 | tenant: crown</li>
                        <li>• Lacoste: admin@lacoste.com | lacoste123 | tenant: lacoste-matriz</li>
                        <li>• McDonald&apos;s: admin@mcdonalds.com | mcdonalds123 | tenant: mcdonalds-matriz</li>
                        <li>• Drogasil: admin@drogasil.com | drogasil123 | tenant: drogasil-matriz</li>
                    </ul>
                </div>
            </CardContent>
        </Card>
    )
} 