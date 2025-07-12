'use client'

import { MainLayout } from '@/components/layout/MainLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

export default function CategoriesPage() {
    return (
        <MainLayout title="Categorias" showFilters={false}>
            <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Total de Categorias</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">8</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Mais Usada</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">Hardware</p>
                            <p className="text-sm text-muted-foreground">45% dos chamados</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Tempo Médio</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">2.5 dias</p>
                            <p className="text-sm text-muted-foreground">Resolução</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Prioridade Alta</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">3</p>
                            <p className="text-sm text-muted-foreground">Categorias</p>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Lista de Categorias</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-2 hover:bg-accent rounded-lg">
                                <div className="flex items-center space-x-4">
                                    <div>
                                        <p className="font-medium">Hardware</p>
                                        <p className="text-sm text-muted-foreground">
                                            Problemas com equipamentos físicos
                                        </p>
                                    </div>
                                </div>
                                <Badge variant="destructive">Alta</Badge>
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between p-2 hover:bg-accent rounded-lg">
                                <div className="flex items-center space-x-4">
                                    <div>
                                        <p className="font-medium">Software</p>
                                        <p className="text-sm text-muted-foreground">
                                            Problemas com programas e sistemas
                                        </p>
                                    </div>
                                </div>
                                <Badge variant="destructive">Alta</Badge>
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between p-2 hover:bg-accent rounded-lg">
                                <div className="flex items-center space-x-4">
                                    <div>
                                        <p className="font-medium">Rede</p>
                                        <p className="text-sm text-muted-foreground">
                                            Problemas de conectividade
                                        </p>
                                    </div>
                                </div>
                                <Badge variant="destructive">Alta</Badge>
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between p-2 hover:bg-accent rounded-lg">
                                <div className="flex items-center space-x-4">
                                    <div>
                                        <p className="font-medium">Acesso</p>
                                        <p className="text-sm text-muted-foreground">
                                            Problemas com login e permissões
                                        </p>
                                    </div>
                                </div>
                                <Badge>Média</Badge>
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between p-2 hover:bg-accent rounded-lg">
                                <div className="flex items-center space-x-4">
                                    <div>
                                        <p className="font-medium">Impressão</p>
                                        <p className="text-sm text-muted-foreground">
                                            Problemas com impressoras
                                        </p>
                                    </div>
                                </div>
                                <Badge>Média</Badge>
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between p-2 hover:bg-accent rounded-lg">
                                <div className="flex items-center space-x-4">
                                    <div>
                                        <p className="font-medium">Email</p>
                                        <p className="text-sm text-muted-foreground">
                                            Problemas com emails
                                        </p>
                                    </div>
                                </div>
                                <Badge variant="secondary">Baixa</Badge>
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between p-2 hover:bg-accent rounded-lg">
                                <div className="flex items-center space-x-4">
                                    <div>
                                        <p className="font-medium">Treinamento</p>
                                        <p className="text-sm text-muted-foreground">
                                            Solicitações de treinamento
                                        </p>
                                    </div>
                                </div>
                                <Badge variant="secondary">Baixa</Badge>
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between p-2 hover:bg-accent rounded-lg">
                                <div className="flex items-center space-x-4">
                                    <div>
                                        <p className="font-medium">Outros</p>
                                        <p className="text-sm text-muted-foreground">
                                            Demais solicitações
                                        </p>
                                    </div>
                                </div>
                                <Badge variant="secondary">Baixa</Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    )
} 