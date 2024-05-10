import { eq } from "drizzle-orm";
import app from "../../../app";
import { vehicles } from "../../../common/db/schema";
import { vehicleDoesNotExistError } from "../vehicle.errors";

export const deleteVehicle = async (id: number) => {
  const result = await app.db
    .delete(vehicles)
    .where(eq(vehicles.id, id))
    .returning({ id: vehicles.id })
    .execute();

  if (result.length === 0) {
    throw vehicleDoesNotExistError();
  }
};
