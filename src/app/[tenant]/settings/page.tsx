'use client'

import { MainLayout } from '@/components/layout/MainLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/contexts/AuthContext'

export default function SettingsPage() {
    const { getAccessLevel } = useAuth()
    const accessLevel = getAccessLevel()

    return (
        <MainLayout>
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Configurações do Perfil</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-sm font-medium">Notificações por Email</h3>
                                <p className="text-sm text-muted-foreground">
                                    Receba atualizações sobre chamados e atividades importantes
                                </p>
                            </div>
                            <Separator />
                            <div>
                                <h3 className="text-sm font-medium">Notificações no Sistema</h3>
                                <p className="text-sm text-muted-foreground">
                                    Configure as notificações que aparecem no painel
                                </p>
                            </div>
                            <Separator />
                            <div>
                                <h3 className="text-sm font-medium">Idioma</h3>
                                <p className="text-sm text-muted-foreground">
                                    Escolha o idioma de exibição do sistema
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {accessLevel === 'CROWN' && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Configurações do Sistema</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-sm font-medium">Integrações</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Gerencie integrações com outros sistemas
                                    </p>
                                </div>
                                <Separator />
                                <div>
                                    <h3 className="text-sm font-medium">Backup</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Configure backups automáticos do sistema
                                    </p>
                                </div>
                                <Separator />
                                <div>
                                    <h3 className="text-sm font-medium">Logs do Sistema</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Visualize e exporte logs do sistema
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {['CROWN', 'FRANCHISOR'].includes(accessLevel) && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Configurações da Marca</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-sm font-medium">Personalização</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Personalize a aparência do sistema para sua marca
                                    </p>
                                </div>
                                <Separator />
                                <div>
                                    <h3 className="text-sm font-medium">Categorias de Chamados</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Gerencie as categorias de chamados disponíveis
                                    </p>
                                </div>
                                <Separator />
                                <div>
                                    <h3 className="text-sm font-medium">Regras de Negócio</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Configure regras específicas para sua marca
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {accessLevel === 'FRANCHISE' && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Configurações da Loja</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-sm font-medium">Horário de Funcionamento</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Configure os horários de atendimento da loja
                                    </p>
                                </div>
                                <Separator />
                                <div>
                                    <h3 className="text-sm font-medium">Contatos</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Atualize os contatos principais da loja
                                    </p>
                                </div>
                                <Separator />
                                <div>
                                    <h3 className="text-sm font-medium">Notificações da Loja</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Configure notificações específicas da loja
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </MainLayout>
    )
} 