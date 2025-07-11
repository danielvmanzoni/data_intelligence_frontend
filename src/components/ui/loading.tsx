import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

interface LoadingProps {
    className?: string
    size?: 'sm' | 'md' | 'lg'
    text?: string
}

export function Loading({ className, size = 'md', text }: LoadingProps) {
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-6 w-6',
        lg: 'h-8 w-8',
    }

    return (
        <div className={cn('flex items-center justify-center space-x-2', className)}>
            <Loader2 className={cn('animate-spin', sizeClasses[size])} />
            {text && <span className="text-sm text-muted-foreground">{text}</span>}
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