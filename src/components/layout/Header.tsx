'use client'

import { useState } from 'react'
import { useAuthExtended } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import {
    Bell,
    Search,
    Filter,
    Settings,
    User,
    LogOut,
    Menu,
    Crown,
    Building2,
    Store,
} from 'lucide-react'

interface HeaderProps {
    title?: string
    onMenuClick?: () => void
    showFilters?: boolean
    showSearch?: boolean
    showNotifications?: boolean
}

export function Header({
    title,
    onMenuClick,
    showFilters = true,
    showSearch = true,
    showNotifications = true
}: HeaderProps) {
    const {
        user,
        tenant,
        logout,
        getAccessLevel,
        getBrandName,
        getTenantTypeLabel,
        getSegmentLabel
    } = useAuthExtended()

    const [searchValue, setSearchValue] = useState('')
    const [selectedBrand, setSelectedBrand] = useState<string>('')
    const [selectedSegment, setSelectedSegment] = useState<string>('')
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)

    const accessLevel = getAccessLevel()
    const canSelectBrand = accessLevel === 'CROWN'
    const canSelectSegment = accessLevel === 'CROWN'

    const getAccessLevelIcon = () => {
        switch (accessLevel) {
            case 'CROWN':
                return <Crown className="h-4 w-4 text-yellow-500" />
            case 'FRANCHISOR':
                return <Building2 className="h-4 w-4 text-blue-500" />
            case 'FRANCHISE':
                return <Store className="h-4 w-4 text-green-500" />
            default:
                return <User className="h-4 w-4 text-gray-500" />
        }
    }

    const mockNotifications = [
        {
            id: '1',
            title: 'Novo chamado criado',
            message: 'Chamado #001 foi criado na franquia Lacoste Shopping',
            time: '2 min atrás',
            read: false,
        },
        {
            id: '2',
            title: 'Chamado resolvido',
            message: 'Chamado #002 foi resolvido com sucesso',
            time: '1 hora atrás',
            read: false,
        },
        {
            id: '3',
            title: 'Nova franquia adicionada',
            message: 'Franquia Nike Centro foi adicionada ao sistema',
            time: '3 horas atrás',
            read: true,
        },
    ]

    const unreadCount = mockNotifications.filter(n => !n.read).length

    if (!user || !tenant) {
        return null
    }

    return (
        <header className="h-16 bg-background border-b flex items-center justify-between px-4 lg:px-6">
            {/* Left Section */}
            <div className="flex items-center space-x-4">
                {/* Mobile Menu Button */}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onMenuClick}
                    className="lg:hidden"
                >
                    <Menu className="h-5 w-5" />
                </Button>

                {/* Title */}
                <div className="flex items-center space-x-2">
                    {title && (
                        <h1 className="text-xl font-semibold text-foreground">
                            {title}
                        </h1>
                    )}
                </div>

                {/* Tenant Info */}
                <div className="hidden md:flex items-center space-x-2">
                    {getAccessLevelIcon()}
                    <div className="flex flex-col">
                        <span className="text-sm font-medium">
                            {getBrandName()}
                        </span>
                        <span className="text-xs text-muted-foreground">
                            {getTenantTypeLabel()} • {getSegmentLabel()}
                        </span>
                    </div>
                </div>
            </div>

            {/* Center Section - Search and Filters */}
            <div className="flex items-center space-x-4 flex-1 max-w-2xl mx-4">
                {/* Search */}
                {showSearch && (
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Buscar chamados, usuários..."
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className="pl-9"
                        />
                    </div>
                )}

                {/* Filters (Crown only) */}
                {showFilters && canSelectBrand && (
                    <div className="hidden lg:flex items-center space-x-2">
                        <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                            <SelectTrigger className="w-32">
                                <SelectValue placeholder="Marca" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todas</SelectItem>
                                <SelectItem value="lacoste">Lacoste</SelectItem>
                                <SelectItem value="nike">Nike</SelectItem>
                                <SelectItem value="adidas">Adidas</SelectItem>
                                <SelectItem value="mcdonalds">McDonald&apos;s</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={selectedSegment} onValueChange={setSelectedSegment}>
                            <SelectTrigger className="w-32">
                                <SelectValue placeholder="Segmento" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todos</SelectItem>
                                <SelectItem value="MODA">Moda</SelectItem>
                                <SelectItem value="FOOD">Alimentação</SelectItem>
                                <SelectItem value="FARMA">Farmácia</SelectItem>
                                <SelectItem value="TECH">Tecnologia</SelectItem>
                                <SelectItem value="BEAUTY">Beleza</SelectItem>
                                <SelectItem value="SPORT">Esporte</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                )}

                {/* Mobile Filters */}
                {showFilters && (
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="sm" className="lg:hidden">
                                <Filter className="h-4 w-4" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right">
                            <SheetHeader>
                                <SheetTitle>Filtros</SheetTitle>
                                <SheetDescription>
                                    Filtre os dados por marca e segmento
                                </SheetDescription>
                            </SheetHeader>
                            <div className="mt-6 space-y-4">
                                {canSelectBrand && (
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Marca</label>
                                        <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione uma marca" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">Todas as marcas</SelectItem>
                                                <SelectItem value="lacoste">Lacoste</SelectItem>
                                                <SelectItem value="nike">Nike</SelectItem>
                                                <SelectItem value="adidas">Adidas</SelectItem>
                                                <SelectItem value="mcdonalds">McDonald&apos;s</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}

                                {canSelectSegment && (
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Segmento</label>
                                        <Select value={selectedSegment} onValueChange={setSelectedSegment}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione um segmento" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">Todos os segmentos</SelectItem>
                                                <SelectItem value="MODA">Moda</SelectItem>
                                                <SelectItem value="FOOD">Alimentação</SelectItem>
                                                <SelectItem value="FARMA">Farmácia</SelectItem>
                                                <SelectItem value="TECH">Tecnologia</SelectItem>
                                                <SelectItem value="BEAUTY">Beleza</SelectItem>
                                                <SelectItem value="SPORT">Esporte</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}
                            </div>
                        </SheetContent>
                    </Sheet>
                )}
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-3">
                {/* Notifications */}
                {showNotifications && (
                    <DropdownMenu open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen}>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="relative">
                                <Bell className="h-5 w-5" />
                                {unreadCount > 0 && (
                                    <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
                                        {unreadCount}
                                    </Badge>
                                )}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-80">
                            <DropdownMenuLabel>Notificações</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {mockNotifications.length > 0 ? (
                                mockNotifications.map((notification) => (
                                    <DropdownMenuItem key={notification.id} className="p-3">
                                        <div className="flex items-start space-x-3">
                                            <div className={`h-2 w-2 rounded-full ${notification.read ? 'bg-muted' : 'bg-primary'
                                                }`} />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium truncate">
                                                    {notification.title}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {notification.message}
                                                </p>
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    {notification.time}
                                                </p>
                                            </div>
                                        </div>
                                    </DropdownMenuItem>
                                ))
                            ) : (
                                <DropdownMenuItem disabled>
                                    Nenhuma notificação
                                </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-center">
                                Ver todas as notificações
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}

                {/* User Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback>
                                    {user.name.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium">{user.name}</p>
                                <p className="text-xs text-muted-foreground">{user.email}</p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" />
                            Perfil
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4" />
                            Configurações
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={logout}>
                            <LogOut className="mr-2 h-4 w-4" />
                            Sair
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
} 