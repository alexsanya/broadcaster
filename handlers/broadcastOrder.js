const handler = io => async (req, res) => {
  io.emit('order', req.order)
  res.send(200)
}

export default io => handler(io)
