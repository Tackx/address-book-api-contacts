import request from 'supertest';
import app from '../src/app';
import { ContactsService } from '../src/services/contacts.service';
import * as auth from '../src/middleware/auth';
import { Request, Response, NextFunction } from 'express';
import { describe, expect, test, jest, beforeAll, beforeEach, afterAll, afterEach } from '@jest/globals';
import { User } from '../src/interfaces/user.interface';
import { Contact } from '../src/interfaces/contact.interface';

jest.mock('../src/services/contacts.service');
jest.mock('../src/middleware/auth');

// Mock ContactsService
jest.spyOn(ContactsService, 'create').mockImplementation((user: User, contact: Contact): any => {
  return 'Saved contact mock';
});

// Mock user auth middleware
jest.spyOn(auth, 'validateToken').mockImplementation((req: Request, res: Response, next: NextFunction) => {
  // console.log('Auth middleware called');
  next();
});

// Test user object which is not being validated as the ContactsService.create method is mocked, just needs to be present as it is used as an arg for the method
const testUser = {
  email: 'test@test.com'
};

// Test contact which is being validated on its format by the validateUser middleware function
const testContact = {
  firstName: 'Test First Name',
  lastName: 'Test Last Name',
  address: 'Test Adress',
  phone: 123456
};

// beforeAll(async () => {});

// beforeEach(async () => {});

// afterAll(async () => {});

afterEach(async () => {
  jest.clearAllMocks();
});

// Test route for adding contacts
describe('POST /', () => {
  test('should specify JSON in the content type header', async () => {
    const response = await request(app)
      .post('/')
      .set('user', JSON.stringify(testUser))
      .send({
        contact: {
          firstName: 'Test First Name',
          lastName: 'Test Last Name',
          address: 'Test Adress',
          phone: 123456
        }
      });
    expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
  });
  describe('given contact information in correct format', () => {
    test('should respond with a 201 status code', async () => {
      const response = await request(app)
        .post('/')
        // Add a user header so that ContactsService is called with the user as one of the params
        .set('user', JSON.stringify(testUser))
        .send({
          contact: testContact
        });
      expect(response.statusCode).toBe(201);
    });
    test('should call the ContactsService.create method once', async () => {
      await request(app)
        .post('/')
        // Add a user header so that ContactsService is called with the user as one of the params
        .set('user', JSON.stringify(testUser))
        .send({
          contact: testContact
        });
      expect(ContactsService.create).toHaveBeenCalledTimes(1);
    });
    test('response contains a success message and the saved contact property', async () => {
      const response = await request(app).post('/').set('user', JSON.stringify(testUser)).send({
        contact: testContact
      });
      expect(response.body.message).toBe('Contact added to the contact list.');
      expect(response.body.savedContact).toBeDefined();
    });
  });

  describe('given all contact information is missing', () => {
    test('should respond with a 400 status code and the correct error message', async () => {
      const response = await request(app)
        .post('/')
        // Add a user header so that ContactsService is called with the user as one of the params
        .set('user', JSON.stringify(testUser));
      expect(response.body['Error message']).toBe('"contact" is required');
      expect(response.statusCode).toBe(400);
    });
  });

  describe('given some contact information is missing', () => {
    test('should respond with a 400 status code and the correct error message', async () => {
      const response = await request(app)
        .post('/')
        // Add a user header so that ContactsService is called with the user as one of the params
        .set('user', JSON.stringify(testUser))
        .send({
          // All required properties except firstName are missing, lastName is the next thing checked
          contact: {
            firstName: 'Test'
          }
        });
      expect(response.body['Error message']).toBe('"contact.lastName" is required');
      expect(response.statusCode).toBe(400);
    });
  });

  describe('given some contact information is in incorrect format', () => {
    test('should respond with a 400 status code and the correct error message', async () => {
      const response = await request(app)
        .post('/')
        // Add a user header so that ContactsService is called with the user as one of the params
        .set('user', JSON.stringify(testUser))
        .send({
          // All required properties except firstName are missing, lastName is the next thing checked
          contact: {
            firstName: 123
          }
        });
      expect(response.body['Error message']).toBe('"contact.firstName" must be a string');
      expect(response.statusCode).toBe(400);
    });
  });
});
