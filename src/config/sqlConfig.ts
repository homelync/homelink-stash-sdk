
export type SqlDialect = 'mysql' | 'mssql' | 'pg';

export interface SqlConfig {
    dialect: SqlDialect;
    host: string;
    user: string;
    password: string;
    port: number;
    database: string;
    timezone: string;
}
