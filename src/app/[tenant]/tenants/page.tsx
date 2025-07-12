'use client'

import { MainLayout } from '@/components/layout/MainLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function TenantsPage() {
    return (
        <MainLayout title="Tenants">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Total de Tenants</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">48</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Marcas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">12</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Franquias</CardTitle>
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
                        <CardTitle>Lista de Tenants</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <div className="p-4">
                                <p className="text-sm text-muted-foreground">
                                    Carregando lista de tenants...
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    )
} 