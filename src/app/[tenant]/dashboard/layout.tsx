'use client'

import AuthenticatedLayout from "../_layouts/authenticated"

interface DashboardLayoutProps {
    children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <AuthenticatedLayout>
            {children}
        </AuthenticatedLayout>
    )
} 