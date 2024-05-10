import supertest from "supertest";
import app from "../../../../app";
import { vehicleMock } from "../../../../../test/vehicle";
import { createVehicle } from "../createVehicle.service";
import { faker } from "@faker-js/faker";
import assert from "assert";

describe("Delete Vehicle - DELETE /vehicles/:id", () => {
  before(async () => {
    await app.ready();
  });

  it("should delete a vehicle from the database", async () => {
    const vehicle = await createVehicle(vehicleMock());

    await supertest(app.server).delete(`/vehicles/${vehicle.id}`).expect(204);
  });

  it("should throw a 404 error if the vehicle does not exist", async () => {
    const vehicleIdThatDoesNotExist = faker.number.int({ min: 10000, max: 20000 });

    const response = await supertest(app.server)
      .delete(`/vehicles/${vehicleIdThatDoesNotExist}`)
      .expect(404);

    assert.equal(response.body.code, "VEHICLE_DOES_NOT_EXIST");
  });
});
