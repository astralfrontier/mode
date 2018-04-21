const {VM} = require('vm2')
const logger = require('./log')

const vm = new VM()

exports.runScript = (script) => {
    logger.info({script}, 'vm.runScript: starting')
    const rc = vm.run(script)
    logger.info({script}, `vm.runScript: finished with value ${rc}`)
    return rc
}