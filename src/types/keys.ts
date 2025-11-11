export type KeyPermission = 'read' | 'write' | 'admin';

export interface APIKey {
  id: string;
  name: string;
  prefix: string;
  permissions: KeyPermission[];
  status: 'active' | 'revoked';
  totalRequests: number;
  lastUsed: string | null;
  createdAt: string;
}

export interface CreateKeyRequest {
  name: string;
  permissions: KeyPermission[];
}

export interface CreateKeyResponse {
  success: boolean;
  key: string; // Full key only returned once
  apiKey: APIKey;
}
