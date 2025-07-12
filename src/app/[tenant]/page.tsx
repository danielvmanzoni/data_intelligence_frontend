'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Loader2 } from 'lucide-react'

interface TenantPageProps {
    params: Promise<{ tenant: string }>
}

export default function TenantPage({ params }: TenantPageProps) {
    const router = useRouter()
    const { isAuthenticated, isLoading } = useAuth()

    useEffect(() => {
        const handleRedirect = async () => {
            const { tenant } = await params

            if (!isLoading) {
                if (isAuthenticated) {
                    router.replace(`/${tenant}/dashboard`)
                } else {
                    router.replace(`/${tenant}/login`)
                }
            }
        }

        handleRedirect()
    }, [isAuthenticated, isLoading, router, params])

    return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground">Carregando...</p>
            </div>
        </div>
    )
} 