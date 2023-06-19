import { ChannelWrapper } from 'amqp-connection-manager';
import { RabbitConnectionManager } from './rabbitConnectionManager';

import { RabbitHostConfig, RabbitPublishConfig } from '../../config/rabbitConfig';
import { DataForwardResult, ILogger } from '../../types/logging';

export interface IRabbitPublisherService {
    publish(message: DataForwardResult, publishConfig: RabbitPublishConfig);
}

export class RabbitPublisherService implements IRabbitPublisherService {
    private channel: ChannelWrapper;

    constructor(hostConfig: RabbitHostConfig, private logger: ILogger, connectionManager: RabbitConnectionManager) {
        this.channel = connectionManager.connection.createChannel({ publishTimeout: hostConfig.publishTimeoutMs || 2000, confirm: false });
    }

    public async publish(message: DataForwardResult, publishConfig: RabbitPublishConfig) {
        await this.publishToChannel(this.channel, message, publishConfig);
    }

    private async publishToChannel(channel: ChannelWrapper, message: any, publishConfig: RabbitPublishConfig) {
        try {
            channel.publish(
                publishConfig.exchange,
                publishConfig.topic,
                Buffer.from(JSON.stringify(message), 'utf-8'),
                {
                    persistent: false
                }
            );
            this.logger.debug(`message published to ${publishConfig.exchange} with topic ${publishConfig.topic}:`, message);
        } catch (err) {
            this.logger.error(`Error publishing to ${publishConfig.exchange} with topic ${publishConfig.topic}`, err);
        }
    }
}