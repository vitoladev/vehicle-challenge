import { eq } from "drizzle-orm";
import app from "../../../app";
import { vehicles } from "../../../common/db/schema";
import {
  vehicleDoesNotExistError,
  handleVehicleUniqueConstraintError,
} from "../vehicle.errors";
import { VehicleSchema } from "../vehicle.schema";

export const updateVehicle = async (id: number, data: VehicleSchema) => {
  try {
    const result = await app.db
      .update(vehicles)
      .set(data)
      .where(eq(vehicles.id, id))
      .returning()
      .execute();

    if (result.length === 0) {
      throw vehicleDoesNotExistError();
    }

    return result[0];
  } catch (error) {
    handleVehicleUniqueConstraintError(error, {
      placa: data.placa,
      chassi: data.chassi,
      renavam: data.renavam,
    });
    throw error;
  }
};
