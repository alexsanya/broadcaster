import getLogger from 'pino'
import restify from 'restify'
import createLogger from 'restify-pino-logger'
import { Server } from 'socket.io'
import { PORT } from './config.js'
import validateOrder from './middlewares/validateOrder.js'
import broadcastOrder from './handlers/broadcastOrder.js'

const server = restify.createServer({name: 'broadcaster'})
const pino = createLogger()
const logger = getLogger()

function run() {

  server.use(pino)
  server.use(restify.plugins.bodyParser())

  const io = new Server(server, {
    // options
  });

  server.post(
    '/order',
    validateOrder,
    broadcastOrder(io)
  );

  io.on("connection", () => {
    const count = io.engine.clientsCount;
    logger.info('New client connected. Total number of clients: %s', count);
  });

  server.listen(PORT, function() {
    logger.info('%s listening at %s', server.name, server.url);
  });
}

run()
