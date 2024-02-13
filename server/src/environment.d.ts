declare namespace NodeJS {
    interface ProcessEnv {
        ALLOWED_ORIGINS: string;
        DB_USER:string;
        DB_PASSWORD:string;
        DB:string;
        DIALECT:Dialect;
        NODE_ENV:string;
        PORT:number;
        DB_HOST:string;
        BASE:string;
        // Add other environment variables here if needed
    }
}