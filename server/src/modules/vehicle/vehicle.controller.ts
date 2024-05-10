import { FastifyPluginCallback } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { vehicleIdParamSchema, vehicleSchema } from "./vehicle.schema";
import {
  createVehicle,
  deleteVehicle,
  findAllVehicles,
  findVehicleById,
  updateVehicle,
} from "./services";

export const vehicleController: FastifyPluginCallback = (app, _, done) => {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/",
    {
      schema: {
        body: vehicleSchema,
      },
    },
    async ({ body }, reply) => {
      const vehicle = await createVehicle(body);
      reply.code(201).send(vehicle);
    }
  );

  app.withTypeProvider<ZodTypeProvider>().put(
    "/:id",
    {
      schema: {
        params: vehicleIdParamSchema,
        body: vehicleSchema,
      },
    },
    async ({ body, params: { id } }, reply) => {
      const vehicle = await updateVehicle(id, body);
      reply.send(vehicle);
    }
  );

  app.withTypeProvider<ZodTypeProvider>().delete(
    "/:id",
    {
      schema: {
        params: vehicleIdParamSchema,
      },
    },
    async ({ params: { id } }, reply) => {
      await deleteVehicle(id);
      return reply.code(204).send();
    }
  );

  app.withTypeProvider<ZodTypeProvider>().get(
    "/:id",
    {
      schema: {
        params: vehicleIdParamSchema,
      },
    },
    async ({ params: { id } }, reply) => {
      const vehicle = await findVehicleById(id);
      return reply.send(vehicle);
    }
  );

  app.withTypeProvider<ZodTypeProvider>().get("/", async (_req, reply) => {
    const vehicles = await findAllVehicles({ page: 1, pageSize: 10 });
    return reply.send(vehicles);
  });

  done();
};
