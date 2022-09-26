import request from 'supertest';

import app from "../../../server";

test("it should be possible to show all the books...", async () => {
  const response = await request(app).get('/books').send();

  expect(response.statusCode).toBe(200);
})
