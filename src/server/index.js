import 'dotenv/config';
import fastify from 'fastify';
import fastifycors from 'fastify-cors';
import fetch from 'node-fetch';
import Api from './../api/index.js';

const app = fastify({ logger: true });

// Fix cors
app.register(fastifycors, {
  origin: (origin, cb) => {
    const hostname = new URL(origin).hostname;
    if (hostname === 'localhost') {
      //  Request from localhost will pass
      cb(null, true);
      return;
    }
    // Generate an error on other origins, disabling access
    cb(new Error('Not allowed'));
  },
});

// Declare a route
app.get('/', async (request, reply) => {
  return { hello: 'world' };
});

// Add lastfm map
app.route({
  method: 'GET',
  url: '/lastfm/',
  // this function is executed for every request before the handler is executed
  preHandler: async (request, reply) => {
    console.log(request.query);
  },
  handler: async (request, reply) => {
    if (!request.query) {
      return 'no params';
    }

    try {
      const url = Api.getLastfmUrl({ ...request.query });
      const response = await fetch(url);
      const json = await response.json();

      console.log('///////////////////////////////////');
      console.log(url);
      console.log('///////////////////////////////////');
      console.log(response);
      console.log('///////////////////////////////////');
      console.log(json);
      console.log('///////////////////////////////////');

      return json;
    } catch (err) {
      console.log(err);
      return 'error';
    }
  },
});

// Run the server!
const start = async () => {
  try {
    await app.listen(3000);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
