const net = require('./src/net')
const screen = require('./src/screen')
const vm = require('./src/vm')

const value = vm.runScript('2+2')

screen.createScreen()
// net.startServer(8888)