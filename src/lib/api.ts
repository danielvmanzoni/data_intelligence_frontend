import {
  ApiResponse,
  PaginatedResponse,
  LoginRequest,
  LoginResponse,
  Tenant,
  User,
  Ticket,
  Category,
  TicketComment,
  TicketActivity,
  TicketEvaluation,
  TicketFilters,
  TenantFilters,
  TicketStats,
  TenantStats,
  DashboardData,
  ReportData,
  ReportFilters,
  CreateTicketRequest,
  UpdateTicketRequest,
  CreateTenantRequest,
  UpdateTenantRequest,
  CreateUserRequest,
  UpdateUserRequest,
  CreateCategoryRequest,
  UpdateCategoryRequest,
  Notification,
} from "@/types/api";

// Configuração da API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3010";

// Classe para gerenciar o token de autenticação
class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
    this.loadToken();
  }

  private loadToken(): void {
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("auth_token");
    }
  }

  public setToken(token: string | null): void {
    this.token = token;
    if (typeof window !== "undefined") {
      if (token) {
        localStorage.setItem("auth_token", token);
      } else {
        localStorage.removeItem("auth_token");
      }
    }
  }

  public getToken(): string | null {
    return this.token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (this.token) {
      (headers as Record<string, string>)[
        "Authorization"
      ] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      const data = await response.json();

      // A nova API retorna dados diretamente, não em uma estrutura { success, data, error }
      // Vamos adaptar para manter compatibilidade
      if (data && typeof data === "object" && !("success" in data)) {
        return {
          success: true,
          data: data as T,
        };
      }

      return data;
    } catch (error) {
      console.error("API Request Error:", error);
      throw error;
    }
  }

  // Métodos HTTP
  public async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "GET" });
  }

  public async post<T>(
    endpoint: string,
    data?: unknown
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  public async put<T>(
    endpoint: string,
    data?: unknown
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  public async patch<T>(
    endpoint: string,
    data?: unknown
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  public async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "DELETE" });
  }
}

// Instância global do cliente API
const apiClient = new ApiClient();

// Tipo para resposta da API de login
interface ApiLoginResponse {
  access_token: string;
  user: User;
}

// Serviços de Autenticação
export const authService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      console.log("🔄 Fazendo login com:", {
        email: credentials.email,
        tenant: credentials.tenant,
      });

      // Validar se o tenant foi fornecido
      if (!credentials.tenant) {
        throw new Error("Tenant é obrigatório para o login");
      }

      // Usar o endpoint específico do tenant
      const response = await apiClient.post<ApiLoginResponse>(
        `/${credentials.tenant}/auth/login`,
        {
          email: credentials.email,
          password: credentials.password,
        }
      );

      console.log("📡 Resposta da API:", response);

      // A API retorna diretamente o objeto com access_token e user
      if (response.success && response.data) {
        const data = response.data;

        // Verificar se a resposta tem a estrutura esperada
        if ("access_token" in data && "user" in data) {
          console.log(
            "✅ Login bem-sucedido - token:",
            data.access_token.slice(0, 20) + "..."
          );

          // Armazenar o token
          apiClient.setToken(data.access_token);

          // Retornar no formato esperado pelo frontend
          return {
            token: data.access_token,
            user: data.user,
            tenant: data.user.tenant || null,
          };
        }
      }

      throw new Error("Resposta da API inválida");
    } catch (error) {
      console.error("❌ Erro no login:", error);
      throw error;
    }
  },

  async logout(): Promise<void> {
    apiClient.setToken(null);
  },

  async getCurrentUser(): Promise<User> {
    // Endpoint não existe na API atual
    throw new Error("Endpoint getCurrentUser não implementado");
  },

  async refreshToken(): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>("/auth/refresh");
    if (response.success && response.data) {
      apiClient.setToken(response.data.token);
      return response.data;
    }
    throw new Error("Falha ao atualizar token");
  },

  getToken(): string | null {
    return apiClient.getToken();
  },
};

// Serviços de Tenants
export const tenantService = {
  async getAll(filters?: TenantFilters): Promise<PaginatedResponse<Tenant>> {
    const queryParams = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          if (Array.isArray(value)) {
            value.forEach((v) => queryParams.append(key, v.toString()));
          } else {
            queryParams.append(key, value.toString());
          }
        }
      });
    }

    const response = await apiClient.get<PaginatedResponse<Tenant>>(
      `/tenants?${queryParams.toString()}`
    );
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || "Erro ao obter tenants");
  },

  async getById(id: string): Promise<Tenant> {
    const response = await apiClient.get<Tenant>(`/tenants/${id}`);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || "Erro ao obter tenant");
  },

  async getByCnpj(cnpj: string): Promise<Tenant> {
    const response = await apiClient.get<Tenant>(`/tenants/cnpj/${cnpj}`);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || "Erro ao obter tenant por CNPJ");
  },

  async getBrands(): Promise<string[]> {
    const response = await apiClient.get<string[]>("/tenants/brands");
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || "Erro ao obter marcas");
  },

  async getSegments(): Promise<string[]> {
    const response = await apiClient.get<string[]>("/tenants/segments");
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || "Erro ao obter segmentos");
  },

  async getByBrand(brand: string): Promise<Tenant[]> {
    const response = await apiClient.get<Tenant[]>(
      `/tenants/by-brand/${brand}`
    );
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || "Erro ao obter tenants por marca");
  },

  async getFranchises(franchisorId: string): Promise<Tenant[]> {
    const response = await apiClient.get<Tenant[]>(
      `/tenants/franchises/${franchisorId}`
    );
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || "Erro ao obter franquias do franqueador");
  },

  async getAccessibleTenants(): Promise<Tenant[]> {
    const response = await apiClient.get<Tenant[]>("/auth/accessible-tenants");
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || "Erro ao obter tenants acessíveis");
  },

  async create(data: CreateTenantRequest): Promise<Tenant> {
    const response = await apiClient.post<Tenant>("/tenants", data);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || "Erro ao criar tenant");
  },

  async update(id: string, data: UpdateTenantRequest): Promise<Tenant> {
    const response = await apiClient.put<Tenant>(`/tenants/${id}`, data);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || "Erro ao atualizar tenant");
  },

  async delete(id: string): Promise<void> {
    const response = await apiClient.delete(`/tenants/${id}`);
    if (!response.success) {
      throw new Error(response.error || "Erro ao deletar tenant");
    }
  },

  async getStats(): Promise<TenantStats> {
    const response = await apiClient.get<TenantStats>("/tenants/stats");
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || "Erro ao obter estatísticas de tenants");
  },
};

// Serviços de Tickets
export const ticketService = {
  async getAll(filters?: TicketFilters): Promise<PaginatedResponse<Ticket>> {
    const queryParams = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          if (Array.isArray(value)) {
            value.forEach((v) => queryParams.append(key, v.toString()));
          } else {
            queryParams.append(key, value.toString());
          }
        }
      });
    }

    const response = await apiClient.get<PaginatedResponse<Ticket>>(
      `/tickets?${queryParams.toString()}`
    );
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || "Erro ao obter tickets");
  },

  async getById(id: string): Promise<Ticket> {
    const response = await apiClient.get<Ticket>(`/tickets/${id}`);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || "Erro ao obter ticket");
  },

  async getByNumber(number: string): Promise<Ticket> {
    const response = await apiClient.get<Ticket>(`/tickets/number/${number}`);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || "Erro ao obter ticket por número");
  },

  async getByBrand(
    brand: string,
    filters?: TicketFilters
  ): Promise<PaginatedResponse<Ticket>> {
    const queryParams = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          if (Array.isArray(value)) {
            value.forEach((v) => queryParams.append(key, v.toString()));
          } else {
            queryParams.append(key, value.toString());
          }
        }
      });
    }

    const response = await apiClient.get<PaginatedResponse<Ticket>>(
      `/tickets/by-brand/${brand}?${queryParams.toString()}`
    );
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || "Erro ao obter tickets por marca");
  },

  async create(data: CreateTicketRequest): Promise<Ticket> {
    const response = await apiClient.post<Ticket>("/tickets", data);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || "Erro ao criar ticket");
  },

  async update(id: string, data: UpdateTicketRequest): Promise<Ticket> {
    const response = await apiClient.put<Ticket>(`/tickets/${id}`, data);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || "Erro ao atualizar ticket");
  },

  async delete(id: string): Promise<void> {
    const response = await apiClient.delete(`/tickets/${id}`);
    if (!response.success) {
      throw new Error(response.error || "Erro ao deletar ticket");
    }
  },

  async getStats(filters?: TicketFilters): Promise<TicketStats> {
    const queryParams = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          if (Array.isArray(value)) {
            value.forEach((v) => queryParams.append(key, v.toString()));
          } else {
            queryParams.append(key, value.toString());
          }
        }
      });
    }

    const response = await apiClient.get<TicketStats>(
      `/tickets/stats?${queryParams.toString()}`
    );
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || "Erro ao obter estatísticas de tickets");
  },

  async getStatsByBrand(
    brand: string,
    filters?: TicketFilters
  ): Promise<TicketStats> {
    const queryParams = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          if (Array.isArray(value)) {
            value.forEach((v) => queryParams.append(key, v.toString()));
          } else {
            queryParams.append(key, value.toString());
          }
        }
      });
    }

    const response = await apiClient.get<TicketStats>(
      `/tickets/stats/by-brand/${brand}?${queryParams.toString()}`
    );
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || "Erro ao obter estatísticas por marca");
  },
};

// Serviços de Comentários
export const commentService = {
  async getByTicket(ticketId: string): Promise<TicketComment[]> {
    const response = await apiClient.get<TicketComment[]>(
      `/tickets/${ticketId}/comments`
    );
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || "Erro ao obter comentários");
  },

  async create(
    ticketId: string,
    content: string,
    isInternal: boolean = false
  ): Promise<TicketComment> {
    const response = await apiClient.post<TicketComment>(
      `/tickets/${ticketId}/comments`,
      {
        content,
        isInternal,
      }
    );
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || "Erro ao criar comentário");
  },

  async update(
    ticketId: string,
    commentId: string,
    content: string
  ): Promise<TicketComment> {
    const response = await apiClient.put<TicketComment>(
      `/tickets/${ticketId}/comments/${commentId}`,
      {
        content,
      }
    );
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || "Erro ao atualizar comentário");
  },

  async delete(ticketId: string, commentId: string): Promise<void> {
    const response = await apiClient.delete(
      `/tickets/${ticketId}/comments/${commentId}`
    );
    if (!response.success) {
      throw new Error(response.error || "Erro ao deletar comentário");
    }
  },
};

// Serviços de Atividades
export const activityService = {
  async getByTicket(ticketId: string): Promise<TicketActivity[]> {
    const response = await apiClient.get<TicketActivity[]>(
      `/tickets/${ticketId}/activities`
    );
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || "Erro ao obter atividades");
  },
};

// Serviços de Avaliações
export const evaluationService = {
  async getByTicket(ticketId: string): Promise<TicketEvaluation[]> {
    const response = await apiClient.get<TicketEvaluation[]>(
      `/tickets/${ticketId}/evaluations`
    );
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || "Erro ao obter avaliações");
  },

  async create(
    ticketId: string,
    rating: number,
    comment?: string
  ): Promise<TicketEvaluation> {
    const response = await apiClient.post<TicketEvaluation>(
      `/tickets/${ticketId}/evaluations`,
      {
        rating,
        comment,
      }
    );
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || "Erro ao criar avaliação");
  },
};

// Serviços de Usuários
export const userService = {
  async getAll(): Promise<User[]> {
    const response = await apiClient.get<User[]>("/users");
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || "Erro ao obter usuários");
  },

  async getById(id: string): Promise<User> {
    const response = await apiClient.get<User>(`/users/${id}`);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || "Erro ao obter usuário");
  },

  async create(data: CreateUserRequest): Promise<User> {
    const response = await apiClient.post<User>("/users", data);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || "Erro ao criar usuário");
  },

  async update(id: string, data: UpdateUserRequest): Promise<User> {
    const response = await apiClient.put<User>(`/users/${id}`, data);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || "Erro ao atualizar usuário");
  },

  async delete(id: string): Promise<void> {
    const response = await apiClient.delete(`/users/${id}`);
    if (!response.success) {
      throw new Error(response.error || "Erro ao deletar usuário");
    }
  },
};

// Serviços de Categorias
export const categoryService = {
  async getAll(): Promise<Category[]> {
    const response = await apiClient.get<Category[]>("/categories");
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || "Erro ao obter categorias");
  },

  async getById(id: string): Promise<Category> {
    const response = await apiClient.get<Category>(`/categories/${id}`);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || "Erro ao obter categoria");
  },

  async create(data: CreateCategoryRequest): Promise<Category> {
    const response = await apiClient.post<Category>("/categories", data);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || "Erro ao criar categoria");
  },

  async update(id: string, data: UpdateCategoryRequest): Promise<Category> {
    const response = await apiClient.put<Category>(`/categories/${id}`, data);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || "Erro ao atualizar categoria");
  },

  async delete(id: string): Promise<void> {
    const response = await apiClient.delete(`/categories/${id}`);
    if (!response.success) {
      throw new Error(response.error || "Erro ao deletar categoria");
    }
  },
};

// Serviços de Dashboard
export const dashboardService = {
  async getData(): Promise<DashboardData> {
    const response = await apiClient.get<DashboardData>("/dashboard");
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || "Erro ao obter dados do dashboard");
  },
};

// Serviços de Relatórios
export const reportService = {
  async generate(filters: ReportFilters): Promise<ReportData> {
    const response = await apiClient.post<ReportData>("/reports", filters);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || "Erro ao gerar relatório");
  },

  async export(
    filters: ReportFilters,
    format: "pdf" | "excel" = "pdf"
  ): Promise<Blob> {
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          value.forEach((v) => queryParams.append(key, v.toString()));
        } else {
          queryParams.append(key, value.toString());
        }
      }
    });
    queryParams.append("format", format);

    const response = await fetch(
      `${API_BASE_URL}/reports/export?${queryParams.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${apiClient.getToken()}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao exportar relatório");
    }

    return response.blob();
  },
};

// Serviços de Notificações
export const notificationService = {
  async getAll(): Promise<Notification[]> {
    const response = await apiClient.get<Notification[]>("/notifications");
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || "Erro ao obter notificações");
  },

  async markAsRead(id: string): Promise<void> {
    const response = await apiClient.patch(`/notifications/${id}/read`);
    if (!response.success) {
      throw new Error(response.error || "Erro ao marcar notificação como lida");
    }
  },

  async markAllAsRead(): Promise<void> {
    const response = await apiClient.patch("/notifications/read-all");
    if (!response.success) {
      throw new Error(
        response.error || "Erro ao marcar todas as notificações como lidas"
      );
    }
  },
};

// Exportar cliente para uso avançado
export { apiClient };
