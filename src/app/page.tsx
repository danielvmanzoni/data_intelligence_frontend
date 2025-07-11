'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthExtended } from '@/contexts/AuthContext'
import { LoadingScreen } from '@/components/ui/loading'

export default function Home() {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuthExtended()

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.push('/dashboard')
      } else {
        router.push('/login')
      }
    }
  }, [isAuthenticated, isLoading, router])

  return <LoadingScreen text="Carregando..." />
}
