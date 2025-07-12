import { AuthProvider } from '@/contexts/AuthContext'

interface TenantLayoutProps {
    children: React.ReactNode
    params: { tenant: string }
}

export default function TenantLayout({ children, params }: TenantLayoutProps) {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    )
} 