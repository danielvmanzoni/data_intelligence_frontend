'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useAuthExtended } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
    LayoutDashboard,
    Ticket,
    Users,
    Building2,
    BarChart3,
    Settings,
    Crown,
    Store,
    ShoppingBag,
    FileText,
    Bell,
    HelpCircle,
    LogOut,
    ChevronDown,
    ChevronRight,
} from 'lucide-react'
import { useState } from 'react'

interface SidebarProps {
    className?: string
}

interface MenuItem {
    href: string
    icon: React.ComponentType<{ className?: string }>
    label: string
    badge?: string
    requiredRoles?: string[]
    requiredPermissions?: string[]
    children?: MenuItem[]
}

export function Sidebar({ className }: SidebarProps) {
    const pathname = usePathname()
    const { user, tenant, logout, getAccessLevel, getBrandName, getTenantTypeLabel } = useAuthExtended()
    const [expandedSections, setExpandedSections] = useState<string[]>(['main'])

    const toggleSection = (section: string) => {
        setExpandedSections(prev =>
            prev.includes(section)
                ? prev.filter(s => s !== section)
                : [...prev, section]
        )
    }

    const getMenuItems = (): MenuItem[] => {
        const accessLevel = getAccessLevel()

        const baseItems: MenuItem[] = [
            {
                href: '/dashboard',
                icon: LayoutDashboard,
                label: 'Dashboard',
            },
            {
                href: '/tickets',
                icon: Ticket,
                label: 'Chamados',
                badge: '12', // TODO: Implementar contador dinâmico
            },
        ]

        // Itens específicos para Crown
        if (accessLevel === 'CROWN') {
            baseItems.push(
                {
                    href: '/tenants',
                    icon: Building2,
                    label: 'Tenants',
                    children: [
                        {
                            href: '/tenants',
                            icon: Building2,
                            label: 'Todos os Tenants',
                        },
                        {
                            href: '/tenants/brands',
                            icon: Store,
                            label: 'Marcas',
                        },
                        {
                            href: '/tenants/segments',
                            icon: ShoppingBag,
                            label: 'Segmentos',
                        },
                    ],
                },
                {
                    href: '/reports',
                    icon: BarChart3,
                    label: 'Relatórios Globais',
                },
                {
                    href: '/users',
                    icon: Users,
                    label: 'Usuários',
                }
            )
        }

        // Itens específicos para Franqueador
        if (accessLevel === 'FRANCHISOR') {
            baseItems.push(
                {
                    href: '/franchises',
                    icon: Store,
                    label: 'Franquias',
                },
                {
                    href: '/reports',
                    icon: BarChart3,
                    label: 'Relatórios da Marca',
                },
                {
                    href: '/users',
                    icon: Users,
                    label: 'Usuários',
                }
            )
        }

        // Itens específicos para Franquia
        if (accessLevel === 'FRANCHISE') {
            baseItems.push(
                {
                    href: '/reports',
                    icon: BarChart3,
                    label: 'Relatórios da Loja',
                },
                {
                    href: '/users',
                    icon: Users,
                    label: 'Usuários',
                }
            )
        }

        // Itens comuns para todos os níveis administrativos
        if (['CROWN', 'FRANCHISOR', 'FRANCHISE'].includes(accessLevel)) {
            baseItems.push(
                {
                    href: '/categories',
                    icon: FileText,
                    label: 'Categorias',
                },
                {
                    href: '/notifications',
                    icon: Bell,
                    label: 'Notificações',
                    badge: '3', // TODO: Implementar contador dinâmico
                },
                {
                    href: '/settings',
                    icon: Settings,
                    label: 'Configurações',
                }
            )
        }

        // Itens para todos os usuários
        baseItems.push(
            {
                href: '/help',
                icon: HelpCircle,
                label: 'Ajuda',
            }
        )

        return baseItems
    }

    const renderMenuItem = (item: MenuItem, depth = 0) => {
        const isActive = pathname === item.href
        const hasChildren = item.children && item.children.length > 0
        const isExpanded = expandedSections.includes(item.href)

        if (hasChildren) {
            return (
                <div key={item.href} className="space-y-1">
                    <button
                        onClick={() => toggleSection(item.href)}
                        className={cn(
                            'w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors hover:bg-accent hover:text-accent-foreground',
                            isActive && 'bg-accent text-accent-foreground'
                        )}
                    >
                        <div className="flex items-center space-x-2">
                            <item.icon className="h-4 w-4" />
                            <span>{item.label}</span>
                            {item.badge && (
                                <Badge variant="secondary" className="h-5 px-1.5">
                                    {item.badge}
                                </Badge>
                            )}
                        </div>
                        {isExpanded ? (
                            <ChevronDown className="h-4 w-4" />
                        ) : (
                            <ChevronRight className="h-4 w-4" />
                        )}
                    </button>
                    {isExpanded && item.children && (
                        <div className="ml-4 space-y-1">
                            {item.children.map(child => renderMenuItem(child, depth + 1))}
                        </div>
                    )}
                </div>
            )
        }

        return (
            <Link
                key={item.href}
                href={item.href}
                className={cn(
                    'flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors hover:bg-accent hover:text-accent-foreground',
                    isActive && 'bg-accent text-accent-foreground',
                    depth > 0 && 'ml-4'
                )}
            >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
                {item.badge && (
                    <Badge variant="secondary" className="h-5 px-1.5">
                        {item.badge}
                    </Badge>
                )}
            </Link>
        )
    }

    const getAccessLevelIcon = () => {
        const level = getAccessLevel()
        switch (level) {
            case 'CROWN':
                return <Crown className="h-4 w-4 text-yellow-500" />
            case 'FRANCHISOR':
                return <Building2 className="h-4 w-4 text-blue-500" />
            case 'FRANCHISE':
                return <Store className="h-4 w-4 text-green-500" />
            default:
                return <Users className="h-4 w-4 text-gray-500" />
        }
    }

    const getAccessLevelColor = () => {
        const level = getAccessLevel()
        switch (level) {
            case 'CROWN':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200'
            case 'FRANCHISOR':
                return 'bg-blue-100 text-blue-800 border-blue-200'
            case 'FRANCHISE':
                return 'bg-green-100 text-green-800 border-green-200'
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200'
        }
    }

    if (!user || !tenant) {
        return null
    }

    return (
        <div className={cn('flex h-full w-64 flex-col bg-background border-r', className)}>
            {/* Header da Sidebar */}
            <div className="p-4 border-b">
                <div className="flex items-center space-x-2">
                    {getAccessLevelIcon()}
                    <div className="flex-1 min-w-0">
                        <h2 className="text-sm font-semibold truncate">
                            {getBrandName() || 'Sistema'}
                        </h2>
                        <p className="text-xs text-muted-foreground truncate">
                            {getTenantTypeLabel()}
                        </p>
                    </div>
                </div>
                <div className="mt-2">
                    <Badge className={cn('text-xs', getAccessLevelColor())}>
                        {getAccessLevel().toLowerCase()}
                    </Badge>
                    {tenant.segment && (
                        <Badge variant="outline" className="ml-2 text-xs">
                            {tenant.segment}
                        </Badge>
                    )}
                </div>
            </div>

            {/* Menu de Navegação */}
            <nav className="flex-1 overflow-y-auto p-4">
                <div className="space-y-1">
                    {getMenuItems().map(item => renderMenuItem(item))}
                </div>
            </nav>

            {/* Footer da Sidebar */}
            <div className="p-4 border-t">
                <div className="flex items-center space-x-2 mb-3">
                    <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-primary-foreground">
                            {user.name.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{user.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                </div>
                <Separator className="my-2" />
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={logout}
                    className="w-full justify-start"
                >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sair
                </Button>
            </div>
        </div>
    )
} 