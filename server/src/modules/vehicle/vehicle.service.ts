import app from "../../app";
import { vehicles } from "../../common/db/schema";
import { VehicleSchema } from "./vehicle.schema";
import { eq } from "drizzle-orm";

export const createVehicle = async ({
  placa,
  chassi,
  renavam,
  modelo,
  marca,
  ano,
}: VehicleSchema) => {
  const result = await app.db
    .insert(vehicles)
    .values({
      placa,
      chassi,
      renavam,
      modelo,
      marca,
      ano,
    })
    .returning();

  return result[0];
};

export const findAllVehicles = async () => {
  return await app.db.select().from(vehicles);
};

export const findVehicleById = async (id: number) => {
  const result = await app.db
    .select()
    .from(vehicles)
    .where(eq(vehicles.id, id));

  return result[0];
};
