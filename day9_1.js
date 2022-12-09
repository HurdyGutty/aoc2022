const {readFileSync, promises: fsPromises} = require('fs');

    const file = './rope.txt';

    function syncReadFile(filename) {
            const contents = readFileSync(filename, 'utf-8');
        
            const arr = contents.split(/\r?\n/);        
            return arr;
          
    }

    const arr_read = syncReadFile(file);
    let H = {x:0, y:0};
    let T = {x:0, y:0};
    let count_

    function compare_position(H, T){
        if (H.y == T.y && H.x == T.x + 2){
            T.x += 1;

        }
    }