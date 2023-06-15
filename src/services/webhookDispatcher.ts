import { Config } from '../config/config';
import { WebhookConfig } from '../config/webhookConfig';
import { ActionDispatcher } from '../types/actions';
import { EntityType } from '../types/entities';
import fetch from 'node-fetch';

export class WebhookDispatcher implements ActionDispatcher {

    constructor(private config: Config) {
    }

    public async dispatch(payload: object, entityType: EntityType): Promise<void> {
        const hookConfig = this.config[entityType].hook;
        await this.execute(payload, hookConfig, entityType);
    }

    public async execute(payload: object, webhookConfig: WebhookConfig, entityType: EntityType): Promise<void> {
        const requestInit = this.constructHookRequest(payload, webhookConfig);
        const response = await fetch(webhookConfig.endpoint, requestInit as any);
        const successCode = webhookConfig.successCodes.length ? webhookConfig.successCodes : [200, 201, 202];

        if (!successCode.includes(response.status)) {
            throw new Error(`Hook failed with status code ${response.status}`);
        }
    }

    private constructHookRequest(payload: object, webhookConfig: WebhookConfig): RequestInit {

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
            headers: headers
        };

        return requestInit;
    }
}
