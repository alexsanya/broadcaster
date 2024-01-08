async function handler(req, res) {
  req.order = { foo: 'bar' }
}

export default handler
