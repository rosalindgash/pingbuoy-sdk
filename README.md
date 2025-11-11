# PingBuoy SDK

Official JavaScript/TypeScript SDK for the PingBuoy website monitoring API.

## Installation

```bash
npm install pingbuoy
```

## Quick Start

```typescript
import { PingBuoy } from 'pingbuoy';

const client = new PingBuoy({
  apiKey: 'pb_your_api_key_here'
});

// List all monitored sites
const sites = await client.sites.list();

// Add a new site
const newSite = await client.sites.create({
  name: 'My Website',
  url: 'https://example.com',
  type: 'website'
});

// Trigger a manual check
const result = await client.monitoring.trigger({
  action: 'uptime',
  siteId: newSite.id
});
```

## API Reference

### Sites

```typescript
// List all sites
const sites = await client.sites.list();
const upSites = await client.sites.list({ status: 'up' });

// Create a site
const site = await client.sites.create({
  name: 'My Website',
  url: 'https://example.com',
  type: 'website' // or 'api_endpoint'
});

// Delete a site
await client.sites.delete('site-uuid');
```

### Integrations

```typescript
// List integrations
const integrations = await client.integrations.list();

// Create integration
const integration = await client.integrations.create({
  name: 'Slack Alerts',
  integration_type: 'slack',
  webhook_url: 'https://hooks.slack.com/services/...',
  events: ['downtime', 'recovery']
});

// Delete integration
await client.integrations.delete('integration-uuid');
```

### API Keys

```typescript
// List API keys
const keys = await client.keys.list();

// Create API key (returns full key only once!)
const { key, apiKey } = await client.keys.create({
  name: 'Production Key',
  permissions: ['read', 'write']
});

// Revoke API key
await client.keys.delete('key-uuid');
```

### Monitoring

```typescript
// Trigger manual check
const result = await client.monitoring.trigger({
  action: 'uptime', // or 'pagespeed', 'deadlinks'
  siteId: 'site-uuid'
});
```

## Error Handling

```typescript
import { PingBuoyError, RateLimitError, ValidationError } from 'pingbuoy';

try {
  await client.sites.create({ name: 'Test', url: 'invalid-url' });
} catch (error) {
  if (error instanceof ValidationError) {
    console.error('Validation failed:', error.message, error.details);
  } else if (error instanceof RateLimitError) {
    console.error('Rate limited. Retry after:', error.retryAfter);
  } else if (error instanceof PingBuoyError) {
    console.error('API error:', error.message, error.statusCode);
  }
}
```

## TypeScript Support

Full TypeScript support with type definitions included.

```typescript
import type { Site, Integration, APIKey } from 'pingbuoy';
```

## Configuration Options

```typescript
const client = new PingBuoy({
  apiKey: 'pb_your_api_key',      // Required
  baseUrl: 'https://api.custom',  // Optional (default: https://pingbuoy.com/api)
  timeout: 30000                  // Optional (default: 30000ms)
});
```

## License

MIT

## Support

- Documentation: https://pingbuoy.com/docs/api
- Issues: https://github.com/rosalindgash/pingbuoy-sdk/issues
- Email: support@pingbuoy.com
