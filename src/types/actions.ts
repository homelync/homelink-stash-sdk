import { EntityType } from './entities';

export interface ActionDispatcher {
    dispatch(payload: object, entityType: EntityType): Promise<number>;
    execute(payload: object, config: any, entityType: EntityType): Promise<number>;
}
