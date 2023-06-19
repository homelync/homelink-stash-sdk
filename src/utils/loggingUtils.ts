import { EntityType } from '../types/entities';

export function getDescriptionForMessage(payload: any, entityType: EntityType): string {
    switch (entityType) {
        case 'property': return `${payload.propertyDisplayReference} ${payload.address1} ${payload.postcode}`;
        case 'device': return `${payload.sourceModel} ${payload.location}`;
        case 'alert': return `${payload.propertyDisplayReference} ${payload.eventTypeName}`;
        case 'notification': return `${payload.propertyDisplayReference}`;
        case 'reading': return `${payload.propertyDisplayReference} ${payload.location} ${payload.readingTypeId} ${payload.readingDate}`;
        default: return '';
    }
}