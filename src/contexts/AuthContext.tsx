'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User, Tenant, LoginRequest, AuthContext as AuthContextType } from '@/types/api'
import { authService } from '@/lib/api'

interface AuthProviderProps {
    children: ReactNode
}

// Contexto de autenticação
const AuthContext = createContext<AuthContextType | null>(null)

// Hook para usar o contexto de autenticação
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider')
    }
    return context
}

// Provider de autenticação
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [tenant, setTenant] = useState<Tenant | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const isAuthenticated = !!user && !!token

    // Carregar dados do usuário autenticado ao inicializar
    useEffect(() => {
        const loadUser = async () => {
            try {
                const storedToken = authService.getToken()
                if (storedToken) {
                    setToken(storedToken)
                    const currentUser = await authService.getCurrentUser()
                    setUser(currentUser)
                    setTenant(currentUser.tenant || null)
                }
            } catch (error) {
                console.error('Erro ao carregar usuário:', error)
                // Token inválido, fazer logout
                logout()
            } finally {
                setIsLoading(false)
            }
        }

        loadUser()
    }, [])

    // Função de login
    const login = async (credentials: LoginRequest): Promise<void> => {
        try {
            setIsLoading(true)
            const response = await authService.login(credentials)

            setToken(response.token)
            setUser(response.user)
            setTenant(response.tenant)
        } catch (error) {
            console.error('Erro no login:', error)
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    // Função de logout
    const logout = (): void => {
        setUser(null)
        setTenant(null)
        setToken(null)
        authService.logout()
    }

    // Função para atualizar dados do usuário
    const updateUser = (updatedUser: User): void => {
        setUser(updatedUser)
        if (updatedUser.tenant) {
            setTenant(updatedUser.tenant)
        }
    }

    // Função para verificar se o usuário tem uma role específica
    const hasRole = (role: string): boolean => {
        return user?.role === role
    }

    // Função para verificar se o usuário tem acesso a um tenant específico
    const hasAccessToTenant = (tenantId: string): boolean => {
        if (!user || !tenant) return false

        // Crown Admin tem acesso a tudo
        if (user.role === 'CROWN_ADMIN') return true

        // Franchisor Admin tem acesso ao seu tenant e suas franquias
        if (user.role === 'FRANCHISOR_ADMIN') {
            if (tenant.id === tenantId) return true
            if (tenant.childTenants?.some(child => child.id === tenantId)) return true
        }

        // Outros usuários só têm acesso ao seu próprio tenant
        return tenant.id === tenantId
    }

    // Função para verificar se o usuário tem acesso a uma marca específica
    const hasAccessToBrand = (brand: string): boolean => {
        if (!user || !tenant) return false

        // Crown Admin tem acesso a tudo
        if (user.role === 'CROWN_ADMIN') return true

        // Outros usuários só têm acesso à sua própria marca
        return tenant.brand === brand
    }

    // Função para verificar se o usuário tem acesso a um segmento específico
    const hasAccessToSegment = (segment: string): boolean => {
        if (!user || !tenant) return false

        // Crown Admin tem acesso a tudo
        if (user.role === 'CROWN_ADMIN') return true

        // Outros usuários só têm acesso ao seu próprio segmento
        return tenant.segment === segment
    }

    // Função para verificar se o usuário pode criar/editar tenants
    const canManageTenants = (): boolean => {
        if (!user) return false

        return ['CROWN_ADMIN', 'FRANCHISOR_ADMIN'].includes(user.role)
    }

    // Função para verificar se o usuário pode criar/editar usuários
    const canManageUsers = (): boolean => {
        if (!user) return false

        return ['CROWN_ADMIN', 'FRANCHISOR_ADMIN', 'FRANCHISE_ADMIN'].includes(user.role)
    }

    // Função para verificar se o usuário pode gerenciar tickets
    const canManageTickets = (): boolean => {
        if (!user) return false

        return ['CROWN_ADMIN', 'FRANCHISOR_ADMIN', 'FRANCHISE_ADMIN', 'AGENT'].includes(user.role)
    }

    // Função para verificar se o usuário pode ver relatórios
    const canViewReports = (): boolean => {
        if (!user) return false

        return ['CROWN_ADMIN', 'FRANCHISOR_ADMIN', 'FRANCHISE_ADMIN'].includes(user.role)
    }

    // Função para obter o nível de acesso do usuário
    const getAccessLevel = (): 'CROWN' | 'FRANCHISOR' | 'FRANCHISE' | 'USER' => {
        if (!user) return 'USER'

        if (user.role === 'CROWN_ADMIN') return 'CROWN'
        if (user.role === 'FRANCHISOR_ADMIN') return 'FRANCHISOR'
        if (user.role === 'FRANCHISE_ADMIN') return 'FRANCHISE'

        return 'USER'
    }

    // Função para obter o nome da marca/empresa
    const getBrandName = (): string => {
        if (!tenant) return ''

        if (tenant.type === 'CROWN') return 'Crown Company'
        if (tenant.brand) return tenant.brand

        return tenant.name
    }

    // Função para obter o tipo de tenant em português
    const getTenantTypeLabel = (): string => {
        if (!tenant) return ''

        switch (tenant.type) {
            case 'CROWN':
                return 'Crown Company'
            case 'FRANCHISOR':
                return 'Franqueador'
            case 'FRANCHISE':
                return 'Franquia'
            default:
                return tenant.type
        }
    }

    // Função para obter o segmento em português
    const getSegmentLabel = (): string => {
        if (!tenant) return ''

        switch (tenant.segment) {
            case 'MODA':
                return 'Moda'
            case 'FOOD':
                return 'Alimentação'
            case 'FARMA':
                return 'Farmácia'
            case 'TECH':
                return 'Tecnologia'
            case 'BEAUTY':
                return 'Beleza'
            case 'SPORT':
                return 'Esporte'
            case 'OTHER':
                return 'Outros'
            default:
                return tenant.segment
        }
    }

    const value: AuthContextType = {
        user,
        tenant,
        token,
        isAuthenticated,
        login,
        logout,
        // Funções adicionais não estão no tipo base, então vou criar um tipo estendido
    }

    // Adicionar funções extras ao contexto
    const extendedValue = {
        ...value,
        isLoading,
        updateUser,
        hasRole,
        hasAccessToTenant,
        hasAccessToBrand,
        hasAccessToSegment,
        canManageTenants,
        canManageUsers,
        canManageTickets,
        canViewReports,
        getAccessLevel,
        getBrandName,
        getTenantTypeLabel,
        getSegmentLabel,
    }

    return (
        <AuthContext.Provider value={extendedValue as unknown as AuthContextType}>
            {children}
        </AuthContext.Provider>
    )
}

// Hook para usar as funções estendidas do contexto
export const useAuthExtended = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuthExtended deve ser usado dentro de um AuthProvider')
    }
    return context as AuthContextType & {
        isLoading: boolean
        updateUser: (user: User) => void
        hasRole: (role: string) => boolean
        hasAccessToTenant: (tenantId: string) => boolean
        hasAccessToBrand: (brand: string) => boolean
        hasAccessToSegment: (segment: string) => boolean
        canManageTenants: () => boolean
        canManageUsers: () => boolean
        canManageTickets: () => boolean
        canViewReports: () => boolean
        getAccessLevel: () => 'CROWN' | 'FRANCHISOR' | 'FRANCHISE' | 'USER'
        getBrandName: () => string
        getTenantTypeLabel: () => string
        getSegmentLabel: () => string
    }
}

export default AuthProvider 