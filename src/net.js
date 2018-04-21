const telnet = require('telnet2')
const logger = require('./log')
const screen = require('./screen')

exports.startServer = (port, inputHandler) => {
    logger.info({port}, `net.startServer: starting`)

    telnet({ tty: true }, (client) => {
        var scr = screen.createScreen(client, inputHandler)

        client.on('term', (terminal) => {
            scr.terminal = terminal
            scr.render()
        })
    
        client.on('size', (width, height) => {
            client.columns = width
            client.rows = height
            client.emit('resize')
        })
  
        client.on('close', () => {
            if (!scr.destroyed) {
                scr.destroy()
            }
        })
    }).listen(port)
}
