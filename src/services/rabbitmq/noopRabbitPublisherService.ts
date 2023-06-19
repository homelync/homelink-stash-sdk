import {  RabbitPublishConfig } from '../../config/rabbitConfig';
import { DataForwardResult } from '../../types/logging';

export interface IRabbitPublisherService {
    publish(message: DataForwardResult, publishConfig: RabbitPublishConfig);
}

export class NoopRabbitPublisherService implements IRabbitPublisherService {
    public async publish(message: DataForwardResult, publishConfig: RabbitPublishConfig) {
    }
}