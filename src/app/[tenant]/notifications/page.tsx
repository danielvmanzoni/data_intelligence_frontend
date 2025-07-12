'use client'

import { MainLayout } from '@/components/layout/MainLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

export default function NotificationsPage() {
    return (
        <MainLayout title="Notificações" showFilters={false}>
            <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Não Lidas</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">3</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Hoje</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">5</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Esta Semana</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">12</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Total</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">48</p>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Todas as Notificações</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-2 hover:bg-accent rounded-lg">
                                <div className="flex items-center space-x-4">
                                    <div className="h-2 w-2 bg-primary rounded-full" />
                                    <div>
                                        <p className="font-medium">Novo chamado criado</p>
                                        <p className="text-sm text-muted-foreground">
                                            Chamado #001 foi criado na franquia Lacoste Shopping
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-1">2 minutos atrás</p>
                                    </div>
                                </div>
                                <Badge>Novo</Badge>
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between p-2 hover:bg-accent rounded-lg">
                                <div className="flex items-center space-x-4">
                                    <div className="h-2 w-2 bg-primary rounded-full" />
                                    <div>
                                        <p className="font-medium">Chamado resolvido</p>
                                        <p className="text-sm text-muted-foreground">
                                            Chamado #002 foi resolvido com sucesso
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-1">1 hora atrás</p>
                                    </div>
                                </div>
                                <Badge>Novo</Badge>
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between p-2 hover:bg-accent rounded-lg">
                                <div className="flex items-center space-x-4">
                                    <div className="h-2 w-2 bg-muted rounded-full" />
                                    <div>
                                        <p className="font-medium">Nova franquia adicionada</p>
                                        <p className="text-sm text-muted-foreground">
                                            Franquia Nike Centro foi adicionada ao sistema
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-1">3 horas atrás</p>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between p-2 hover:bg-accent rounded-lg">
                                <div className="flex items-center space-x-4">
                                    <div className="h-2 w-2 bg-muted rounded-full" />
                                    <div>
                                        <p className="font-medium">Atualização do sistema</p>
                                        <p className="text-sm text-muted-foreground">
                                            Nova versão do sistema está disponível
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-1">1 dia atrás</p>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between p-2 hover:bg-accent rounded-lg">
                                <div className="flex items-center space-x-4">
                                    <div className="h-2 w-2 bg-muted rounded-full" />
                                    <div>
                                        <p className="font-medium">Manutenção programada</p>
                                        <p className="text-sm text-muted-foreground">
                                            Sistema ficará indisponível para manutenção no próximo domingo
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-1">2 dias atrás</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    )
} 