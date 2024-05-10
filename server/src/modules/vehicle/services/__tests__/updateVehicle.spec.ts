import { createVehicle } from "./../createVehicle.service";
import supertest from "supertest";
import assert from "assert";
import app from "../../../../app";
import { vehicleMock, vehiclePlateMock } from "../../../../../test/vehicle";
import { faker } from "@faker-js/faker";

describe("Update Vehicle - PUT /vehicles/:id", () => {
  it("should update a vehicle fields modelo, marca and ano", async () => {
    const vehicleData = vehicleMock();
    const vehicle = await createVehicle(vehicleData);

    const updatedVehicle = {
      ...vehicleData,
      modelo: faker.vehicle.model(),
      marca: faker.vehicle.manufacturer(),
      ano: faker.number.int({ min: 1886, max: 2024 }),
    };

    const response = await supertest(app.server)
      .put(`/vehicles/${vehicle.id}`)
      .send(updatedVehicle)
      .expect(200);

    assert.equal(response.body.id, vehicle.id);
    assert.equal(response.body.modelo, updatedVehicle.modelo);
    assert.equal(response.body.marca, updatedVehicle.marca);
    assert.equal(response.body.ano, updatedVehicle.ano);
  });

  it('should update a vehicle "placa" field', async () => {
    const vehicleData = vehicleMock();
    const vehicle = await createVehicle(vehicleData);

    const updatedVehicle = {
      ...vehicleData,
      placa: vehiclePlateMock(),
    };

    const response = await supertest(app.server)
      .put(`/vehicles/${vehicle.id}`)
      .send(updatedVehicle)
      .expect(200);

    assert.equal(response.body.id, vehicle.id);
    assert.equal(response.body.placa, updatedVehicle.placa);
  });

  it('should throw a 409 error if it tries to update a vehicle "placa" field that already exists', async () => {
    const vehicleData = vehicleMock();
    const vehicleWithAPlateThatExists = vehicleMock();

    const [vehicle] = await Promise.all([
      createVehicle(vehicleData),
      createVehicle(vehicleWithAPlateThatExists),
    ]);

    const updatedVehicle = {
      ...vehicleData,
      placa: vehicleWithAPlateThatExists.placa,
    };

    const response = await supertest(app.server)
      .put(`/vehicles/${vehicle.id}`)
      .send(updatedVehicle)
      .expect(409);

    assert.equal(response.body.code, "PLACA_ALREADY_EXISTS");
  });

  it('should update a vehicle "chassi" field', async () => {
    const vehicleData = vehicleMock();
    const vehicle = await createVehicle(vehicleData);

    const updatedVehicle = {
      ...vehicleData,
      chassi: faker.vehicle.vin(),
    };

    const response = await supertest(app.server)
      .put(`/vehicles/${vehicle.id}`)
      .send(updatedVehicle)
      .expect(200);

    assert.equal(response.body.id, vehicle.id);
    assert.equal(response.body.chassi, updatedVehicle.chassi);
  });

  it('should throw a 409 error if it tries to update a vehicle "chassi" field that already exists', async () => {
    const vehicleData = vehicleMock();
    const vehicleWithAChassiThatExists = vehicleMock();

    const [vehicle] = await Promise.all([
      createVehicle(vehicleData),
      createVehicle(vehicleWithAChassiThatExists),
    ]);

    const updatedVehicle = {
      ...vehicleData,
      chassi: vehicleWithAChassiThatExists.chassi,
    };

    const response = await supertest(app.server)
      .put(`/vehicles/${vehicle.id}`)
      .send(updatedVehicle)
      .expect(409);

    assert.equal(response.body.code, "CHASSI_ALREADY_EXISTS");
  });

  it('should update a vehicle "renavam" field', async () => {
    const vehicleData = vehicleMock();
    const vehicle = await createVehicle(vehicleData);

    const updatedVehicle = {
      ...vehicleData,
      renavam: faker.number.int({ min: 100000000, max: 99999999999 }),
    };

    const response = await supertest(app.server)
      .put(`/vehicles/${vehicle.id}`)
      .send(updatedVehicle)
      .expect(200);

    assert.equal(response.body.id, vehicle.id);
    assert.equal(response.body.renavam, updatedVehicle.renavam);
  });

  it('should throw a 409 error if it tries to update a vehicle "renavam" field that already exists', async () => {
    const vehicleData = vehicleMock();
    const vehicleWithARenavamThatExists = vehicleMock();

    const [vehicle] = await Promise.all([
      createVehicle(vehicleData),
      createVehicle(vehicleWithARenavamThatExists),
    ]);

    const updatedVehicle = {
      ...vehicleData,
      renavam: vehicleWithARenavamThatExists.renavam,
    };

    const response = await supertest(app.server)
      .put(`/vehicles/${vehicle.id}`)
      .send(updatedVehicle)
      .expect(409);

    assert.equal(response.body.code, "RENAVAM_ALREADY_EXISTS");
  });

  it("should throw a 404 error if the vehicle does not exist", async () => {
    const vehicleData = vehicleMock();

    const vehicleIdThatDoesNotExist = faker.number.int({
      min: 10000,
      max: 20000,
    });

    const response = await supertest(app.server)
      .put(`/vehicles/${vehicleIdThatDoesNotExist}`)
      .send(vehicleData)
      .expect(404);

    assert.equal(response.body.code, "VEHICLE_DOES_NOT_EXIST");
  });
});
