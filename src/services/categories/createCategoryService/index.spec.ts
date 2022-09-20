import request from 'supertest';

import app from "../../../server";

test("it should be possible to create a category...", async () => {
  const response = await request(app).post("/categories").send({
    name: 'Category example',
  })

  expect(response.statusCode).toBe(201);
})

test("it shouldn't be possible to create a category if a missing name field...", async () => {
  const response = await request(app).post("/categories").send();

  expect(response.statusCode).toBe(400);
})
