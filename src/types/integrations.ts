export type IntegrationType = 'slack' | 'discord' | 'webhook';
export type IntegrationEvent = 'downtime' | 'recovery' | 'page_speed' | 'ssl_expiration' | 'dead_links';

export interface Integration {
  id: string;
  name: string;
  type: IntegrationType;
  status: 'active' | 'inactive';
  config: {
    events: IntegrationEvent[];
  };
  lastTest: string | null;
  lastTestStatus: 'success' | 'failed' | null;
  totalNotifications: number;
}

export interface CreateIntegrationRequest {
  name: string;
  integration_type: IntegrationType;
  webhook_url: string;
  events?: IntegrationEvent[];
}
