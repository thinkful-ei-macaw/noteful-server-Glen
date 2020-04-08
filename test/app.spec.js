const app = require('../src/app');
const validateBearerToken = require('../src/validateBearerToken')



describe('App', () => {

  it('GET / responds with 200 containing "Hello, world!"', () => {
    return supertest(app)
      .get('/')
      .expect(200, 'Hello, world!');
  });


});