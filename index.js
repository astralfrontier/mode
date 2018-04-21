const net = require('./src/net')
const vm = require('./src/vm')

const value = vm.runScript('2+2')

net.startServer(8888)