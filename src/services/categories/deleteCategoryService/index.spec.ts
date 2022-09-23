import request from 'supertest';

import app from "../../../server";

test("it should be possible to delete a category...", async () => {
  const responseCategoryCreated = await request(app).post("/categories").send({
    name: 'Category example delete'
  });

  expect(responseCategoryCreated.statusCode).toBe(201);

  const response = await request(app).delete(`/categories/${responseCategoryCreated.body.id}`).send();

  expect(response.statusCode).toBe(204);
})

test("it shouldn't be possible to delete a category that don't exists...", async () => {
  const response = await request(app).delete(`/categories/1`).send();

  expect(response.statusCode).toBe(400);
})
