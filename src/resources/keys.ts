import { PingBuoyConfig } from '../client';
import { request } from '../utils/request';
import { APIKey, CreateKeyRequest, CreateKeyResponse } from '../types/keys';

export class Keys {
  constructor(private config: Required<PingBuoyConfig>) {}

  async list(): Promise<APIKey[]> {
    return request<APIKey[]>(this.config, 'GET', '/keys');
  }

  async create(data: CreateKeyRequest): Promise<CreateKeyResponse> {
    return request<CreateKeyResponse>(this.config, 'POST', '/keys', { body: data });
  }

  async delete(id: string): Promise<{ success: boolean }> {
    return request<{ success: boolean }>(this.config, 'DELETE', '/keys', {
      params: { id }
    });
  }
}
