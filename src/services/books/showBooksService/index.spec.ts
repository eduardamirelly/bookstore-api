import request from 'supertest';

import app from "../../../server";

test("it should be possible to show all the books...", async () => {
  const response = await request(app).get('/books').send();

  expect(response.statusCode).toBe(200);
})

test("it should be possible to filter using query params and show the books...", async () => {
  const responseFilterCategory = await request(app).get('/books/?category=Romance').send();
  expect(responseFilterCategory.statusCode).toBe(200);

  const responseFilterSort = await request(app).get('/books/?sort=asc').send();
  expect(responseFilterSort.statusCode).toBe(200);

  const responseFilterSearch = await request(app).get('/books/?search=example').send();
  expect(responseFilterSearch.statusCode).toBe(200);

  const responseFilterisInTreding = await request(app).get('/books/?isInTreding=true').send();
  expect(responseFilterisInTreding.statusCode).toBe(200);

  const responseAllFilter = await request(app).get('/books/?search=example&sort=asc&category=Romance&isInTreding=true').send();
  expect(responseAllFilter.statusCode).toBe(200);
})
