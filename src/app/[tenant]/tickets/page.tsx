'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function TicketsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Chamados</h1>
                <p className="text-muted-foreground">Gerencie seus tickets de suporte</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
                        <CardTitle>Em Andamento</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">5</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Resolvidos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">28</p>
                    </CardContent>
                </Card>
            </div>

            <div className="mt-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Lista de Chamados</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <div className="p-4">
                                <p className="text-sm text-muted-foreground">
                                    Nenhum chamado encontrado.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
