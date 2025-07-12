'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { MainLayout } from '@/components/layout/MainLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function UsersPage() {
    const { getAccessLevel } = useAuth()
    const accessLevel = getAccessLevel()

    const getUsersTitle = () => {
        switch (accessLevel) {
            case 'CROWN':
                return 'Usuários do Sistema'
            case 'FRANCHISOR':
                return 'Usuários da Marca'
            case 'FRANCHISE':
                return 'Usuários da Loja'
            default:
                return 'Usuários'
        }
    }

    return (
        <MainLayout title={getUsersTitle()}>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Total de Usuários</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">24</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Usuários Ativos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">20</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Novos Usuários</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">3</p>
                        <p className="text-sm text-muted-foreground">Últimos 30 dias</p>
                    </CardContent>
                </Card>
            </div>

            <div className="mt-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Lista de Usuários</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <div className="p-4 space-y-2">
                                <div className="flex items-center justify-between p-2 hover:bg-accent rounded-lg">
                                    <div className="flex items-center space-x-4">
                                        <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
                                            <span className="text-sm font-medium text-primary-foreground">JD</span>
                                        </div>
                                        <div>
                                            <p className="font-medium">João da Silva</p>
                                            <p className="text-sm text-muted-foreground">joao.silva@email.com</p>
                                        </div>
                                    </div>
                                    <span className="text-sm text-muted-foreground">Administrador</span>
                                </div>

                                <div className="flex items-center justify-between p-2 hover:bg-accent rounded-lg">
                                    <div className="flex items-center space-x-4">
                                        <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
                                            <span className="text-sm font-medium text-primary-foreground">MS</span>
                                        </div>
                                        <div>
                                            <p className="font-medium">Maria Santos</p>
                                            <p className="text-sm text-muted-foreground">maria.santos@email.com</p>
                                        </div>
                                    </div>
                                    <span className="text-sm text-muted-foreground">Gerente</span>
                                </div>

                                <div className="flex items-center justify-between p-2 hover:bg-accent rounded-lg">
                                    <div className="flex items-center space-x-4">
                                        <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
                                            <span className="text-sm font-medium text-primary-foreground">PO</span>
                                        </div>
                                        <div>
                                            <p className="font-medium">Pedro Oliveira</p>
                                            <p className="text-sm text-muted-foreground">pedro.oliveira@email.com</p>
                                        </div>
                                    </div>
                                    <span className="text-sm text-muted-foreground">Suporte</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    )
} 