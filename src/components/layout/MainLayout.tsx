'use client'

import { useState } from 'react'
import { useAuthExtended } from '@/contexts/AuthContext'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { cn } from '@/lib/utils'

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
    const { isLoading } = useAuthExtended()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        )
    }

    return (
        <div className="flex h-screen bg-background">
            {/* Sidebar Desktop */}
            <div className="hidden lg:flex lg:flex-shrink-0">
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
            <div className="flex flex-col flex-1 overflow-hidden">
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

// Layout específico para páginas de dashboard
export function DashboardLayout({
    children,
    title = 'Dashboard',
    ...props
}: MainLayoutProps) {
    return (
        <MainLayout
            title={title}
            showFilters={true}
            showSearch={true}
            showNotifications={true}
            {...props}
        >
            {children}
        </MainLayout>
    )
}

// Layout específico para páginas de tickets
export function TicketsLayout({
    children,
    title = 'Chamados',
    ...props
}: MainLayoutProps) {
    return (
        <MainLayout
            title={title}
            showFilters={true}
            showSearch={true}
            showNotifications={true}
            {...props}
        >
            {children}
        </MainLayout>
    )
}

// Layout específico para páginas de relatórios
export function ReportsLayout({
    children,
    title = 'Relatórios',
    ...props
}: MainLayoutProps) {
    return (
        <MainLayout
            title={title}
            showFilters={true}
            showSearch={false}
            showNotifications={true}
            {...props}
        >
            {children}
        </MainLayout>
    )
}

// Layout específico para páginas de configurações
export function SettingsLayout({
    children,
    title = 'Configurações',
    ...props
}: MainLayoutProps) {
    return (
        <MainLayout
            title={title}
            showFilters={false}
            showSearch={false}
            showNotifications={true}
            {...props}
        >
            {children}
        </MainLayout>
    )
}

// Layout específico para páginas simples
export function SimpleLayout({
    children,
    title,
    ...props
}: MainLayoutProps) {
    return (
        <MainLayout
            title={title}
            showFilters={false}
            showSearch={false}
            showNotifications={true}
            {...props}
        >
            {children}
        </MainLayout>
    )
} 