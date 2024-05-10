import { eq } from "drizzle-orm";
import app from "../../../app";
import { vehicles } from "../../../common/db/schema";
import { vehicleDoesNotExistError } from "../vehicle.errors";

export const findVehicleById = async (id: number) => {
  const result = await app.db
    .select()
    .from(vehicles)
    .where(eq(vehicles.id, id));

  const vehicle = result[0];
  if (!vehicle) {
    throw vehicleDoesNotExistError();
  }

  return vehicle;
};
