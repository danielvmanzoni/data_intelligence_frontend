import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useToast } from "./useToast";
import { useTenant } from "./useTenant";

interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  isActive: boolean;
  slaHours: number;
  createdAt: string;
  updatedAt: string;
  tenantId: string;
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const tenant = useTenant();

  const fetchCategories = useCallback(async () => {
    if (!tenant) {
      setError("Tenant não identificado");
      setCategories([]);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      console.log("Buscando categorias para o tenant:", tenant);
      const response = await api.get<Category[]>(
        `/${tenant.slug}/ticket-category`
      );
      console.log("Categorias recebidas:", response.data);

      // Filtra categorias pelo tenantId além de isActive
      const validCategories = response.data.filter(
        (category) => category.isActive && category.tenantId === tenant.id
      );
      console.log("Categorias válidas para o tenant:", validCategories);

      setCategories(validCategories || []);
      setError(null);
    } catch (err) {
      console.error("Erro ao buscar categorias:", err);
      setError("Não foi possível carregar as categorias");
      setCategories([]);
      toast({
        title: "Erro",
        description: "Não foi possível carregar as categorias",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [tenant]); // Mantendo apenas tenant nas dependências

  useEffect(() => {
    if (tenant) {
      fetchCategories();
    }
  }, [tenant, fetchCategories]);

  return {
    categories,
    isLoading,
    error,
    refetch: fetchCategories,
  };
}
