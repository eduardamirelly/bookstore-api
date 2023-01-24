import request from 'supertest';

import app from "../../../server";

test("it should be possible to create a book...", async () => {
  const response = await request(app).post("/books").send({
    title: 'Title example',
    description: 'Description example',
    author: 'Author example',
    price: 25.00,
    cover: 'Cover example',
    isInTrending: true,
  });

  expect(response.statusCode).toBe(201);
})

test("it should be possible to create a book with categories...", async () => {
  const responseCategoryCreated = await request(app).post("/categories").send({
    name: "Romance",
  });

  expect(responseCategoryCreated.statusCode).toBe(201);

  const responseBookCreated = await request(app).post("/books").send({
    title: 'Title example',
    description: 'Description example',
    author: 'Author example',
    price: 25.00,
    cover: 'Cover example',
    categories: ["Romance"]
  });

  expect(responseBookCreated.statusCode).toBe(201);
})

test("it shouldn't be possible to create a book if a missing required fields, like author for example...", async () => {
  const response = await request(app).post("/books").send({
    title: 'Title example',
    description: 'Description example',
    price: 25.00,
    cover: 'Cover example'
  });

  expect(response.statusCode).toBe(400);
})
