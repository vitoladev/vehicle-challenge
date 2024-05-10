import app from "../../../app";
import { vehicles } from "../../../common/db/schema";
import { handleVehicleUniqueConstraintError } from "../vehicle.errors";
import { VehicleSchema } from "../vehicle.schema";

export const createVehicle = async (data: VehicleSchema) => {
  try {
    const result = await app.db
      .insert(vehicles)
      .values(data)
      .returning()
      .execute();

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
