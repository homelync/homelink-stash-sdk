import { ChannelWrapper } from 'amqp-connection-manager';
import { connect as amqpConnect } from 'amqp-connection-manager';
import { RabbitConnectionManager } from './rabbitConnectionManager';

import { RabbitHostConfig, RabbitPublishConfig } from '../../config/rabbitConfig';
import { DataForwardRecord, ILogger } from '../../types/logging';

export class RabbitPublisherService {
    private rabbitConnection: RabbitConnectionManager | null;
    private ampqConnectionString: string;
    private channel: ChannelWrapper;

    constructor(hostConfig: RabbitHostConfig, private logger: ILogger) {
        let host = hostConfig.port
            ? `${hostConfig.host}:${hostConfig.port}`
            : hostConfig.host;

        if (hostConfig.vhost) {
            host = `${host}/${hostConfig.vhost}`;
        }

        const protocol = 'amqp';
        if (hostConfig.username && hostConfig.password) {
            this.ampqConnectionString = `${protocol}://${hostConfig.username}:${hostConfig.password}@${host}`;
        } else {
            this.ampqConnectionString = `${protocol}://${host}`;
        }

        this.rabbitConnection = new RabbitConnectionManager(amqpConnect([this.ampqConnectionString]), this.ampqConnectionString, this.logger);
        this.channel = this.rabbitConnection.connection.createChannel({ publishTimeout: 5000, confirm: false });
    }

    public async publish(message: DataForwardRecord, publishConfig: RabbitPublishConfig) {
        this.publishToChannel(this.channel, message, publishConfig);
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