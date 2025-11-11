import { PingBuoyConfig } from '../client';
import { request } from '../utils/request';
import { Site, CreateSiteRequest, ListSitesParams } from '../types/sites';

export class Sites {
  constructor(private config: Required<PingBuoyConfig>) {}

  async list(params?: ListSitesParams): Promise<Site[]> {
    return request<Site[]>(this.config, 'GET', '/sites', { params });
  }

  async create(data: CreateSiteRequest): Promise<Site> {
    return request<Site>(this.config, 'POST', '/sites', { body: data });
  }

  async delete(id: string): Promise<{ success: boolean }> {
    return request<{ success: boolean }>(this.config, 'DELETE', '/sites', {
      params: { id }
    });
  }
}
