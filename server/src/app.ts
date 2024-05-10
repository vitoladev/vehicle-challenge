import fp from "fastify-plugin";
import fastify from "fastify";
import { databasePlugin, gracefulShutdownPlugin } from "./common/plugins";
import {
  serializerCompiler,
  validatorCompiler
} from "fastify-type-provider-zod";
import fastifyHelmet from "@fastify/helmet";
import { errorHandler } from "./common/errors/errorHandler";
import { vehicleController } from "./modules/vehicle/vehicle.controller";
import fastifyCors from "@fastify/cors";

const buildApp = () => {
  const app = fastify({
    logger: process.env.NODE_ENV === "test" ? false : true
  });
  app.setErrorHandler(errorHandler);
  app.register(fastifyHelmet);
  app.register(fastifyCors, {
    origin: "*"
  });

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.register(fp(databasePlugin));
  app.register(fp(gracefulShutdownPlugin));

  app.register(vehicleController, { prefix: "/vehicles" });

  return app;
};

const app = buildApp();
export default app;
