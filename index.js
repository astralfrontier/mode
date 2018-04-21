const net = require('./src/net')
const screen = require('./src/screen')
const vm = require('./src/vm')

const vmeval = (text) => {
    try {
        const rc = vm.runScript(text)
        return JSON.stringify(rc, null, 2)
    } catch (err) {
        return err.toString()
    }
}

// screen.createScreen(null, (text) => vm.runScript(text))
net.startServer(8888, (text) => vmeval(text))