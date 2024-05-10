import supertest from "supertest";
import app from "../../../../app";
import { vehicleMock } from "../../../../../test/vehicle";
import { createVehicle } from "./../createVehicle.service";
import assert from "assert";
import { faker } from "@faker-js/faker";

describe("Find Vehicle By Id - GET /vehicles/:id", () => {
  it("should return the vehicle with the given id", async () => {
    const vehicleData = vehicleMock();
    const vehicle = await createVehicle(vehicleData);

    const response = await supertest(app.server)
      .get(`/vehicles/${vehicle.id}`)
      .expect(200);

    assert.equal(response.body.id, vehicle.id);
    assert.equal(response.body.placa, vehicle.placa);
    assert.equal(response.body.chassi, vehicle.chassi);
    assert.equal(response.body.renavam, vehicle.renavam);
    assert.equal(response.body.modelo, vehicle.modelo);
    assert.equal(response.body.marca, vehicle.marca);
    assert.equal(response.body.ano, vehicle.ano);
  });

  it("should return 404 if the vehicle is not found", async () => {
    const vehicleIdThatDoesNotExist = faker.number.int({
      min: 10000,
      max: 20000
    });

    const response = await supertest(app.server)
      .get(`/vehicles/${vehicleIdThatDoesNotExist}`)
      .expect(404);

    assert.equal(response.body.code, "VEHICLE_DOES_NOT_EXIST");
  });
});
