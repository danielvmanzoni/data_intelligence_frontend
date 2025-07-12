'use client'

import { MainLayout } from '@/components/layout/MainLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function SegmentsPage() {
    return (
        <MainLayout title="Segmentos">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Total de Segmentos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">6</p>
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
            </div>

            <div className="mt-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Lista de Segmentos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <div className="p-4 space-y-2">
                                <div className="flex items-center justify-between p-2 hover:bg-accent rounded-lg">
                                    <span>Moda</span>
                                    <span className="text-muted-foreground">4 marcas</span>
                                </div>
                                <div className="flex items-center justify-between p-2 hover:bg-accent rounded-lg">
                                    <span>Alimentação</span>
                                    <span className="text-muted-foreground">3 marcas</span>
                                </div>
                                <div className="flex items-center justify-between p-2 hover:bg-accent rounded-lg">
                                    <span>Farmácia</span>
                                    <span className="text-muted-foreground">2 marcas</span>
                                </div>
                                <div className="flex items-center justify-between p-2 hover:bg-accent rounded-lg">
                                    <span>Tecnologia</span>
                                    <span className="text-muted-foreground">1 marca</span>
                                </div>
                                <div className="flex items-center justify-between p-2 hover:bg-accent rounded-lg">
                                    <span>Beleza</span>
                                    <span className="text-muted-foreground">1 marca</span>
                                </div>
                                <div className="flex items-center justify-between p-2 hover:bg-accent rounded-lg">
                                    <span>Esporte</span>
                                    <span className="text-muted-foreground">1 marca</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    )
} 