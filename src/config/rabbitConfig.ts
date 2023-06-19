export interface RabbitConsumeConfig {
    queue: string;
    deadLetterExchange: string;
    maxRetry?: number;
    failedRoutingKey?: string;
    prefetch?: number;
    enabled: boolean;
}

export interface RabbitHostConfig {
    host?: string;
    port: number;
    vhost?: string;
    username?: string;
    password?: string;
    tls?: boolean;
    publishTimeoutMs: number;
}

export interface RabbitPublishConfig {
    exchange: string;
    topic: string;
}