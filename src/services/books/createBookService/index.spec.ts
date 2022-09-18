import request from 'supertest';

import app from "../../../server";

test("it should be possible to create a book...", async () => {
  const response = await request(app).post("/books").send({
    title: 'A hipótese do amor 2',
    description: 'Alguma coisa 2',
    author: 'Alguém 2',
    price: 25.00,
    cover: 'cover',
    isFavorite: false,
  })

  expect(response.statusCode).toBe(201);
})

test("it shouldn't be possible to create a book if a missing required fields, like author for example...", async () => {
  const response = await request(app).post("/books").send({
    title: 'A hipótese do amor 2',
    description: 'Alguma coisa 2',
    price: 25.00,
    cover: 'cover',
    isFavorite: false,
  })

  expect(response.statusCode).toBe(400);
})
