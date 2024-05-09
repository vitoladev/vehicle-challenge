import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import 'fastify';

declare module 'fastify' {
    interface FastifyInstance {
        db: NodePgDatabase;
    }
}