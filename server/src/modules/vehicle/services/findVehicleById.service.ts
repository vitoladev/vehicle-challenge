import { vehicleDoesNotExistError } from "../vehicle.errors";
import { vehicleRepository } from "../vehicle.repository";

export const findVehicleById = async (id: number) => {
  const result = await vehicleRepository.findById(id);

  const vehicle = result[0];
  if (!vehicle) {
    throw vehicleDoesNotExistError();
  }

  return vehicle;
};
