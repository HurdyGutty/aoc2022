const {readFileSync, promises: fsPromises} = require('fs');

    const file = './jet_push.txt';

    function syncReadFile(filename) {
            const contents = readFileSync(filename, 'utf-8');
               
            return contents;
          
    }

    const contents = syncReadFile(file);

    let I_horizon = [[0,2], [0,3], [0,4], [0,5]];
    let plus = [[0,3], [1,2], [1,3], [1,4], [2,3]];
    let L = [[0,2], [0,3], [0,4], [1,4], [2,4]];
    let I_vertical = [[0,2], [1,2], [2,2], [3,2]];
    let square = [[0,2], [1,2], [0,3], [1,3]];

    let shape_arr = [I_horizon, plus, L, I_vertical, square];
    let rested = [];

    let landed = (shape) => {
        return shape.some(el => rested.some(landed => (landed[0] == el[0] && landed[1] == el[1])));
    }
    let move = (direction, shape) => {
        if (direction == "<") {
            if(shape.every(el => el[1] - 1 >= 0 )){
                let new_shape = shape.map(el => [el[0], el[1] - 1]);
                if (!landed(new_shape)) return new_shape;
            }
        }
        if (direction == ">") {
            if(shape.every(el => el[1] + 1 <= 6 )){
                let new_shape = shape.map(el => [el[0], el[1] + 1]);
                if (!landed(new_shape)) return new_shape;
            }
        }
        if (direction == "down") {
            if(shape.every(el => el[0] - 1 >= 0 )){
                let new_shape = shape.map(el => [el[0] + 1, el[1]]);
                if (!landed(new_shape)) return new_shape;
            }
        }
        return false;
    }

    let highest = 0;

    let rock_count = 2022;
    let rock_shape = 0;
    let movement = 0;
    while (rock_count > 0){
        let shape = shape_arr[rock_shape].map(el => [el[0] + highest, el[1]]);
        let new_shape = shape;
        while (new_shape !== false){
            if (move(contents[movement], new_shape)) new_shape = move(contents[movement], new_shape);
            if (move('down', new_shape)) {
                
            } else {

            }
        }
        
    }
    console.log(arr_read);
