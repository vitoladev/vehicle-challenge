import { vehicleDoesNotExistError } from "../vehicle.errors";
import { vehicleRepository } from "../vehicle.repository";

export const deleteVehicle = async (id: number) => {
  const result = await vehicleRepository.delete(id);

  if (result.length === 0) {
    throw vehicleDoesNotExistError();
  }
};
