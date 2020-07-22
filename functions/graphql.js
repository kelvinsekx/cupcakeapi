const {productionServer} = require("./bundle/server.js")

const server = productionServer()

exports.handler = server.createHandler({
    cors: {
        origin: '*'
      }
})