export type SiteStatus = 'up' | 'down' | 'unknown';
export type SiteType = 'website' | 'api_endpoint';

export interface Site {
  id: string;
  name: string;
  url: string;
  type: SiteType;
  status: SiteStatus;
  last_checked: string | null;
  created_at: string;
  user_id: string;
  is_active: boolean;
}

export interface CreateSiteRequest {
  name: string;
  url: string;
  type?: SiteType;
}

export interface ListSitesParams {
  status?: SiteStatus;
}
