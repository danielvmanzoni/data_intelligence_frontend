'use client'

import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loading } from "@/components/ui/loading";

interface AuthenticatedRouteProps {
    children: React.ReactNode;
    tenant: string;
}

export function AuthenticatedRoute({ children, tenant }: AuthenticatedRouteProps) {
    const pathname = usePathname();
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    const isPublicRoute = pathname === `/${tenant}` || pathname === `/${tenant}/login`;

    useEffect(() => {
        // Só redirecionar se não estiver em rota pública e não estiver carregando
        if (!isLoading && !isAuthenticated && !isPublicRoute) {
            router.replace(`/${tenant}/login`);
        }
    }, [isLoading, isAuthenticated, isPublicRoute, tenant, router]);

    // Para rotas públicas, sempre renderizar
    if (isPublicRoute) {
        return <>{children}</>;
    }

    // Mostrar loading enquanto verifica autenticação
    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Loading />
            </div>
        );
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
        );
    }

    return <>{children}</>;
} 