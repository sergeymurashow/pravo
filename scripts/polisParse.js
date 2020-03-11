const _ = require( "lodash" );
const moment = require( "moment" );
const ExcellParse = require( "read-excel-file/node" );
const Axios = require( "axios" );
const Path = require( 'path' );
const Fs = require( 'fs' );
const Os = require( 'os' );

let path = Path.resolve( __dirname + `/testData/`)

function parse ( file ) {
    ExcellParse( file ).then( (rows) => {
        let titles = rows[0];
        let data = rows.slice(1);
        let sortedData = [];
        let j = 0;
        data = data.map( n => {
            let tmp = {};
            for ( let i in n ) {
                tmp[ titles[ i ] ] = n[ i ];
            }
            return tmp;
        });
        console.log( data )
})};

parse( path + `/test.xlsx` )