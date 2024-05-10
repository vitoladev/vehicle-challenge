import { eq } from "drizzle-orm";
import app from "../../app";
import { vehicles } from "../../common/db/schema";
import { VehicleSchema } from "./vehicle.schema";

export const vehicleRepositoryFactory = () => {
  const create = async (data: VehicleSchema) => {
    return await app.db.insert(vehicles).values(data).returning().execute();
  };

  const update = async (id: number, data: VehicleSchema) => {
    return await app.db
      .update(vehicles)
      .set(data)
      .where(eq(vehicles.id, id))
      .returning()
      .execute();
  };

  const deleteVehicle = async (id: number) => {
    return await app.db
      .delete(vehicles)
      .where(eq(vehicles.id, id))
      .returning({ id: vehicles.id })
      .execute();
  };

  const findAll = async ({
    page = 1,
    pageSize = 10,
  }: {
    page: number;
    pageSize: number;
  }) => {
    return await app.db
      .select()
      .from(vehicles)
      .limit(pageSize)
      .offset((page - 1) * pageSize)
      .execute();
  };

  const findById = async (id: number) => {
    return await app.db
      .select()
      .from(vehicles)
      .where(eq(vehicles.id, id))
      .execute();
  };

  return {
    create,
    update,
    delete: deleteVehicle,
    findAll,
    findById,
  };
};

export const vehicleRepository = vehicleRepositoryFactory();
