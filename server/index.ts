import fastify from 'fastify';
import cors from '@fastify/cors'
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';

import { createContext } from './context';
import { appRouter } from './router';

const server = fastify({
  maxParamLength: 5000,
  logger: {
    level: 'info',
    file: '/Users/chenpeng/Downloads/mylogs.txt'
  }
});

server.register(
  cors,
  {
    origin: [
      'http://localhost:1420',
      'tauri://localhost'
    ],
  }
);

server.register(fastifyTRPCPlugin, {
  prefix: '/api',
  trpcOptions: { router: appRouter, createContext },
});

(async () => {
  try {
    const info = await server.listen({ port: 3000 }, (err) => {
      server.log.error('错误', err);
    });
    server.log.error(info);
  } catch (err) {
    console.log('报错', err)
    server.log.error(err);
    // process.exit(1);
  }
})();
