const blessed = require('blessed')

exports.createScreen = (client) => {
    var screen = blessed.screen({
        smartCSR: true,
        input: client || process.stdin,
        output: client || process.stdout,
        terminal: 'xterm-256color',
        fullUnicode: true
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
        width: '80%',
        height: '90%',
        border: 'line',
        content: 'Welcome to my server. Here is your own private session.'
    })

    screen.render()

    return screen
}