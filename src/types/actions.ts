import { EntityType } from './entities';

export interface ActionDispatcher {
    dispatch(payload: object, entityType: EntityType): Promise<void>;
    execute(payload: object, config: any, entityType: EntityType): Promise<void>;
}
