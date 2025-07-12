'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export default function HelpPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Ajuda</h1>
                <p className="text-muted-foreground">Central de ajuda e suporte</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Guia Rápido</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-sm font-medium">Como criar um chamado?</h3>
                            <p className="text-sm text-muted-foreground">
                                Aprenda a criar e gerenciar chamados no sistema
                            </p>
                        </div>
                        <Separator />
                        <div>
                            <h3 className="text-sm font-medium">Gerenciando Usuários</h3>
                            <p className="text-sm text-muted-foreground">
                                Saiba como adicionar e gerenciar usuários
                            </p>
                        </div>
                        <Separator />
                        <div>
                            <h3 className="text-sm font-medium">Relatórios</h3>
                            <p className="text-sm text-muted-foreground">
                                Como gerar e interpretar relatórios
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Perguntas Frequentes</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-sm font-medium">Como redefinir minha senha?</h3>
                            <p className="text-sm text-muted-foreground">
                                Siga os passos para redefinir sua senha de acesso
                            </p>
                        </div>
                        <Separator />
                        <div>
                            <h3 className="text-sm font-medium">Problemas de acesso?</h3>
                            <p className="text-sm text-muted-foreground">
                                Soluções para problemas comuns de acesso
                            </p>
                        </div>
                        <Separator />
                        <div>
                            <h3 className="text-sm font-medium">Notificações</h3>
                            <p className="text-sm text-muted-foreground">
                                Como configurar suas notificações
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Suporte</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-sm font-medium">Contato</h3>
                            <p className="text-sm text-muted-foreground">
                                Entre em contato com nossa equipe de suporte
                            </p>
                            <p className="text-sm mt-2">
                                Email: suporte@empresa.com<br />
                                Telefone: (11) 1234-5678<br />
                                Horário: Segunda a Sexta, 9h às 18h
                            </p>
                        </div>
                        <Separator />
                        <div>
                            <h3 className="text-sm font-medium">Base de Conhecimento</h3>
                            <p className="text-sm text-muted-foreground">
                                Acesse nossa documentação completa
                            </p>
                        </div>
                        <Separator />
                        <div>
                            <h3 className="text-sm font-medium">Feedback</h3>
                            <p className="text-sm text-muted-foreground">
                                Ajude-nos a melhorar nosso sistema
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
} 