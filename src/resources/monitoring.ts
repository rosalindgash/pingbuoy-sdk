import { PingBuoyConfig } from '../client';
import { request } from '../utils/request';
import { MonitoringTriggerRequest, MonitoringTriggerResponse } from '../types';

export class Monitoring {
  constructor(private config: Required<PingBuoyConfig>) {}

  async trigger(data: MonitoringTriggerRequest): Promise<MonitoringTriggerResponse> {
    return request<MonitoringTriggerResponse>(
      this.config,
      'POST',
      '/monitoring/trigger',
      { body: data }
    );
  }
}
