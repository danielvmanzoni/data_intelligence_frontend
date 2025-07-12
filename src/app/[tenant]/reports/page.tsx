'use client'

import { MainLayout } from '@/components/layout/MainLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/contexts/AuthContext'

export default function ReportsPage() {
    const { getAccessLevel } = useAuth()
    const accessLevel = getAccessLevel()

    const getReportTitle = () => {
        switch (accessLevel) {
            case 'CROWN':
                return 'Relatórios Globais'
            case 'FRANCHISOR':
                return 'Relatórios da Marca'
            case 'FRANCHISE':
                return 'Relatórios da Loja'
            default:
                return 'Relatórios'
        }
    }

    return (
        <MainLayout title={getReportTitle()}>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Total de Chamados</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">45</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Tempo Médio de Resolução</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">2.5 dias</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Taxa de Resolução</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">92%</p>
                    </CardContent>
                </Card>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Relatórios Disponíveis</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <div className="p-4 space-y-2">
                                <div className="flex items-center justify-between p-2 hover:bg-accent rounded-lg cursor-pointer">
                                    <div>
                                        <p className="font-medium">Desempenho de Chamados</p>
                                        <p className="text-sm text-muted-foreground">Análise de tempo de resposta e resolução</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-2 hover:bg-accent rounded-lg cursor-pointer">
                                    <div>
                                        <p className="font-medium">Categorias de Problemas</p>
                                        <p className="text-sm text-muted-foreground">Distribuição por tipo de chamado</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-2 hover:bg-accent rounded-lg cursor-pointer">
                                    <div>
                                        <p className="font-medium">Satisfação do Cliente</p>
                                        <p className="text-sm text-muted-foreground">Avaliações e feedback</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Relatórios Recentes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <div className="p-4 space-y-2">
                                <div className="flex items-center justify-between p-2 hover:bg-accent rounded-lg cursor-pointer">
                                    <div>
                                        <p className="font-medium">Relatório Mensal - Outubro/2023</p>
                                        <p className="text-sm text-muted-foreground">Gerado em 01/11/2023</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-2 hover:bg-accent rounded-lg cursor-pointer">
                                    <div>
                                        <p className="font-medium">Relatório Semanal - Semana 44</p>
                                        <p className="text-sm text-muted-foreground">Gerado em 30/10/2023</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-2 hover:bg-accent rounded-lg cursor-pointer">
                                    <div>
                                        <p className="font-medium">Análise de Desempenho Q3</p>
                                        <p className="text-sm text-muted-foreground">Gerado em 01/10/2023</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    )
} 