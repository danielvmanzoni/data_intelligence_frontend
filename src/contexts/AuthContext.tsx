'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
    id: number
    name: string
    email: string
    role: string
    tenant: {
        id: number
        name: string
        subdomain: string
        cnpj: string
        brand: string
        segment: string
    }
}

interface AuthContextType {
    user: User | null
    currentTenant: string | null
    token: string | null
    isAuthenticated: boolean
    isLoading: boolean
    login: (tenant: string, email: string, password: string) => Promise<void>
    logout: () => void
    getAccessLevel: () => string
    getBrandName: () => string
    getTenantTypeLabel: () => string
    getSegmentLabel: () => string
    tenant: User['tenant'] | null
}

const AuthContext = createContext<AuthContextType | null>(null)

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider')
    }
    return context
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [currentTenant, setCurrentTenant] = useState<string | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isInitialized, setIsInitialized] = useState(false)

    // Inicializar dados do localStorage apenas uma vez
    useEffect(() => {
        if (isInitialized) return

        const initializeAuth = () => {
            try {
                const savedToken = localStorage.getItem('authToken')
                const savedTenant = localStorage.getItem('currentTenant')
                const savedUser = localStorage.getItem('user')

                if (savedToken && savedTenant && savedUser) {
                    const parsedUser = JSON.parse(savedUser)
                    setToken(savedToken)
                    setCurrentTenant(savedTenant)
                    setUser(parsedUser)
                }
            } catch (error) {
                console.error('Erro ao inicializar autenticação:', error)
                // Limpar dados corrompidos
                localStorage.removeItem('authToken')
                localStorage.removeItem('currentTenant')
                localStorage.removeItem('user')
            } finally {
                setIsLoading(false)
                setIsInitialized(true)
            }
        }

        initializeAuth()
    }, [isInitialized])

    const login = async (tenant: string, email: string, password: string) => {
        try {
            const response = await fetch(`http://localhost:3010/${tenant}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })

            if (!response.ok) {
                throw new Error('Login failed')
            }

            const data = await response.json()

            // Salvar no localStorage
            localStorage.setItem('authToken', data.access_token)
            localStorage.setItem('currentTenant', tenant)
            localStorage.setItem('user', JSON.stringify(data.user))

            // Atualizar estado
            setToken(data.access_token)
            setCurrentTenant(tenant)
            setUser(data.user)

        } catch (error) {
            // Limpar dados em caso de erro
            localStorage.removeItem('authToken')
            localStorage.removeItem('currentTenant')
            localStorage.removeItem('user')

            setToken(null)
            setCurrentTenant(null)
            setUser(null)

            throw error
        }
    }

    const logout = () => {
        localStorage.removeItem('authToken')
        localStorage.removeItem('currentTenant')
        localStorage.removeItem('user')

        setToken(null)
        setCurrentTenant(null)
        setUser(null)
    }

    const getAccessLevel = (): string => {
        if (!user) return 'guest'
        return user.role || 'user'
    }

    const getBrandName = (): string => {
        if (!user?.tenant) return 'Sistema'
        return user.tenant.brand || user.tenant.name
    }

    const getTenantTypeLabel = (): string => {
        if (!user?.tenant) return 'Sistema'
        return user.tenant.segment || 'Geral'
    }

    const getSegmentLabel = (): string => {
        if (!user?.tenant) return 'Sistema'
        return user.tenant.segment || 'Geral'
    }

    const value: AuthContextType = {
        user,
        currentTenant,
        token,
        isAuthenticated: !!token && !!user && isInitialized,
        isLoading,
        login,
        logout,
        getAccessLevel,
        getBrandName,
        getTenantTypeLabel,
        getSegmentLabel,
        tenant: user?.tenant || null
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
} 