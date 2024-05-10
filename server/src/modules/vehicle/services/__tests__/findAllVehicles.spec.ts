import request from "supertest";
import assert from "assert";
import app from "../../../../app";
import { vehicleMock, cleanUpVehicles } from "../../../../../test/vehicle";
import { createVehicle } from "./../createVehicle.service";

describe("Find All Vehicles - GET /vehicles", () => {
  before(async () => {
    await cleanUpVehicles();
  });

  it("should return an empty array if no vehicles found", async () => {
    // Assuming there are no vehicles in the database
    const response = await request(app.server)
      .get("/vehicles")
      .query({ page: 1, pageSize: 10 })
      .expect(200);
    assert.deepStrictEqual(response.body.data, []);
  });

  it("should return all vehicles", async () => {
    await Promise.all([
      createVehicle(vehicleMock()),
      createVehicle(vehicleMock()),
      createVehicle(vehicleMock()),
      createVehicle(vehicleMock()),
      createVehicle(vehicleMock())
    ]);

    const response = await request(app.server)
      .get("/vehicles")
      .query({ page: 1, pageSize: 5 })
      .expect(200);
    assert.equal(response.body.total, 5);
  });
});
