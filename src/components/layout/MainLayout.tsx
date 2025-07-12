'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

interface MainLayoutProps {
    children: React.ReactNode
    title?: string
    showFilters?: boolean
    showSearch?: boolean
    showNotifications?: boolean
    className?: string
}

export function MainLayout({
    children,
    title,
    showFilters = true,
    showSearch = true,
    showNotifications = true,
    className,
}: MainLayoutProps) {
    const { isAuthenticated } = useAuth()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const pathname = usePathname()

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    // Se estiver na página de login, renderizar apenas o conteúdo com fundo
    if (pathname?.includes('/login')) {
        return (
            <div className="min-h-screen bg-background">
                {children}
            </div>
        )
    }

    // Se não estiver autenticado, renderizar apenas o conteúdo com fundo
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-background">
                {children}
            </div>
        )
    }

    // Layout autenticado com sidebar
    return (
        <div className="min-h-screen flex bg-background">
            {/* Sidebar Desktop */}
            <div className="hidden lg:flex lg:shrink-0">
                <Sidebar />
            </div>

            {/* Sidebar Mobile */}
            {isSidebarOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50"
                        onClick={toggleSidebar}
                    />
                    <div className="fixed inset-y-0 left-0 w-64 bg-background">
                        <Sidebar />
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="flex flex-col flex-1 min-h-screen">
                {/* Header */}
                <Header
                    title={title}
                    onMenuClick={toggleSidebar}
                    showFilters={showFilters}
                    showSearch={showSearch}
                    showNotifications={showNotifications}
                />

                {/* Page Content */}
                <main className={cn(
                    'flex-1 overflow-y-auto bg-background p-4 lg:p-6',
                    className
                )}>
                    {children}
                </main>
            </div>
        </div>
    )
}

// Remover os layouts específicos e usar apenas o MainLayout com props
export const DashboardLayout = MainLayout
export const TicketsLayout = MainLayout
export const ReportsLayout = MainLayout
export const SettingsLayout = MainLayout
export const SimpleLayout = MainLayout 