import request from 'supertest';

import app from "../../../server";

test("it should be possible to update the name field of one category...", async () => {
  const responseCategoryCreated = await request(app).post("/categories").send({
    name: 'Category',
  })

  expect(responseCategoryCreated.statusCode).toBe(201);

  const response = await request(app).put(`/categories/${responseCategoryCreated.body.id}`).send({
    name: 'Category Test',
  });

  expect(response.statusCode).toBe(200);
})

test("it shouldn't be possible to update the name field of one category, when the category don't exists...", async () => {
  const response = await request(app).put(`/categories/1`).send({
    name: 'Category example',
  });

  expect(response.statusCode).toBe(400);
})

