import { FastifyPluginCallback } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { vehicleSchema } from "./vehicle.schema";
import {
  createVehicle,
  findAllVehicles,
  findVehicleById,
} from "./vehicle.service";

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

  app.withTypeProvider<ZodTypeProvider>().get("/", async (req, reply) => {
    const vehicles = await findAllVehicles();
    return reply.send(vehicles);
  });

  app.withTypeProvider<ZodTypeProvider>().get(
    "/:id",
    {
      schema: {
        params: z.object({
          id: z
            .string()
            .refine((id) => Number.isInteger(Number(id)) && Number(id) > 0)
            .transform((id) => Number(id)),
        }),
      },
    },
    async ({ params: { id } }, reply) => {
      const vehicle = await findVehicleById(id);
      return reply.send(vehicle);
    }
  );

  done();
};
