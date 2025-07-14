import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

interface LoadingProps {
    className?: string
    size?: 'sm' | 'md' | 'lg'
    text?: string
}

export function Loading() {
    return (
        <div className="flex items-center justify-center min-h-[200px]">
            <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Carregando...</p>
            </div>
        </div>
    )
}

export function LoadingScreen({ text = 'Carregando...' }: { text?: string }) {
    return (
        <div className="flex h-screen items-center justify-center bg-background">
            <Loading size="lg" text={text} />
        </div>
    )
}

export function LoadingButton({
    children,
    isLoading = false,
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { isLoading?: boolean }) {
    return (
        <button
            {...props}
            disabled={isLoading || props.disabled}
            className={cn(
                'flex items-center justify-center space-x-2',
                props.className
            )}
        >
            {isLoading ? (
                <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Carregando...</span>
                </>
            ) : (
                children
            )}
        </button>
    )
} 