import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { api } from '@/lib/api'
import { useToast } from '@/hooks/useToast'
import { useTenant } from '@/hooks/useTenant'
import { Ticket } from '@/types/api'
import { Badge } from '@/components/ui/badge'

interface TicketDetailsDialogProps {
    ticket: Ticket
    open: boolean
    onOpenChange: (open: boolean) => void
    onTicketUpdated: (updatedTicket: Ticket) => void
}

export function TicketDetailsDialog({ ticket: initialTicket, open, onOpenChange, onTicketUpdated }: TicketDetailsDialogProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [ticket, setTicket] = useState(initialTicket)
    const { toast } = useToast()
    const tenant = useTenant()

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

    const handleUpdateStatus = async (newStatus: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED") => {
        if (!tenant?.slug) return;

        // Atualização otimista
        const previousTicket = { ...ticket };
        const updatedTicket = { ...ticket, status: newStatus };
        setTicket(updatedTicket);
        onTicketUpdated(updatedTicket); // Atualiza o estado do pai imediatamente

        try {
            setIsLoading(true);
            const response = await api.patch(`/${tenant.slug}/tickets/${ticket.id}`, {
                title: ticket.title,
                description: ticket.description,
                priority: ticket.priority,
                categoryId: ticket.category.id,
                dueDate: ticket.dueDate,
                assigneeId: ticket.assignee?.id,
                guestName: ticket.guestName,
                guestEmail: ticket.guestEmail,
                guestPhone: ticket.guestPhone,
                status: newStatus
            });

            // Atualiza com a resposta da API para garantir consistência
            const updatedFromApi = response.data;
            setTicket(updatedFromApi);
            onTicketUpdated(updatedFromApi);

            toast({
                title: 'Sucesso',
                description: 'Status do chamado atualizado'
            });
        } catch (error) {
            // Reverter em caso de erro
            console.error('Erro ao atualizar status:', error);
            setTicket(previousTicket);
            onTicketUpdated(previousTicket);
            toast({
                title: 'Erro',
                description: 'Não foi possível atualizar o status do chamado',
                variant: 'destructive'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdatePriority = async (newPriority: "LOW" | "MEDIUM" | "HIGH" | "URGENT") => {
        if (!tenant?.slug) return;

        // Atualização otimista
        const previousTicket = { ...ticket };
        const updatedTicket = { ...ticket, priority: newPriority };
        setTicket(updatedTicket);
        onTicketUpdated(updatedTicket); // Atualiza o estado do pai imediatamente

        try {
            setIsLoading(true);
            const response = await api.patch(`/${tenant.slug}/tickets/${ticket.id}`, {
                title: ticket.title,
                description: ticket.description,
                priority: newPriority,
                categoryId: ticket.category.id,
                dueDate: ticket.dueDate,
                assigneeId: ticket.assignee?.id,
                guestName: ticket.guestName,
                guestEmail: ticket.guestEmail,
                guestPhone: ticket.guestPhone,
                status: ticket.status
            });

            // Atualiza com a resposta da API para garantir consistência
            const updatedFromApi = response.data;
            setTicket(updatedFromApi);
            onTicketUpdated(updatedFromApi);

            toast({
                title: 'Sucesso',
                description: 'Prioridade do chamado atualizada'
            });
        } catch (error) {
            // Reverter em caso de erro
            console.error('Erro ao atualizar prioridade:', error);
            setTicket(previousTicket);
            onTicketUpdated(previousTicket);
            toast({
                title: 'Erro',
                description: 'Não foi possível atualizar a prioridade do chamado',
                variant: 'destructive'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        #{ticket.number} - {ticket.title}
                    </DialogTitle>
                    <DialogDescription>
                        Detalhes do chamado
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-6 py-4">
                    {/* Status e Prioridade */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Status</Label>
                            <Select
                                defaultValue={ticket.status}
                                onValueChange={handleUpdateStatus}
                                disabled={isLoading}
                            >
                                <SelectTrigger>
                                    <SelectValue>
                                        <Badge className={getStatusColor(ticket.status)}>
                                            {formatStatus(ticket.status)}
                                        </Badge>
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="OPEN">
                                        <Badge className={getStatusColor('OPEN')}>
                                            {formatStatus('OPEN')}
                                        </Badge>
                                    </SelectItem>
                                    <SelectItem value="IN_PROGRESS">
                                        <Badge className={getStatusColor('IN_PROGRESS')}>
                                            {formatStatus('IN_PROGRESS')}
                                        </Badge>
                                    </SelectItem>
                                    <SelectItem value="RESOLVED">
                                        <Badge className={getStatusColor('RESOLVED')}>
                                            {formatStatus('RESOLVED')}
                                        </Badge>
                                    </SelectItem>
                                    <SelectItem value="CLOSED">
                                        <Badge className={getStatusColor('CLOSED')}>
                                            {formatStatus('CLOSED')}
                                        </Badge>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Prioridade</Label>
                            <Select
                                defaultValue={ticket.priority}
                                onValueChange={handleUpdatePriority}
                                disabled={isLoading}
                            >
                                <SelectTrigger>
                                    <SelectValue>
                                        <Badge className={getPriorityColor(ticket.priority)}>
                                            {formatPriority(ticket.priority)}
                                        </Badge>
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="LOW">
                                        <Badge className={getPriorityColor('LOW')}>
                                            {formatPriority('LOW')}
                                        </Badge>
                                    </SelectItem>
                                    <SelectItem value="MEDIUM">
                                        <Badge className={getPriorityColor('MEDIUM')}>
                                            {formatPriority('MEDIUM')}
                                        </Badge>
                                    </SelectItem>
                                    <SelectItem value="HIGH">
                                        <Badge className={getPriorityColor('HIGH')}>
                                            {formatPriority('HIGH')}
                                        </Badge>
                                    </SelectItem>
                                    <SelectItem value="URGENT">
                                        <Badge className={getPriorityColor('URGENT')}>
                                            {formatPriority('URGENT')}
                                        </Badge>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Categoria */}
                    <div className="space-y-2">
                        <Label>Categoria</Label>
                        <div className="flex items-center gap-2 p-2 rounded-md border">
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: ticket.category.color }}
                            />
                            <div>
                                <div>{ticket.category.name}</div>
                                <div className="text-sm text-muted-foreground">
                                    {ticket.category.description}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Descrição */}
                    <div className="space-y-2">
                        <Label>Descrição</Label>
                        <Textarea
                            value={ticket.description}
                            readOnly
                            className="min-h-[100px] bg-muted"
                        />
                    </div>

                    {/* Informações do Solicitante */}
                    <div className="space-y-2">
                        <Label>Informações do Solicitante</Label>
                        <div className="grid gap-2 p-4 rounded-md border">
                            <div className="grid grid-cols-[100px_1fr] gap-2">
                                <span className="text-muted-foreground">Nome:</span>
                                <span>{ticket.guestName}</span>
                            </div>
                            <div className="grid grid-cols-[100px_1fr] gap-2">
                                <span className="text-muted-foreground">Email:</span>
                                <span>{ticket.guestEmail}</span>
                            </div>
                            <div className="grid grid-cols-[100px_1fr] gap-2">
                                <span className="text-muted-foreground">Telefone:</span>
                                <span>{ticket.guestPhone}</span>
                            </div>
                        </div>
                    </div>

                    {/* Datas */}
                    <div className="space-y-2">
                        <Label>Datas</Label>
                        <div className="grid gap-2 p-4 rounded-md border">
                            <div className="grid grid-cols-[120px_1fr] gap-2">
                                <span className="text-muted-foreground">Criado em:</span>
                                <span>{new Date(ticket.createdAt).toLocaleString('pt-BR')}</span>
                            </div>
                            <div className="grid grid-cols-[120px_1fr] gap-2">
                                <span className="text-muted-foreground">Atualizado em:</span>
                                <span>{new Date(ticket.updatedAt).toLocaleString('pt-BR')}</span>
                            </div>
                            <div className="grid grid-cols-[120px_1fr] gap-2">
                                <span className="text-muted-foreground">Vencimento:</span>
                                <span>{new Date(ticket.dueDate).toLocaleString('pt-BR')}</span>
                            </div>
                            {ticket.resolvedAt && (
                                <div className="grid grid-cols-[120px_1fr] gap-2">
                                    <span className="text-muted-foreground">Resolvido em:</span>
                                    <span>{new Date(ticket.resolvedAt).toLocaleString('pt-BR')}</span>
                                </div>
                            )}
                            {ticket.closedAt && (
                                <div className="grid grid-cols-[120px_1fr] gap-2">
                                    <span className="text-muted-foreground">Fechado em:</span>
                                    <span>{new Date(ticket.closedAt).toLocaleString('pt-BR')}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Responsáveis */}
                    <div className="space-y-2">
                        <Label>Responsáveis</Label>
                        <div className="grid gap-2 p-4 rounded-md border">
                            <div className="grid grid-cols-[100px_1fr] gap-2">
                                <span className="text-muted-foreground">Criador:</span>
                                <span>{ticket.creator.name}</span>
                            </div>
                            {ticket.assignee && (
                                <div className="grid grid-cols-[100px_1fr] gap-2">
                                    <span className="text-muted-foreground">Atribuído:</span>
                                    <span>{ticket.assignee.name}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        Fechar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
} 