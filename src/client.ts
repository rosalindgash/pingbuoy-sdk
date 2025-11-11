import { Sites } from './resources/sites';
import { Integrations } from './resources/integrations';
import { Keys } from './resources/keys';
import { Monitoring } from './resources/monitoring';

export interface PingBuoyConfig {
  apiKey: string;
  baseUrl?: string;
  timeout?: number;
}

export class PingBuoy {
  private config: Required<PingBuoyConfig>;

  public sites: Sites;
  public integrations: Integrations;
  public keys: Keys;
  public monitoring: Monitoring;

  constructor(config: PingBuoyConfig) {
    this.config = {
      apiKey: config.apiKey,
      baseUrl: config.baseUrl || 'https://pingbuoy.com/api',
      timeout: config.timeout || 30000,
    };

    // Initialize resource classes
    this.sites = new Sites(this.config);
    this.integrations = new Integrations(this.config);
    this.keys = new Keys(this.config);
    this.monitoring = new Monitoring(this.config);
  }
}
