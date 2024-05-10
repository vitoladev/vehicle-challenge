import { handleVehicleUniqueConstraintError } from "../vehicle.errors";
import { vehicleRepository } from "../vehicle.repository";
import { VehicleSchema } from "../vehicle.schema";

export const createVehicle = async (data: VehicleSchema) => {
  try {
    const result = await vehicleRepository.create(data);
    return result[0];
  } catch (error) {
    handleVehicleUniqueConstraintError(error, {
      placa: data.placa,
      chassi: data.chassi,
      renavam: data.renavam
    });
    throw error;
  }
};
