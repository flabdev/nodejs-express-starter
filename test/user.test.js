const { expect } = require('chai');
const request = require('supertest');
const mongoose = require('mongoose');
const User = require('../models/userModel');
const app = require('../server');
const config = require('../config/index');

let userId = '';

describe('api/v1users', () => {
  before(async () => {
    await User.deleteMany({});
  });

  after(async () => {
    mongoose.disconnect();
  });

  it('should connect and disconnect to mongodb', async () => {
    // console.log(mongoose.connection.states);
    mongoose.disconnect();
    mongoose.connection.on('disconnected', () => {
      expect(mongoose.connection.readyState).to.equal(0);
    });
    mongoose.connection.on('connected', () => {
      expect(mongoose.connection.readyState).to.equal(1);
    });
    mongoose.connection.on('error', () => {
      expect(mongoose.connection.readyState).to.equal(99);
    });

    await mongoose.connect(config.Database.URI);
  });

  describe('GET /', () => {
    it('should return all users', async () => {
      const users = [
        { name: 'george', email: 'geo@gmail.com', country: 'romania' },
        { name: 'maria', email: 'maria@gmail.com', country: 'spain' },
      ];

      await User.insertMany(users);
      const res = await request(app).get('/api/v1/users');
      expect(res.status).to.equal(200);
    });
  });

  describe('GET/:id', () => {
    it('should return a user if valid id is passed', async () => {
      const user = new User({
        name: 'florian',
        email: 'florian@gmail.com',
        country: 'germany',
      });
      await user.save();

      const res = await request(app).get(`/api/v1/users/${user._id}`);
      expect(res.status).to.equal(200);
      expect(res.body.data).to.have.property('name', user.name);
    });

    it('should return 400 error when invalid object id is passed', async () => {
      const res = await request(app).get('/api/v1/users/1');
      expect(res.status).to.equal(500);
    });

    it('should return 404 error when valid object id is passed but does not exist', async () => {
      const res = await request(app).get(
        '/api/v1/users/5f43ef20c1d4a133e4628181',
      );
      expect(res.status).to.equal(404);
    });
  });

  describe('POST /', () => {
    const email = 'esteve@gmail.com';
    it('should return user when the all request body is valid', async () => {
      const res = await request(app)
        .post('/api/v1/users')
        .send({
          name: 'esteve',
          email: `${email}`,
          country: 'spain',
        });
      const { data } = res.body;

      expect(res.status).to.equal(200);
      expect(data).to.have.property('_id');
      expect(data).to.have.property('name', 'esteve');
      expect(data).to.have.property('email', `${email}`);
      expect(data).to.have.property('country', 'spain');
      expect(data.name).to.have.length.within(3, 50);
      expect(data.email).to.have.length.within(5, 255);

      const user = await User.findOne({ email: `${email}` });
      expect(user.name).to.equal('esteve');
      expect(user.email).to.equal(`${email}`);
    });
  });

  describe('PATCH /:id', () => {
    it('should update the existing user and return 200', async () => {
      const user = new User({
        name: 'lola',
        email: 'lola@gmail.com',
        country: 'spain',
      });
      await user.save();

      const res = await request(app).patch(`/api/v1/users/${user._id}`).send({
        name: 'juan',
        email: 'juan@gmail.com',
        country: 'spain',
      });

      expect(res.status).to.equal(200);
      expect(res.body.data).to.have.property('name', 'juan');
      expect(res.body.data).to.have.property('email', 'juan@gmail.com');
      expect(res.body.data).to.have.property('country', 'spain');
    });
  });

  describe('DELETE /:id', () => {
    it('should delete requested id and return response 200', async () => {
      const user = new User({
        name: 'george',
        email: 'juan11@gmail.com',
        country: 'spain',
      });
      await user.save();
      userId = user._id;
      const res = await request(app).delete(`/api/v1/users/${userId}`);

      expect(res.status).to.be.equal(204);
    });

    it('should return 404 when deleted user is requested', async () => {
      const res = await request(app).get(`/api/v1/users/${userId}`);
      expect(res.status).to.be.equal(404);
    });
  });
});
