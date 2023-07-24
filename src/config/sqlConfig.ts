
export type SqlDialect = 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle';

export interface SqlConfig {
    dialect: SqlDialect;
    host: string;
    user: string;
    password: string;
    port: number;
    database: string;
    timezone: string;
}
