import { vehicleRepository } from "../vehicle.repository";

export const findAllVehicles = async ({
  page = 1,
  pageSize = 10
}: {
  page: number;
  pageSize: number;
}) => await vehicleRepository.findAll({ page, pageSize });
