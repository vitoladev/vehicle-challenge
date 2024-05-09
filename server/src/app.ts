import fp from "fastify-plugin";
import fastify from "fastify";
import { databasePlugin, gracefulShutdownPlugin } from "./common/plugins";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import fastifyHelmet from "@fastify/helmet";

const app = fastify({ logger: true });
app.register(fastifyHelmet);

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fp(databasePlugin));
app.register(fp(gracefulShutdownPlugin));

export default app;
