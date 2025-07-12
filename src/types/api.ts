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
