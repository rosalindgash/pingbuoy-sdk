import { PingBuoyConfig } from '../client';
import { PingBuoyError, RateLimitError, ValidationError } from '../types/errors';

export async function request<T>(
  config: Required<PingBuoyConfig>,
  method: 'GET' | 'POST' | 'DELETE' | 'PATCH',
  path: string,
  options?: {
    params?: Record<string, any>;
    body?: Record<string, any>;
  }
): Promise<T> {
  const url = new URL(path, config.baseUrl);

  // Add query parameters
  if (options?.params) {
    Object.entries(options.params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }

  const headers: Record<string, string> = {
    'Authorization': `Bearer ${config.apiKey}`,
    'Content-Type': 'application/json',
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), config.timeout);

  try {
    const response = await fetch(url.toString(), {
      method,
      headers,
      body: options?.body ? JSON.stringify(options.body) : undefined,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Handle error responses
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));

      // Rate limit error
      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After');
        throw new RateLimitError(
          errorData.error || 'Rate limit exceeded',
          retryAfter ? parseInt(retryAfter) : undefined
        );
      }

      // Validation error
      if (response.status === 400) {
        throw new ValidationError(errorData.error || 'Validation failed', errorData.details);
      }

      // Generic error
      throw new PingBuoyError(
        errorData.error || `HTTP ${response.status} error`,
        response.status
      );
    }

    // Parse successful response
    const data = await response.json();
    return data as T;
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof PingBuoyError) {
      throw error;
    }

    if (error instanceof Error) {
      throw new PingBuoyError(error.message);
    }

    throw new PingBuoyError('Unknown error occurred');
  }
}
