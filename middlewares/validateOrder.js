import getLogger from 'pino'
import { VALIDATOR_URL } from '../config.js'

async function handler(req, res) {

  const logger = getLogger({ msgPrefix: '[validateOrder] ' })

  const response = await fetch(VALIDATOR_URL, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req.body.record),
  });

  const { isValid, order, error } = await response.json()

  if (!isValid) {
    logger.error('Error during order validation', error)
    res.send(400, error)
    throw new Error('invalid order')
  }
 
  req.order = order
}

export default handler
