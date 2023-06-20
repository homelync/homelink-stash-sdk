import { Container } from 'inversify';
import { Config } from '../config/config';
import { ActionDispatcher } from './actions';
import { ILogger } from './logging';

export abstract class PluginRegistration {

    protected abstract pluginName: string;
    protected logger: ILogger;

    constructor(protected container: Container, protected configuration: Config, protected TYPES: any) {
        const dispatcherName = getDispatcherName(this.getName());
        TYPES[dispatcherName] = Symbol(dispatcherName);
        this.logger = container.get<ILogger>(TYPES.Logger);
    }

    public abstract init(container: Container, configuration: Config, TYPES: any): Promise<void>;

    public registerDispatcher(dispatcher: ActionDispatcher) {
        const dispatcherName = getDispatcherName(this.getName());
        this.container.bind<ActionDispatcher>(this.TYPES[dispatcherName]).toConstantValue(dispatcher);
    }

    private getName(): string {
        return this.pluginName;
    }
}

export function getDispatcherName(pluginName: string): string {
    return `${pluginName}Dispatcher`;
}