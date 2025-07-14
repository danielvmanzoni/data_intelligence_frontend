'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useTickets } from '@/hooks/useTickets'
import { Badge } from '@/components/ui/badge'
import { Ticket } from '@/types/api'
import { Loading } from '@/components/ui/loading'
import { CreateTicketDialog } from './components/CreateTicketDialog'
import { TicketDetailsDialog } from './components/TicketDetailsDialog'
import { useState, useMemo } from 'react'

export default function TicketsPage() {
    const { tickets, isLoading, error, refetch } = useTickets()
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)

    // Calcular stats localmente
    const stats = useMemo(() => {
        return {
            open: tickets.filter(t => t.status === 'OPEN').length,
            inProgress: tickets.filter(t => t.status === 'IN_PROGRESS').length,
            resolved: tickets.filter(t => t.status === 'RESOLVED').length,
            total: tickets.length
        }
    }, [tickets])

    if (isLoading) {
        return <Loading />
    }

    if (error) {
        return (
            <div className="p-4">
                <p className="text-red-500">{error}</p>
            </div>
        )
    }

    // Atualização otimista do ticket
    const handleTicketUpdated = (updatedTicket: Ticket) => {
        // Atualizar o ticket selecionado
        setSelectedTicket(updatedTicket)
        // O estado dos tickets será atualizado pelo useTickets hook
        refetch()
    }

    const handleTicketCreated = () => {
        refetch()
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'OPEN':
                return 'bg-yellow-500'
            case 'IN_PROGRESS':
                return 'bg-blue-500'
            case 'RESOLVED':
                return 'bg-green-500'
            case 'CLOSED':
                return 'bg-gray-500'
            default:
                return 'bg-gray-500'
        }
    }

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'LOW':
                return 'bg-green-500'
            case 'MEDIUM':
                return 'bg-yellow-500'
            case 'HIGH':
                return 'bg-orange-500'
            case 'URGENT':
                return 'bg-red-500'
            default:
                return 'bg-gray-500'
        }
    }

    const formatStatus = (status: string) => {
        switch (status) {
            case 'OPEN':
                return 'Aberto'
            case 'IN_PROGRESS':
                return 'Em Andamento'
            case 'RESOLVED':
                return 'Resolvido'
            case 'CLOSED':
                return 'Fechado'
            default:
                return status
        }
    }

    const formatPriority = (priority: string) => {
        switch (priority) {
            case 'LOW':
                return 'Baixa'
            case 'MEDIUM':
                return 'Média'
            case 'HIGH':
                return 'Alta'
            case 'URGENT':
                return 'Urgente'
            default:
                return priority
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Chamados</h1>
                    <p className="text-muted-foreground">Gerencie seus tickets de suporte</p>
                </div>
                <CreateTicketDialog onTicketCreated={handleTicketCreated} />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Chamados Abertos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{stats.open}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Em Andamento</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{stats.inProgress}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Resolvidos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{stats.resolved}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Total</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{stats.total}</p>
                    </CardContent>
                </Card>
            </div>

            <div className="mt-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Lista de Chamados</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {tickets.length === 0 ? (
                            <div className="rounded-md border">
                                <div className="p-4">
                                    <p className="text-sm text-muted-foreground">
                                        Nenhum chamado encontrado.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="rounded-md border divide-y">
                                {tickets.map((ticket: Ticket) => (
                                    <div
                                        key={ticket.id}
                                        className="p-4 hover:bg-muted/50 cursor-pointer"
                                        onClick={() => setSelectedTicket(ticket)}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-medium">#{ticket.number}</h3>
                                                    <h3 className="font-medium">{ticket.title}</h3>
                                                </div>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <div
                                                        className="w-3 h-3 rounded-full"
                                                        style={{ backgroundColor: ticket.category.color }}
                                                    />
                                                    <span className="text-sm text-muted-foreground">
                                                        {ticket.category.name}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Badge className={getStatusColor(ticket.status)}>
                                                    {formatStatus(ticket.status)}
                                                </Badge>
                                                <Badge className={getPriorityColor(ticket.priority)}>
                                                    {formatPriority(ticket.priority)}
                                                </Badge>
                                            </div>
                                        </div>
                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                            {ticket.description}
                                        </p>
                                        <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                                            <div>
                                                Solicitante: {ticket.guestName}
                                            </div>
                                            <div>
                                                Criado por: {ticket.creator.name}
                                            </div>
                                            <div>
                                                Em: {new Date(ticket.createdAt).toLocaleDateString('pt-BR')}
                                            </div>
                                            {ticket._count.comments > 0 && (
                                                <div>
                                                    Comentários: {ticket._count.comments}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {selectedTicket && (
                <TicketDetailsDialog
                    ticket={selectedTicket}
                    open={!!selectedTicket}
                    onOpenChange={(open) => !open && setSelectedTicket(null)}
                    onTicketUpdated={handleTicketUpdated}
                />
            )}
        </div>
    )
}
