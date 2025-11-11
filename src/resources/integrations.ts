import { PingBuoyConfig } from '../client';
import { request } from '../utils/request';
import { Integration, CreateIntegrationRequest } from '../types/integrations';

export class Integrations {
  constructor(private config: Required<PingBuoyConfig>) {}

  async list(): Promise<Integration[]> {
    return request<Integration[]>(this.config, 'GET', '/integrations');
  }

  async create(data: CreateIntegrationRequest): Promise<{ success: boolean; integration: Integration }> {
    return request(this.config, 'POST', '/integrations', { body: data });
  }

  async delete(id: string): Promise<{ success: boolean }> {
    return request<{ success: boolean }>(this.config, 'DELETE', '/integrations', {
      params: { id }
    });
  }
}
