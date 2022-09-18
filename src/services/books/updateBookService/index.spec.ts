import request from 'supertest';

import app from "../../../server";

test("it should be possible to update the fields book, like price for example...", async () => {
  const responseBookCreated = await request(app).post("/books").send({
    title: 'Title example 2',
    description: 'Description example 2',
    author: 'Author example 2',
    price: 25.00,
    cover: 'Cover example 2'
  })

  expect(responseBookCreated.statusCode).toBe(201);

  const response = await request(app).put(`/books/${responseBookCreated.body.id}`).send({
    price: 25.50,
  })

  expect(response.statusCode).toBe(200);
})

test("it shouldn't be possible to update the fields book, like price for example, when the book don't exists...", async () => {
  const response = await request(app).put(`/books/1`).send({
    price: 25.50,
  })

  expect(response.statusCode).toBe(400);
})

