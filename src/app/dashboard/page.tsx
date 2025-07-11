'use client'

import { DashboardLayout } from '@/components/layout/MainLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAuthExtended } from '@/contexts/AuthContext'
import { ApiTestPanel } from '@/components/dev/ApiTestPanel'
import {
    TrendingUp,
    Users,
    Ticket,
    Clock,
    CheckCircle,
    AlertCircle,
    Crown,
    Building2,
    Store,
} from 'lucide-react'

export default function DashboardPage() {
    const {
        user,
        getAccessLevel,
        getBrandName,
        getTenantTypeLabel,
        getSegmentLabel
    } = useAuthExtended()

    const accessLevel = getAccessLevel()

    // Mock data - em produção, estes dados viriam da API
    const mockStats = {
        totalTickets: 156,
        openTickets: 42,
        inProgressTickets: 23,
        resolvedTickets: 91,
        avgResolutionTime: 2.5,
        customerSatisfaction: 4.8,
        activeUsers: 28,
        totalTenants: accessLevel === 'CROWN' ? 45 : accessLevel === 'FRANCHISOR' ? 8 : 1,
    }

    const recentTickets = [
        {
            id: '#001',
            title: 'Sistema de pagamento não funciona',
            status: 'open',
            priority: 'high',
            tenant: 'Lacoste Shopping',
            created: '2 horas atrás',
        },
        {
            id: '#002',
            title: 'Problema na integração do estoque',
            status: 'in_progress',
            priority: 'medium',
            tenant: 'Nike Centro',
            created: '4 horas atrás',
        },
        {
            id: '#003',
            title: 'Relatório de vendas incorreto',
            status: 'resolved',
            priority: 'low',
            tenant: 'Adidas Outlet',
            created: '1 dia atrás',
        },
    ]

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'open':
                return 'bg-red-100 text-red-800'
            case 'in_progress':
                return 'bg-yellow-100 text-yellow-800'
            case 'resolved':
                return 'bg-green-100 text-green-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high':
                return 'bg-red-100 text-red-800'
            case 'medium':
                return 'bg-yellow-100 text-yellow-800'
            case 'low':
                return 'bg-green-100 text-green-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    const getAccessLevelIcon = () => {
        switch (accessLevel) {
            case 'CROWN':
                return <Crown className="h-6 w-6 text-yellow-500" />
            case 'FRANCHISOR':
                return <Building2 className="h-6 w-6 text-blue-500" />
            case 'FRANCHISE':
                return <Store className="h-6 w-6 text-green-500" />
            default:
                return <Users className="h-6 w-6 text-gray-500" />
        }
    }

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">
                                Bem-vindo, {user?.name}!
                            </h1>
                            <p className="text-blue-100">
                                {getTenantTypeLabel()} • {getBrandName()} • {getSegmentLabel()}
                            </p>
                        </div>
                        <div className="flex items-center space-x-2">
                            {getAccessLevelIcon()}
                            <Badge className="bg-white/20 text-white hover:bg-white/30">
                                {accessLevel.toLowerCase()}
                            </Badge>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total de Chamados</CardTitle>
                            <Ticket className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{mockStats.totalTickets}</div>
                            <p className="text-xs text-muted-foreground">
                                +12% em relação ao mês anterior
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Chamados Abertos</CardTitle>
                            <AlertCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{mockStats.openTickets}</div>
                            <p className="text-xs text-muted-foreground">
                                Requer atenção imediata
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Tempo Médio de Resolução</CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{mockStats.avgResolutionTime}h</div>
                            <p className="text-xs text-muted-foreground">
                                -15% em relação ao mês anterior
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Satisfação do Cliente</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{mockStats.customerSatisfaction}/5</div>
                            <p className="text-xs text-muted-foreground">
                                +0.2 pontos este mês
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Tickets */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Chamados Recentes</CardTitle>
                            <CardDescription>
                                Últimos chamados {accessLevel === 'CROWN' ? 'do sistema' : 'da sua empresa'}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentTickets.map((ticket) => (
                                    <div key={ticket.id} className="flex items-center justify-between p-3 border rounded-lg">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2 mb-1">
                                                <span className="font-medium">{ticket.id}</span>
                                                <Badge className={getStatusColor(ticket.status)}>
                                                    {ticket.status}
                                                </Badge>
                                                <Badge className={getPriorityColor(ticket.priority)}>
                                                    {ticket.priority}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground truncate">
                                                {ticket.title}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {ticket.tenant} • {ticket.created}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Status Distribution */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Distribuição de Status</CardTitle>
                            <CardDescription>
                                Visão geral do status dos chamados
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <AlertCircle className="h-4 w-4 text-red-500" />
                                        <span className="text-sm">Abertos</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm font-medium">{mockStats.openTickets}</span>
                                        <div className="w-20 bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-red-500 h-2 rounded-full"
                                                style={{ width: `${(mockStats.openTickets / mockStats.totalTickets) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Clock className="h-4 w-4 text-yellow-500" />
                                        <span className="text-sm">Em Progresso</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm font-medium">{mockStats.inProgressTickets}</span>
                                        <div className="w-20 bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-yellow-500 h-2 rounded-full"
                                                style={{ width: `${(mockStats.inProgressTickets / mockStats.totalTickets) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                        <span className="text-sm">Resolvidos</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm font-medium">{mockStats.resolvedTickets}</span>
                                        <div className="w-20 bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-green-500 h-2 rounded-full"
                                                style={{ width: `${(mockStats.resolvedTickets / mockStats.totalTickets) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Crown-specific section */}
                {accessLevel === 'CROWN' && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Visão Geral dos Tenants</CardTitle>
                            <CardDescription>
                                Estatísticas globais do sistema
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-blue-600">{mockStats.totalTenants}</div>
                                    <p className="text-sm text-muted-foreground">Total de Tenants</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600">{mockStats.activeUsers}</div>
                                    <p className="text-sm text-muted-foreground">Usuários Ativos</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-purple-600">6</div>
                                    <p className="text-sm text-muted-foreground">Segmentos Ativos</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Development API Testing Panel */}
                <ApiTestPanel />
            </div>
        </DashboardLayout>
    )
} 