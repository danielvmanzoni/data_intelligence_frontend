import AuthenticatedLayout from "../_layouts/authenticated"

interface TicketsLayoutProps {
    children: React.ReactNode
}

export default function TicketsLayout({ children }: TicketsLayoutProps) {
    return (
        <AuthenticatedLayout>
            {children}
        </AuthenticatedLayout>
    )
} 