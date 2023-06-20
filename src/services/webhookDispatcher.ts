import { Config } from '../config/config';
import { WebhookConfig } from '../config/webhookConfig';
import { ActionDispatcher } from '../types/actions';
import { EntityType } from '../types/entities';
import fetch from 'node-fetch';
import { ILogger } from '../types/logging';
import { StatusCode } from '../types/statusCode';

export class WebhookDispatcher implements ActionDispatcher {

    private readonly timeoutMs: number;
    constructor(private config: Config, private logger: ILogger) {
        this.timeoutMs = this.config.httpTimeout || 2000;
    }

    public async dispatch(payload: object, entityType: EntityType): Promise<void> {
        const hookConfig = this.config[entityType].hook;
        await this.execute(payload, hookConfig, entityType);
    }

    public async execute(payload: object, webhookConfig: WebhookConfig, entityType: EntityType): Promise<any> {

        const abortSignal = AbortSignal.timeout(this.timeoutMs);

        const requestInit = this.constructHookRequest(payload, webhookConfig, abortSignal);
        let response: any = null;

        const start = new Date();

        try {
            response = await fetch(webhookConfig.endpoint, requestInit as any);
        } catch (err: any) {

            let msg = err.messsage;
            let statusCode = StatusCode.failure;

            if (abortSignal.aborted) {
                msg = `Client timeout. API took longer than ${this.timeoutMs}ms to respond. Aborting.`;
                statusCode = StatusCode.clientTimeout;
            }

            this.logger.error(msg, err);
            const error = new Error(msg);
            (error as any).statusCode = statusCode;

            throw error;
        } finally {
            const end = new Date();
            this.logger.debug(`Fetch request took ${end.getTime() - start.getTime()}ms`, webhookConfig);
        }

        const successCode = webhookConfig.successCodes.length ? webhookConfig.successCodes : [200, 201, 202];

        if (!successCode.includes(response.status)) {
            const err = new Error(`Hook failed with status code ${response.status}`);
            (err as any).statusCode = response.status;
            throw err;
        }

        return response.status;
    }

    private constructHookRequest(payload: object, webhookConfig: WebhookConfig, abortSignal: AbortSignal): RequestInit {

        const headers = {} as any;
        headers['content-type'] = 'application/json';

        switch (webhookConfig.authenticationMethod) {
            case 'basic':
                const credentials = Buffer.from(`${webhookConfig.username}:${webhookConfig.password}`).toString('base64');
                headers.authorization = `Basic ${credentials}`;
                break;
            case 'apiKey':
                headers[webhookConfig.username] = webhookConfig.password;
                break;
            case 'bearer':
                headers.authorization = `Bearer ${webhookConfig.password}`;
                break;
        }

        const requestInit: RequestInit = {
            method: webhookConfig.method,
            body: JSON.stringify(payload),
            headers: headers,
            signal: abortSignal
        };

        return requestInit;
    }
}
