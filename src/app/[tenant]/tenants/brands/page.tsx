'use client'

import { MainLayout } from '@/components/layout/MainLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function BrandsPage() {
    return (
        <MainLayout title="Marcas">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Total de Marcas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">12</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Franquias Ativas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">36</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Segmentos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">6</p>
                    </CardContent>
                </Card>
            </div>

            <div className="mt-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Lista de Marcas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <div className="p-4">
                                <p className="text-sm text-muted-foreground">
                                    Carregando lista de marcas...
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    )
} 