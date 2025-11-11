export * from './sites';
export * from './integrations';
export * from './keys';
export * from './errors';

export interface MonitoringTriggerRequest {
  action: 'uptime' | 'pagespeed' | 'deadlinks';
  siteId: string;
}

export interface MonitoringTriggerResponse {
  success: boolean;
  site: {
    id: string;
    name: string;
    url: string;
  };
  result: {
    type: string;
    status: string;
    responseTime?: number;
    statusCode?: number;
    sslValid?: boolean;
  };
}
