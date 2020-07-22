const {localServer} = require("./server.js")

const PORT = "3001";

const server = localServer();

server.listen(PORT, function () {
  console.log(`🚀 Server ready at ${PORT}`);
});

// server.listen().then(({ url })=>{
//   console.log(`Server ready at ${ url }`)
// })