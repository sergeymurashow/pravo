const _ = require( "lodash" );
const moment = require( "moment" );
const ExcellParse = require( "read-excel-file/node" );
const Axios = require( "axios" );
const input = require( "../data/input.json" )
const Path = require( 'path' );
const Fs = require( 'fs' );
const Os = require( 'os' );


module.exports = async ( params ) => {
    console.log( 'params', params )
    return;
    params = params.body.payload;



    let dir = Path.resolve( __dirname, '../tmp' )
    let arr = [];


    async function downloadFiles( files ) {
        console.log( 'files', files )
        for ( let file of files ) {
            let url = file.url;
            let path = `${ dir }/${
                file.title
            }`
            // console.log( path )
            let writer = Fs.createWriteStream( path );
            const response = await Axios( { url, method: 'GET', responseType: 'stream' } ).then( async function ( response ) {
                response.data.pipe( writer );
                writer.on( 'finish', () => ( parse( { 'path': path, 'point': file.point, 'count': files.length } ) ) );
            } );
        };

    };

    function parse( toParse ) {
        console.log( 'parsed', toParse )
        ExcellParse( toParse.path ).then( ( rows ) => {
            rows = _.filter( rows, ( n => {
                return !isNaN( n[ 0 ] )
            } ) );
            rows = _.map( rows, n => {
                return {
                    'point': toParse.point,
                    'number': n[0],
                    'art': n[1],
                    'name': `${
                        n[ 2 ]
                    } `,
                    'count': n[ 5 ]
                }
            } );
            let text = _.map( rows, n => {
                return `${
                    n.name
                } ${
                    n.count
                }`
            } );

            function storeCollection( positions ) {
                let uniqPos = _.uniqBy( positions, 'art' );
                for ( let pos of uniqPos ) {
                    pos.count = _.filter( positions, n => {
                        return n.art == pos.art;
                    } ).reduce( ( summ, iter ) => {
                        return summ + + iter.count
                    }, 0 )
                };
                return uniqPos;
            };

            store = storeCollection( rows );
            text = [ toParse.point ].concat( store )
            sendText( store, toParse.count )
        } );
        Fs.unlinkSync( toParse.path )
    }

    function sendText( text, count ) {
        arr.push( text );
        if ( arr.length == count ) {
            let tmp = new Array();
            let group = _.groupBy( _.flatten( arr ), 'point' );
            // console.log( arr )
            for ( let i in group ) {
                let mapped = group[ i ].map( n => {
                    return n.name
                } ); // End of Map
                tmp.push( `${ i } `, `${ mapped }
            ` );
            }; // End of For
            text = _.toString( tmp ).replace( / ,/g, '\n' )
            // console.log(
            //     tmp
            // )
            sendData( ids, text, arr );
        };

    }
    function sendData( catRec, textToSend = '', array = '' ) {
        console.log( catRec, textToSend, array )
    };

};

// module.exports( input )
