'use client'

import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Ticket, BarChart3 } from 'lucide-react'

export default function DashboardPage() {
    const { user, currentTenant } = useAuth()

    return (
        <div className="space-y-6">
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">Dashboard</h2>
                <p className="text-muted-foreground">
                    Bem-vindo ao sistema de gestão {user?.tenant.brand}
                </p>
            </div>

            {/* Cards de Estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total de Tickets</CardTitle>
                        <Ticket className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">24</div>
                        <p className="text-xs text-muted-foreground">+2 desde ontem</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Usuários Ativos</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">+1 desde ontem</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Tickets Abertos</CardTitle>
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">8</div>
                        <p className="text-xs text-muted-foreground">-2 desde ontem</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Tickets Resolvidos</CardTitle>
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">16</div>
                        <p className="text-xs text-muted-foreground">+4 desde ontem</p>
                    </CardContent>
                </Card>
            </div>

            {/* Informações do Tenant */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Informações da Empresa</CardTitle>
                        <CardDescription>
                            Detalhes sobre o tenant atual
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Nome</p>
                                <p className="text-sm">{user?.tenant.name}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Marca</p>
                                <p className="text-sm">{user?.tenant.brand}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">CNPJ</p>
                                <p className="text-sm">{user?.tenant.cnpj}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Segmento</p>
                                <p className="text-sm">{user?.tenant.segment}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Subdomain</p>
                                <p className="text-sm">{user?.tenant.subdomain}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">ID</p>
                                <p className="text-sm">{user?.tenant.id}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Informações do Usuário</CardTitle>
                        <CardDescription>
                            Seus dados de acesso
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Nome</p>
                                <p className="text-sm">{user?.name}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Email</p>
                                <p className="text-sm">{user?.email}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Função</p>
                                <p className="text-sm">{user?.role}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">ID</p>
                                <p className="text-sm">{user?.id}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Tenant Atual</p>
                                <p className="text-sm">{currentTenant}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
} 