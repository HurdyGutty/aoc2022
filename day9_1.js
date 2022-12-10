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
    let arr_position = [];

    function compare_position(){
        let x_compare = T.x - H.x;
        let y_compare = T.y - H.y;

       if (Math.abs(Math.sign(x_compare) * Math.floor(Math.abs(x_compare / 2))) == 1) {
            T.x -= Math.floor(x_compare / 2);
            T.y = H.y;
       }
       if (Math.abs(Math.sign(y_compare) * Math.floor(Math.abs(y_compare / 2))) == 1) {
            T.y -= Math.floor(y_compare / 2);
            T.x = H.x;
       }
    }

    function position_check(){
        if (typeof arr_position.find(element => (element[0] == T.x && element[1] == T.y)) === 'undefined'){
            arr_position.push([T.x, T.y]);
        }
    }

    for (i = 0; i < arr_read.length; i++){
        if (arr_read[i][0] === 'R'){
            for (j = 0; j < Number(arr_read[i].substring(2)); j++){
                H.x +=1;
                compare_position();
                position_check();
            }
        }
        if (arr_read[i][0] === 'L'){
            for (j = 0; j < Number(arr_read[i].substring(2)); j++){
                H.x -=1;
                compare_position();
                position_check();
            }
        }
        if (arr_read[i][0] === 'U'){
            for (j = 0; j < Number(arr_read[i].substring(2)); j++){
                H.y +=1;
                compare_position();
                position_check();
            }
        }
        if (arr_read[i][0] === 'D'){
            for (j = 0; j < Number(arr_read[i].substring(2)); j++){
                H.y -=1;
                compare_position();
                position_check();
            }
        }
    }

    console.log(arr_position.length);