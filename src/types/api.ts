// Tipos baseados na documentação da API
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  tenant: {
    id: number;
    name: string;
    slug: string;
    cnpj: string;
    brand: string;
    segment: string;
  };
}

export interface Tenant {
  id: number;
  name: string;
  slug: string;
  cnpj: string;
  brand: string;
  segment: string;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

export interface TicketCreator {
  id: string;
  name: string;
  email: string;
}

export interface TicketCategory {
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

export interface TicketTenant {
  id: string;
  name: string;
  brand: string | null;
  type: string;
}

export interface Ticket {
  id: string;
  number: string;
  title: string;
  description: string;
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  dueDate: string;
  resolvedAt: string | null;
  closedAt: string | null;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  rating: number | null;
  feedback: string | null;
  createdAt: string;
  updatedAt: string;
  tenantId: string;
  creatorId: string;
  assigneeId: string | null;
  categoryId: string;
  creator: TicketCreator;
  assignee: TicketCreator | null;
  category: TicketCategory;
  tenant: TicketTenant;
  _count: {
    comments: number;
  };
}

export interface TicketStats {
  open: number;
  inProgress: number;
  resolved: number;
  total: number;
}

// A API retorna um array de tickets diretamente
export type TicketsResponse = Ticket[];
