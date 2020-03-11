let data = require( "./testData/data.json" );

// data = {
//     'test': {
//         'test2': 11,
//         'test3': 123,
//         'test4': {
//             'test5': 11
//         }
//     }
// }

function finder( o, strToFind, change = 0 ) {
    for ( let i in o ) {
        let share = o[ i ];
        if ( typeof share == 'object' ) {
            finder( share, strToFind, change );
        } else if ( share == strToFind ) {
            if ( change != 0 ) {
                // console.log( {'O': o.Value}, change )
                o.Value = 13
            }
            // console.log( o.Value, change )
            return finder( data.Result.Blocks, o.Id, 1 )
        }
    }
};

let test = finder( data.Result.MetadataOfBlocks, 'osagoPolisIdTag' );

console.log( 'test', data.Result.Blocks[3].Lines[0] )
