import { asc } from "drizzle-orm";
import app from "../../../app";
import { vehicles } from "../../../common/db/schema";

export const findAllVehicles = async ({
  page = 1,
  pageSize = 10,
}: {
  page: number;
  pageSize: number;
}) => {
  return await app.db
    .select()
    .from(vehicles)
    // .orderBy(asc(vehicles.id))
    .limit(pageSize)
    .offset((page - 1) * pageSize);
};
