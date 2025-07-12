'use client'

import { MainLayout } from '@/components/layout/MainLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function FranchisesPage() {
    return (
        <MainLayout title="Franquias">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Total de Franquias</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">8</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Chamados Abertos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">12</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Usuários Ativos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">24</p>
                    </CardContent>
                </Card>
            </div>

            <div className="mt-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Lista de Franquias</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <div className="p-4 space-y-2">
                                <div className="flex items-center justify-between p-2 hover:bg-accent rounded-lg">
                                    <div>
                                        <p className="font-medium">Shopping Morumbi</p>
                                        <p className="text-sm text-muted-foreground">São Paulo, SP</p>
                                    </div>
                                    <span className="text-muted-foreground">3 chamados</span>
                                </div>
                                <div className="flex items-center justify-between p-2 hover:bg-accent rounded-lg">
                                    <div>
                                        <p className="font-medium">Shopping Iguatemi</p>
                                        <p className="text-sm text-muted-foreground">São Paulo, SP</p>
                                    </div>
                                    <span className="text-muted-foreground">2 chamados</span>
                                </div>
                                <div className="flex items-center justify-between p-2 hover:bg-accent rounded-lg">
                                    <div>
                                        <p className="font-medium">Shopping Eldorado</p>
                                        <p className="text-sm text-muted-foreground">São Paulo, SP</p>
                                    </div>
                                    <span className="text-muted-foreground">4 chamados</span>
                                </div>
                                <div className="flex items-center justify-between p-2 hover:bg-accent rounded-lg">
                                    <div>
                                        <p className="font-medium">Shopping Ibirapuera</p>
                                        <p className="text-sm text-muted-foreground">São Paulo, SP</p>
                                    </div>
                                    <span className="text-muted-foreground">1 chamado</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    )
} 