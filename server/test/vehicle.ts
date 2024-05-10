import { faker } from "@faker-js/faker";
import app from "../src/app";
import { vehicles } from "../src/common/db/schema";

export const vehiclePlateMock = () =>
  `${faker.string.alpha({ length: 3 }).toUpperCase()}${faker.number.int({ min: 0, max: 9 })}${faker.string.alpha({ length: 1 }).toUpperCase()}${faker.number.int(
    {
      min: 10,
      max: 99
    }
  )}`;

export const vehicleMock = () => ({
  placa: vehiclePlateMock(),
  chassi: faker.vehicle.vin(),
  renavam: faker.number.int({ min: 100000000, max: 99999999999 }),
  modelo: faker.vehicle.model(),
  marca: faker.vehicle.manufacturer(),
  ano: faker.number.int({ min: 1886, max: 2024 })
});

export const cleanUpVehicles = async () => {
  await app.db.delete(vehicles);
};
