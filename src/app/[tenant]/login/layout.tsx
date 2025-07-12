import type { Metadata } from "next";

interface LoginLayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: "Login",
    description: "Página de login do sistema",
};

export default function LoginLayout({ children }: LoginLayoutProps) {
    return (
        <div className="min-h-screen bg-background">
            {children}
        </div>
    );
} 