
export interface ILogger {
    timing(name: string, value: number, eventId: number, context?: string, method?: string): void;
    count(name: string, value: number, eventId: number, context?: string, method?: string): void;
    info(message: string, data: any, eventId?: number, tag?: string): void;
    warn(message: string, data: any, eventId?: number, tag?: string): void;
    error(message: string, data: any, eventId?: number, tag?: string): void;
    verbose(message: string, data: any, eventId?: number, tag?: string): void;
    debug(message: string, data: any, eventId?: number, tag?: string): void;
}