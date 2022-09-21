import request from 'supertest';

import app from "../../../server";

test("it should be possible to delete a book...", async () => {
  const responseBookCreated = await request(app).post("/books").send({
    title: 'Title example 4',
    description: 'Description example 4',
    author: 'Author example 4',
    price: 25.00,
    cover: 'Cover example 4'
  });

  expect(responseBookCreated.statusCode).toBe(201);

  const response = await request(app).delete(`/books/${responseBookCreated.body.id}`).send();

  expect(response.statusCode).toBe(204);
})

test("it shouldn't be possible to delete a book that don't exists...", async () => {
  const response = await request(app).delete(`/books/1`).send();

  expect(response.statusCode).toBe(400);
})
