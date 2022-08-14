import request from 'supertest';
import app from '../src/app';
import { describe, expect, test, jest, beforeAll, beforeEach, afterAll, afterEach } from '@jest/globals';

// beforeAll(async () => {});

// beforeEach(async () => {});

// afterAll(async () => {});

// afterEach(async () => {
// });

// Test route for adding contacts
describe('POST /', () => {
  describe('given JWT is missing', () => {
    test('should respond with a 403 status code and the correct error message', async () => {
      const response = await request(app).post('/');
      expect(response.statusCode).toBe(403);
      expect(response.body.message).toBe('A token is required for authentication');
    });
  });
  describe('given JWT is invalid', () => {
    test('should respond with a 401 status code and the correct error message', async () => {
      const response = await request(app).post('/api/addressBook').send({
        token: '123456'
      });
      expect(response.statusCode).toBe(401);
      expect(response.body.message).toBe('Invalid token');
    });
  });
});
