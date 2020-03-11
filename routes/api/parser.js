const _ = require('lodash');
const moment = require('moment');
var process = require('../../scripts/process')
// const parse = require('co-body');

exports.post = async function (ctx, next) {
    let data = ctx.request.body; //await parse( ctx );
    console.log( data );
    // process({
    //     processName: 'parser',
    //     body: ctx.request.body
    // });
    ctx.body = data
};
