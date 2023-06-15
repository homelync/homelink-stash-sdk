import { RabbitConsumeConfig } from './rabbitConfig';
import { SnsConfig } from './snsConfig';
import { WebhookConfig } from './webhookConfig';

export interface EntityConfig {
    consume: RabbitConsumeConfig;
    actionType?: string;
    sns: SnsConfig;
    hook: WebhookConfig;
    usesDb: boolean;
    usesSns: boolean;
    usesHook: boolean;
}