import request from 'supertest';

import app from "../../../server";

test("it should be possible to show all the categories...", async () => {
  const response = await request(app).get('/categories').send();

  expect(response.statusCode).toBe(200);
})
