import { Container } from 'inversify';
import { Config } from '../config/config';
import { ActionDispatcher } from './actions';
import { ILogger } from './logging';

export abstract class PluginRegistration {

    protected logger: ILogger;
    constructor(protected container: Container, protected configuration: Config, protected TYPES: any) {
        this.logger = container.get<ILogger>(TYPES.Logger);
    }

    public abstract init(container: Container, configuration: Config, TYPES: any): Promise<void>;

    public registerDispatcher(dispatcher: ActionDispatcher, pluginName: string) {
        const dispatcherName = getDispatcherName(pluginName);
        this.TYPES[dispatcherName] = Symbol(dispatcherName);
        this.container.bind<ActionDispatcher>(this.TYPES[dispatcherName]).toConstantValue(dispatcher);
    }
}

export function getDispatcherName(pluginName: string): string {
    return `${pluginName}Dispatcher`;
}