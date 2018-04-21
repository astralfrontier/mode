const blessed = require('blessed')

exports.createScreen = (client, inputHandler) => {
    var screen = blessed.screen({
        smartCSR: true,
        input: client || process.stdin,
        output: client || process.stdout,
        terminal: 'xterm-256color',
        fullUnicode: true
    })

    screen.key([
        'C-c', 'q'
    ], (ch, key) => {
        screen.destroy()
    })

    screen.key('i', (key) => {
        screen
            .data
            .main
            .add('Text')
    })

    screen.on('destroy', () => {
        if (client && client.writable) {
            client.destroy()
        }
    })

    var body = blessed.box({
        top: 0,
        left: 0,
        height: '100%-1',
        width: '100%',
        keys: true,
        mouse: true,
        alwaysScroll: true,
        scrollable: true,
        scrollbar: {
            ch: ' ',
            bg: 'red'
        }
    })

    var inputBar = blessed.textbox({
        bottom: 0,
        left: 0,
        height: 1,
        width: '100%',
        keys: true,
        mouse: true,
        inputOnFocus: true,
        style: {
            fg: 'white',
            bg: 'blue' // Blue background so you see this is different from body
        }
    })

    // Add body to blessed screen
    screen.append(body)
    screen.append(inputBar)

    const appendText = (text) => {
        body.pushLine(text)
        screen.render()
    }

    inputBar.on('submit', (text) => {
        appendText(`> ${text}`)
        appendText(inputHandler(text))
        inputBar.clearValue()
    })

    screen.key('enter', (ch, key) => {
        inputBar.focus();
    })

    screen.render()

    return screen
}