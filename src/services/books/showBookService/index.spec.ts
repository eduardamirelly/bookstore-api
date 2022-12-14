import request from 'supertest';

import app from "../../../server";

test("it should be possible to show the fields book...", async () => {
  const responseBookCreated = await request(app).post("/books").send({
    title: 'Title example 3',
    description: 'Description example 3',
    author: 'Author example 3',
    price: 25.00,
    cover: 'Cover example 3'
  });

  expect(responseBookCreated.statusCode).toBe(201);

  const response = await request(app).get(`/books/${responseBookCreated.body.id}`).send();

  expect(response.statusCode).toBe(200);
})

test("it shouldn't be possible to show the fields of a book that don't exists...", async () => {
  const response = await request(app).get(`/books/1`).send();

  expect(response.statusCode).toBe(400);
})
