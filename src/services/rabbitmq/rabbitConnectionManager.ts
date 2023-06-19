import { AmqpConnectionManager } from 'amqp-connection-manager';
import { ILogger } from '../../types/logging';

export interface IRabbitConnectionManager {
    connection: AmqpConnectionManager;
}

export class RabbitConnectionManager implements IRabbitConnectionManager {

    constructor(public connection: AmqpConnectionManager, url: string, logger: ILogger) {
        connection.on('connect', () => logger.debug(`Connected to rabbitMq @ ${url}`, undefined));
        connection.on('disconnect', () => logger.warn(`Disconnected from rabbitMq @ ${url}`, undefined));
        connection.on('connectFailed', () => logger.error(`Disconnected from rabbitMq @ ${url}`, {}));
        connection.on('unblocked', () => logger.info(`Unblocked rabbitMq @ ${url}`, undefined));
        connection.on('blocked', () => logger.error(`Blocked rabbitMq @ ${url}`, {}));
    }
}
