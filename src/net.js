const blessed = require('blessed')
const telnet = require('telnet2')
const logger = require('./log')

exports.startServer = (port) => {
    logger.info({port}, `net.startServer: starting`)

    telnet({ tty: true }, (client) => {
        client.on('term', (terminal) => {
            screen.terminal = terminal
            screen.render()
        })
    
        client.on('size', (width, height) => {
            client.columns = width
            client.rows = height
            client.emit('resize')
        })
    
        var screen = blessed.screen({
            smartCSR: true,
            input: client,
            output: client,
            terminal: 'xterm-256color',
            fullUnicode: true
        })
    
        client.on('close', () => {
            if (!screen.destroyed) {
                screen.destroy()
            }
        })
    
        screen.key(['C-c', 'q'], (ch, key) => {
            screen.destroy()
        })
    
        screen.on('destroy', () => {
            if (client.writable) {
                client.destroy()
            }
        })
    
        screen.data.main = blessed.box({
            parent: screen,
            left: 'center',
            top: 'center',
            width: '80%',
            height: '90%',
            border: 'line',
            content: 'Welcome to my server. Here is your own private session.'
          })
        
          screen.render()
    }).listen(port)
}
