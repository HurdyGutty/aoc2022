const {readFileSync, promises: fsPromises} = require('fs');

    const file = './rope.txt';

    function syncReadFile(filename) {
            const contents = readFileSync(filename, 'utf-8');
        
            const arr = contents.split(/\r?\n/);        
            return arr;
          
    }

    const arr_read = syncReadFile(file);
    let rope = [];

    for (let i = 0; i < 10; i++){
        rope = [...rope, [0,0]];
    }

    let arr_position = [];

    function compare_position(pos, index, array){
        if (index == 0) return pos;
        let x_compare = pos[0] - array[index - 1][0];
        let y_compare = pos[1] - array[index - 1][1];

        if(Math.abs(Math.sign(x_compare) * Math.floor(Math.abs(x_compare / 2))) == 1 && 
                Math.abs(Math.sign(y_compare) * Math.floor(Math.abs(y_compare / 2))) == 1)
                {
                    pos[0] -= Math.floor(x_compare / 2);
                    pos[1] -= Math.floor(y_compare / 2);
                    return pos;
                }

        if (Math.abs(Math.sign(x_compare) * Math.floor(Math.abs(x_compare / 2))) == 1) {
            pos[0] -= Math.floor(x_compare / 2);
            pos[1] = array[index - 1][1];
            return pos;
       }
       if (Math.abs(Math.sign(y_compare) * Math.floor(Math.abs(y_compare / 2))) == 1) {
            pos[1] -= Math.floor(y_compare / 2);
            pos[0] = array[index - 1][0];
            return pos;
       }
       return pos;
    }

    function position_check(){
        if (typeof arr_position.find(element => (element[0] == rope[9][0] && element[1] == rope[9][1])) === 'undefined'){
            arr_position.push([rope[9][0], rope[9][1]]);
        }
    }

    for (i = 0; i < arr_read.length; i++){
        if (arr_read[i][0] === 'R'){
            for (j = 0; j < Number(arr_read[i].substring(2)); j++){
                rope[0][0] +=1;
                rope = rope.map(compare_position);
                position_check();
            }
        }
        if (arr_read[i][0] === 'L'){
            for (j = 0; j < Number(arr_read[i].substring(2)); j++){
                rope[0][0] -=1;
                rope = rope.map(compare_position);
                position_check();
            }
        }
        if (arr_read[i][0] === 'U'){
            for (j = 0; j < Number(arr_read[i].substring(2)); j++){
                rope[0][1] +=1;
                rope = rope.map(compare_position);
                position_check();
            }
        }
        if (arr_read[i][0] === 'D'){
            for (j = 0; j < Number(arr_read[i].substring(2)); j++){
                rope[0][1] -=1;
                rope = rope.map(compare_position);
                position_check();
            }
        }
    }

    console.log(arr_position.length);