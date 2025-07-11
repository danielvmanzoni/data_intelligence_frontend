// Tipos de Tenant
export type TenantType = "CROWN" | "FRANCHISOR" | "FRANCHISE";
export type TenantStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED";
export type SegmentType =
  | "MODA"
  | "FOOD"
  | "FARMA"
  | "TECH"
  | "BEAUTY"
  | "SPORT"
  | "OTHER";

// Tipos de Usuário
export type UserRole =
  | "CROWN_ADMIN"
  | "FRANCHISOR_ADMIN"
  | "FRANCHISE_ADMIN"
  | "AGENT"
  | "USER";
export type UserStatus = "ACTIVE" | "INACTIVE" | "PENDING";

// Tipos de Ticket
export type TicketStatus =
  | "OPEN"
  | "IN_PROGRESS"
  | "RESOLVED"
  | "CLOSED"
  | "CANCELLED";
export type TicketPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";
export type TicketType = "INCIDENT" | "REQUEST" | "PROBLEM" | "CHANGE";

// Interface do Tenant
export interface Tenant {
  id: string;
  name: string;
  cnpj: string;
  subdomain: string;
  type: TenantType;
  status: TenantStatus;
  brand?: string;
  segment: SegmentType;
  parentTenantId?: string;
  settings: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  parentTenant?: Tenant;
  childTenants?: Tenant[];
  users?: User[];
  tickets?: Ticket[];
}

// Interface do Usuário
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  status: UserStatus;
  avatar?: string;
  tenantId: string;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  tenant?: Tenant;
  assignedTickets?: Ticket[];
  createdTickets?: Ticket[];
}

// Interface da Categoria
export interface Category {
  id: string;
  name: string;
  description?: string;
  color: string;
  icon?: string;
  sla?: number;
  isActive: boolean;
  tenantId: string;
  createdAt: string;
  updatedAt: string;
  tenant?: Tenant;
  tickets?: Ticket[];
}

// Interface do Ticket
export interface Ticket {
  id: string;
  number: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  type: TicketType;
  categoryId?: string;
  assigneeId?: string;
  createdById: string;
  tenantId: string;
  guestEmail?: string;
  guestName?: string;
  attachments?: string[];
  tags?: string[];
  dueDate?: string;
  resolvedAt?: string;
  closedAt?: string;
  createdAt: string;
  updatedAt: string;

  // Relacionamentos
  category?: Category;
  assignee?: User;
  createdBy?: User;
  tenant?: Tenant;
  comments?: TicketComment[];
  activities?: TicketActivity[];
  evaluations?: TicketEvaluation[];
}

// Interface do Comentário do Ticket
export interface TicketComment {
  id: string;
  content: string;
  isInternal: boolean;
  ticketId: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;

  // Relacionamentos
  ticket?: Ticket;
  author?: User;
}

// Interface da Atividade do Ticket
export interface TicketActivity {
  id: string;
  action: string;
  description: string;
  metadata?: Record<string, unknown>;
  ticketId: string;
  userId: string;
  createdAt: string;

  // Relacionamentos
  ticket?: Ticket;
  user?: User;
}

// Interface da Avaliação do Ticket
export interface TicketEvaluation {
  id: string;
  rating: number;
  comment?: string;
  ticketId: string;
  evaluatorId?: string;
  evaluatorEmail?: string;
  createdAt: string;

  // Relacionamentos
  ticket?: Ticket;
  evaluator?: User;
}

// Tipos de Resposta da API
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Tipos de Autenticação
export interface LoginRequest {
  cnpj: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
  tenant: Tenant;
}

export interface AuthContext {
  user: User | null;
  tenant: Tenant | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => void;
}

// Tipos de Filtros
export interface TicketFilters {
  status?: TicketStatus[];
  priority?: TicketPriority[];
  type?: TicketType[];
  categoryId?: string[];
  assigneeId?: string[];
  createdById?: string[];
  tenantId?: string[];
  brand?: string[];
  segment?: SegmentType[];
  search?: string;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
}

export interface TenantFilters {
  type?: TenantType[];
  status?: TenantStatus[];
  brand?: string[];
  segment?: SegmentType[];
  search?: string;
  page?: number;
  limit?: number;
}

// Tipos de Estatísticas
export interface TicketStats {
  total: number;
  open: number;
  inProgress: number;
  resolved: number;
  closed: number;
  cancelled: number;
  byPriority: Record<TicketPriority, number>;
  byType: Record<TicketType, number>;
  byCategory: Record<string, number>;
  avgResolutionTime: number;
  avgRating: number;
}

export interface TenantStats {
  totalTenants: number;
  activeTenants: number;
  byType: Record<TenantType, number>;
  bySegment: Record<SegmentType, number>;
  byBrand: Record<string, number>;
}

// Tipos de Formulários
export interface CreateTicketRequest {
  title: string;
  description: string;
  priority: TicketPriority;
  type: TicketType;
  categoryId?: string;
  assigneeId?: string;
  guestEmail?: string;
  guestName?: string;
  attachments?: string[];
  tags?: string[];
  dueDate?: string;
}

export interface UpdateTicketRequest {
  title?: string;
  description?: string;
  status?: TicketStatus;
  priority?: TicketPriority;
  type?: TicketType;
  categoryId?: string;
  assigneeId?: string;
  tags?: string[];
  dueDate?: string;
}

export interface CreateTenantRequest {
  name: string;
  cnpj: string;
  subdomain: string;
  type: TenantType;
  brand?: string;
  segment: SegmentType;
  parentTenantId?: string;
  settings?: Record<string, unknown>;
}

export interface UpdateTenantRequest {
  name?: string;
  status?: TenantStatus;
  brand?: string;
  segment?: SegmentType;
  settings?: Record<string, unknown>;
}

export interface CreateUserRequest {
  email: string;
  name: string;
  password: string;
  role: UserRole;
  tenantId: string;
}

export interface UpdateUserRequest {
  name?: string;
  role?: UserRole;
  status?: UserStatus;
  avatar?: string;
}

export interface CreateCategoryRequest {
  name: string;
  description?: string;
  color: string;
  icon?: string;
  sla?: number;
  tenantId: string;
}

export interface UpdateCategoryRequest {
  name?: string;
  description?: string;
  color?: string;
  icon?: string;
  sla?: number;
  isActive?: boolean;
}

// Tipos de Configurações
export interface TenantSettings {
  allowGuestTickets?: boolean;
  requireApproval?: boolean;
  autoAssign?: boolean;
  emailNotifications?: boolean;
  smsNotifications?: boolean;
  customFields?: Record<string, unknown>;
  branding?: {
    logo?: string;
    primaryColor?: string;
    secondaryColor?: string;
  };
}

// Tipos de Notificações
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  userId: string;
  tenantId: string;
  createdAt: string;

  // Relacionamentos
  user?: User;
  tenant?: Tenant;
}

// Tipos de Dashboard
export interface DashboardData {
  stats: TicketStats;
  recentTickets: Ticket[];
  notifications: Notification[];
  trends: {
    period: string;
    tickets: number;
    resolved: number;
  }[];
}

// Tipos de Relatórios
export interface ReportFilters {
  dateFrom: string;
  dateTo: string;
  tenantId?: string[];
  brand?: string[];
  segment?: SegmentType[];
  status?: TicketStatus[];
  priority?: TicketPriority[];
}

export interface ReportData {
  summary: TicketStats;
  charts: {
    ticketsByDate: Array<{ date: string; count: number }>;
    ticketsByCategory: Array<{ category: string; count: number }>;
    ticketsByPriority: Array<{ priority: TicketPriority; count: number }>;
    resolutionTime: Array<{ period: string; avgTime: number }>;
  };
  tables: {
    topCategories: Array<{
      category: string;
      count: number;
      avgResolution: number;
    }>;
    topAgents: Array<{ agent: string; resolved: number; avgRating: number }>;
  };
}
