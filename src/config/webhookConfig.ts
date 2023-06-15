import { AuthenticationType } from '../types/authentication';

export interface WebhookConfig {
    endpoint: string;
    authenticationMethod: AuthenticationType;
    successCodes: number[];
    method: string;
    username: string;
    password: string;
}