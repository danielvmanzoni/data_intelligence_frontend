import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  tenantSlug: string;
  userId: string;
  tenantId: string;
  role: string;
  email: string;
  tenantType: string;
  brand: string | null;
  segment: string | null;
  iat: number;
  exp: number;
}

interface TenantInfo {
  slug: string;
  id: string;
}

export function useTenant() {
  const [tenant, setTenant] = useState<TenantInfo | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          const decoded = jwtDecode<JwtPayload>(token);
          setTenant({
            slug: decoded.tenantSlug,
            id: decoded.tenantId,
          });
        } catch (error) {
          console.error("Erro ao decodificar token:", error);
        }
      }
    }
  }, []);

  return tenant;
}
