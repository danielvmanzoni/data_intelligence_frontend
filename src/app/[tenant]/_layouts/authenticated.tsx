'use client'

import { MainLayout } from "@/components/layout/MainLayout"
import { useAuth } from "@/contexts/AuthContext"
import { Loading } from "@/components/ui/loading"
import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'

interface AuthenticatedLayoutProps {
    children: React.ReactNode
}

export default function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
    const { isAuthenticated, isLoading } = useAuth()
    const router = useRouter()
    const pathname = usePathname()

    // Efeito para redirecionar para login se não estiver autenticado
    useEffect(() => {
        if (!isLoading && !isAuthenticated && pathname) {
            const tenantPath = pathname.split('/')[1]
            router.replace(`/${tenantPath}/login`)
        }
    }, [isLoading, isAuthenticated, router, pathname])

    // Se estiver carregando, mostrar loading
    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Loading />
            </div>
        )
    }

    // Se não estiver autenticado, mostrar loading enquanto redireciona
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <Loading />
                    <p className="text-muted-foreground mt-4">Redirecionando para login...</p>
                </div>
            </div>
        )
    }

    // Layout autenticado normal
    return (
        <MainLayout>
            {children}
        </MainLayout>
    )
} 