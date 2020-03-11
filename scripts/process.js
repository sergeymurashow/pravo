const _ = require('lodash');
const moment = require('moment');
// const connection = require('../config/default.json').connection;

module.exports = async (params) => {
    console.log( 'PROCESS', params)
    return;
    runProcess(params).catch((err) => {console.log(err)});
    async function runProcess(params) {
        var name = `${params.processName} ${moment().format('DD.MM.YY HH:mm')}`
        console.log(name);
        try {
            let script = require(`${__dirname}/${params.processName}`);
            let result = await script(params);
            await processComplete(params.process.id, 2, JSON.stringify(result));
        } catch (e) {
            if (e.response) {
                console.log(e.response.data)
                processComplete(params.process.id, 3, e.response.data)
            }
            else {
                console.log(e.stack)
                processComplete(params.process.id, 3, e.stack)
            }
            
        }
        async function processComplete(processId, resultStatus, resultStr) {  
            console.log('processComplete', moment().format('DD.MM.YY HH:mm'))

        }
    }
}


