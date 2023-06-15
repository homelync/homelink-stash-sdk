import { ILogger } from '../types/logging';

export class TestLogger implements ILogger {
    public timing(name: string, value: number, eventId: number, context?: string | undefined, method?: string | undefined): void {
        console.log(name, value);
    }
    public count(name: string, value: number, eventId: number, context?: string | undefined, method?: string | undefined): void {
        console.log(name, value);
    }
    public info(message: string, data: any, eventId?: number | undefined, tag?: string | undefined): void {
        console.log(message, data);
    }
    public warn(message: string, data: any, eventId?: number | undefined, tag?: string | undefined): void {
        console.log(message, data);
    }
    public error(message: string, data: any, eventId?: number | undefined, tag?: string | undefined): void {
        console.log(message, data);
    }
    public verbose(message: string, data: any, eventId?: number | undefined, tag?: string | undefined): void {
        console.log(message, data);
    }
    public debug(message: string, data: any, eventId?: number | undefined, tag?: string | undefined): void {
        console.log(message, data);
    }
}