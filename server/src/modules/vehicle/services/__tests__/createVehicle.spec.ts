import assert from "node:assert";
import supertest from "supertest";
import app from "../../../../app";
import { faker } from "@faker-js/faker";
import { createVehicle } from "../createVehicle.service";
import { vehicleMock, vehiclePlateMock } from "../../../../../test/vehicle";

describe("Create Vehicle - POST /vehicles", () => {
  before(async () => {
    await app.ready();
  });

  it("should create a vehicle", async () => {
    const data = vehicleMock();

    const response = await supertest(app.server)
      .post("/vehicles")
      .send(data)
      .expect(201);

    assert.equal(response.body.placa, data.placa);
    assert.equal(response.body.chassi, data.chassi);
    assert.equal(response.body.renavam, data.renavam);
    assert.equal(response.body.modelo, data.modelo);
    assert.equal(response.body.marca, data.marca);
    assert.equal(response.body.ano, data.ano);
  });

  it('should throw a validation error if the "placa" is invalid', async () => {
    const response = await supertest(app.server)
      .post("/vehicles")
      .send({ ...vehicleMock(), placa: "invalid" })
      .expect(422);

    assert.equal(response.body.message, "Validation error");
    assert.equal(response.body.errors[0].message, "Invalid input");
    assert.equal(response.body.errors[0].path[0], "placa");
  });

  it('should throw a validation error if the "chassi" is invalid', async () => {
    const response = await supertest(app.server)
      .post("/vehicles")
      .send({ ...vehicleMock(), chassi: "invalid" })
      .expect(422);

    assert.equal(response.body.message, "Validation error");
    assert.equal(
      response.body.errors[0].message,
      "String must contain exactly 17 character(s)"
    );
    assert.equal(response.body.errors[0].path[0], "chassi");
  });

  it('should throw a validation error if the "renavam" is too small', async () => {
    const response = await supertest(app.server)
      .post("/vehicles")
      .send({ ...vehicleMock(), renavam: 10000000 })
      .expect(422);

    assert.equal(response.body.message, "Validation error");
    assert.equal(
      response.body.errors[0].message,
      "Number must be greater than or equal to 100000000"
    );
    assert.equal(response.body.errors[0].path[0], "renavam");
  });

  it('should throw a validation error if the "renavam" is too large', async () => {
    const response = await supertest(app.server)
      .post("/vehicles")
      .send({ ...vehicleMock(), renavam: 100000000000 })
      .expect(422);

    assert.equal(response.body.message, "Validation error");
    assert.equal(
      response.body.errors[0].message,
      "Number must be less than or equal to 99999999999"
    );
    assert.equal(response.body.errors[0].path[0], "renavam");
  });

  it('should throw a 409 error if the "placa" already exists', async () => {
    const vehicleThatExists = vehicleMock();
    await createVehicle(vehicleThatExists);

    const response = await supertest(app.server)
      .post("/vehicles")
      .send(vehicleThatExists)
      .expect(409);

    assert.equal(response.body.code, "PLACA_ALREADY_EXISTS");
  });

  it('should throw a 409 error if the "chassi" already exists', async () => {
    const vehicleThatExists = vehicleMock();
    await createVehicle(vehicleThatExists);

    const response = await supertest(app.server)
      .post("/vehicles")
      .send({ ...vehicleThatExists, placa: vehiclePlateMock() })
      .expect(409);

    assert.equal(response.body.code, "CHASSI_ALREADY_EXISTS");
  });

  it('should throw a 409 error if the "renavam" already exists', async () => {
    const vehicleThatExists = vehicleMock();
    await createVehicle(vehicleThatExists);

    const response = await supertest(app.server)
      .post("/vehicles")
      .send({
        ...vehicleThatExists,
        placa: vehiclePlateMock(),
        chassi: faker.vehicle.vin()
      })
      .expect(409);

    assert.equal(response.body.code, "RENAVAM_ALREADY_EXISTS");
  });
});
