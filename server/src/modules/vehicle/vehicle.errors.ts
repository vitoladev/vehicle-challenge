import createError from "@fastify/error";
import { VehicleSchema } from "./vehicle.schema";

export function errorHasCodeAndConstraint(obj: any): obj is {
  code: string;
  constraint:
    | "vehicles_placa_unique"
    | "vehicles_chassi_unique"
    | "vehicles_renavam_unique";
} {
  return typeof obj.code === "string" && typeof obj.constraint === "string";
}

export const vehicleDoesNotExistError = createError(
  "VEHICLE_DOES_NOT_EXIST",
  "Veículo não encontrado",
  404
);

export const placaAlreadyExistsError = createError<[string]>(
  "PLACA_ALREADY_EXISTS",
  "Placa %s já cadastrada",
  409
);

export const chassiAlreadyExistsError = createError<[string]>(
  "CHASSI_ALREADY_EXISTS",
  "Chassi %s já cadastrado",
  409
);

export const renavamAlreadyExistsError = createError<[number]>(
  "RENAVAM_ALREADY_EXISTS",
  "Renavam %s já cadastrado",
  409
);

export const handleVehicleUniqueConstraintError = (
  error: unknown,
  {
    placa,
    chassi,
    renavam,
  }: Pick<VehicleSchema, "placa" | "chassi" | "renavam">
) => {
  if (errorHasCodeAndConstraint(error)) {
    if (error.constraint === "vehicles_placa_unique")
      throw new placaAlreadyExistsError(placa);

    if (error.constraint === "vehicles_chassi_unique")
      throw new chassiAlreadyExistsError(chassi);

    if (error.constraint === "vehicles_renavam_unique")
      throw new renavamAlreadyExistsError(renavam);
  }
};
