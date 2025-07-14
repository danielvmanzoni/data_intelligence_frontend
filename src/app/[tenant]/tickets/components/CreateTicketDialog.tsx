import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { api } from '@/lib/api'
import { useToast } from '@/hooks/useToast'
import { useCategories } from '@/hooks/useCategories'
import { useTenant } from '@/hooks/useTenant'
import { AxiosError } from 'axios'

interface ApiErrorResponse {
    message: string;
    error: string;
    statusCode: number;
}

interface CreateTicketDialogProps {
    onTicketCreated: () => void
}

interface CategoryItemProps {
    name: string;
    description?: string;
    color: string;
    showDescription?: boolean;
}

function CategoryItem({ name, description, color, showDescription = true }: CategoryItemProps) {
    return (
        <div className="flex items-center gap-2 py-1">
            <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: color }}
            />
            <div className="flex-1 min-w-0">
                <div className="truncate">{name}</div>
                {showDescription && description && (
                    <div className="text-xs text-muted-foreground truncate">
                        {description}
                    </div>
                )}
            </div>
        </div>
    );
}

export function CreateTicketDialog({ onTicketCreated }: CreateTicketDialogProps) {
    const [open, setOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()
    const tenant = useTenant()
    const { categories, isLoading: isCategoriesLoading, error: categoriesError } = useCategories()

    // Se não tiver tenant ou houver erro nas categorias, desabilita o formulário
    const isFormDisabled = !tenant?.slug || !!categoriesError || categories.length === 0

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!tenant?.slug) {
            toast({
                title: 'Erro',
                description: 'Não foi possível identificar o tenant. Por favor, faça login novamente.',
                variant: 'destructive',
            })
            return
        }

        if (categories.length === 0) {
            toast({
                title: 'Erro',
                description: 'Não há categorias disponíveis para criar um ticket.',
                variant: 'destructive',
            })
            return
        }

        setIsLoading(true)

        const formData = new FormData(e.currentTarget)
        const categoryId = formData.get('categoryId') as string

        // Valida se a categoria selecionada pertence ao tenant
        const isValidCategory = categories.some(category => category.id === categoryId)
        if (!isValidCategory) {
            toast({
                title: 'Erro',
                description: 'Categoria inválida. Por favor, selecione uma categoria válida.',
                variant: 'destructive',
            })
            setIsLoading(false)
            return
        }

        const data = {
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            priority: formData.get('priority') as string,
            categoryId,
            dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 dias a partir de hoje
            guestName: formData.get('guestName') as string,
            guestEmail: formData.get('guestEmail') as string,
            guestPhone: formData.get('guestPhone') as string,
        }

        try {
            await api.post(`/${tenant.slug}/tickets`, data)
            toast({
                title: 'Sucesso',
                description: 'Ticket criado com sucesso',
            })
            setOpen(false)
            onTicketCreated()
        } catch (error) {
            console.error('Erro ao criar ticket:', error)
            const axiosError = error as AxiosError<ApiErrorResponse>
            toast({
                title: 'Erro',
                description: axiosError.response?.data?.message || 'Não foi possível criar o ticket',
                variant: 'destructive',
            })
        } finally {
            setIsLoading(false)
        }
    }

    const selectedCategoryData = selectedCategory
        ? categories.find(c => c.id === selectedCategory)
        : null;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button disabled={isFormDisabled}>
                    {categoriesError ? 'Erro ao carregar categorias' : 'Novo Chamado'}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Criar Novo Chamado</DialogTitle>
                        <DialogDescription>
                            Preencha os dados abaixo para criar um novo chamado.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-6 py-4">
                        {/* Informações do Chamado */}
                        <div className="space-y-4">
                            <h4 className="text-sm font-medium">Informações do Chamado</h4>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="title">Título</Label>
                                    <Input
                                        id="title"
                                        name="title"
                                        placeholder="Digite o título do chamado"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="description">Descrição</Label>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        placeholder="Descreva o problema em detalhes"
                                        required
                                        className="min-h-[100px]"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Categoria e Prioridade */}
                        <div className="space-y-4">
                            <h4 className="text-sm font-medium">Classificação</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="categoryId">Categoria</Label>
                                    <Select
                                        name="categoryId"
                                        value={selectedCategory || undefined}
                                        onValueChange={setSelectedCategory}
                                        required
                                    >
                                        <SelectTrigger className="h-auto min-h-[40px]">
                                            <SelectValue placeholder="Selecione a categoria">
                                                {selectedCategoryData && (
                                                    <CategoryItem
                                                        name={selectedCategoryData.name}
                                                        color={selectedCategoryData.color}
                                                        showDescription={false}
                                                    />
                                                )}
                                            </SelectValue>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem
                                                    key={category.id}
                                                    value={category.id}
                                                    className="h-auto"
                                                >
                                                    <CategoryItem
                                                        name={category.name}
                                                        description={category.description}
                                                        color={category.color}
                                                    />
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {categoriesError && (
                                        <p className="text-sm text-destructive">{categoriesError}</p>
                                    )}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="priority">Prioridade</Label>
                                    <Select name="priority" defaultValue="LOW">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione a prioridade" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="LOW">Baixa</SelectItem>
                                            <SelectItem value="MEDIUM">Média</SelectItem>
                                            <SelectItem value="HIGH">Alta</SelectItem>
                                            <SelectItem value="URGENT">Urgente</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        {/* Informações do Solicitante */}
                        <div className="space-y-4">
                            <h4 className="text-sm font-medium">Informações do Solicitante</h4>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="guestName">Nome</Label>
                                    <Input
                                        id="guestName"
                                        name="guestName"
                                        placeholder="Digite o nome do solicitante"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="guestEmail">Email</Label>
                                        <Input
                                            id="guestEmail"
                                            name="guestEmail"
                                            type="email"
                                            placeholder="Digite o email"
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="guestPhone">Telefone</Label>
                                        <Input
                                            id="guestPhone"
                                            name="guestPhone"
                                            placeholder="(00) 00000-0000"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="submit"
                            disabled={isLoading || isCategoriesLoading || isFormDisabled}
                        >
                            {isLoading ? 'Criando...' : 'Criar Chamado'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
} 