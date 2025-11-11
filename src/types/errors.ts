export class PingBuoyError extends Error {
  constructor(
    message: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = 'PingBuoyError';
  }
}

export class RateLimitError extends PingBuoyError {
  constructor(
    message: string,
    public retryAfter?: number
  ) {
    super(message, 429);
    this.name = 'RateLimitError';
  }
}

export class ValidationError extends PingBuoyError {
  constructor(
    message: string,
    public details?: any
  ) {
    super(message, 400);
    this.name = 'ValidationError';
  }
}
