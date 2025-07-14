import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Ticket, TicketsResponse } from "@/types/api";
import { useToast } from "./useToast";
import { useTenant } from "./useTenant";

export function useTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const { toast } = useToast();
  const tenant = useTenant();

  const fetchTickets = useCallback(async () => {
    if (!tenant) {
      setError("Tenant não identificado");
      setTickets([]);
      setIsLoading(false);
      return;
    }

    // Se a última atualização foi há menos de 1 segundo, não atualiza
    if (lastUpdate && new Date().getTime() - lastUpdate.getTime() < 1000) {
      return;
    }

    try {
      setIsLoading(true);
      console.log("Buscando tickets para o tenant:", tenant);
      const response = await api.get<TicketsResponse>(
        `/${tenant.slug}/tickets`
      );

      if (Array.isArray(response.data)) {
        console.log("Contagem de tickets por status:", {
          total: response.data.length,
          open: response.data.filter((t) => t.status === "OPEN").length,
          inProgress: response.data.filter((t) => t.status === "IN_PROGRESS")
            .length,
          resolved: response.data.filter((t) => t.status === "RESOLVED").length,
          closed: response.data.filter((t) => t.status === "CLOSED").length,
        });
        setTickets(response.data);
        setLastUpdate(new Date());
      } else {
        console.warn("Resposta inesperada da API:", response.data);
        setTickets([]);
      }
      setError(null);
    } catch (err) {
      console.error("Erro ao buscar tickets:", err);
      setError("Não foi possível carregar os tickets");
      setTickets([]);
      toast({
        title: "Erro",
        description: "Não foi possível carregar a lista de tickets",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [tenant, toast, lastUpdate]);

  // Carregar tickets na montagem do componente
  useEffect(() => {
    if (tenant) {
      console.log("Iniciando carga inicial de dados para o tenant:", tenant);
      fetchTickets();
    }
  }, [tenant, fetchTickets]);

  return {
    tickets,
    isLoading,
    error,
    refetch: fetchTickets,
  };
}
