import fp from "fastify-plugin";
import fastify from "fastify";
import { databasePlugin, gracefulShutdownPlugin } from "./common/plugins";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import fastifyHelmet from "@fastify/helmet";
import { errorHandler } from "./common/errorHandler";
import { vehicleController } from "./modules/vehicle/vehicle.controller";

const app = fastify({ logger: true });
app.setErrorHandler(errorHandler);
app.register(fastifyHelmet);

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fp(databasePlugin));
app.register(fp(gracefulShutdownPlugin));

app.register(vehicleController, { prefix: "/vehicles" });

export default app;
