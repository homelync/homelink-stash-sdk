import { EntityConfig } from './entityConfig';
import { RabbitHostConfig } from './rabbitConfig';
import { SqlConfig } from './sqlConfig';

export interface Config {
    environment: string;
    isDocker: boolean;
    device: EntityConfig;
    alert: EntityConfig;
    property: EntityConfig;
    notification: EntityConfig;
    reading: EntityConfig;
    rabbitHost: RabbitHostConfig;
    enableDb: boolean;
    logging: LogConfig;
    sqlConfig: SqlConfig;
    httpTimeout: number;
    plugins: PluginConfig[];
}

export interface PluginConfig {
    name: string;
    settings: any;
}

export interface LogConfig {
    loglevel: string;
    human: boolean;
}