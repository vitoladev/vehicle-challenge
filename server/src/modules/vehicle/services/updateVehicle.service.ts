import {
  vehicleDoesNotExistError,
  handleVehicleUniqueConstraintError,
} from "../vehicle.errors";
import { VehicleSchema } from "../vehicle.schema";
import { vehicleRepository } from "../vehicle.repository";

export const updateVehicle = async (id: number, data: VehicleSchema) => {
  try {
    const result = await vehicleRepository.update(id, data);

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
