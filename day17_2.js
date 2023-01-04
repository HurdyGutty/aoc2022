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
    let move = (direction, shape, rock_shape = 0) => {
        if (direction == "<") {
            if (rock_shape == 1){
                if(shape[1][1] - 1 >= 0 ){
                    let new_shape = shape.map(el => [el[0], el[1] - 1]);
                    if (!landed(new_shape)) return new_shape;
                }
            } else {
                if(shape[0][1] - 1 >= 0 ){
                    let new_shape = shape.map(el => [el[0], el[1] - 1]);
                    if (!landed(new_shape)) return new_shape;
                }
            }
        }

        if (direction == ">") {
            if(shape[3][1] + 1 <= 6 ){
                let new_shape = shape.map(el => [el[0], el[1] + 1]);
                if (!landed(new_shape)) return new_shape;
            }
        }

        if (direction == "down") {
            if(shape[0][0] - 1 > 0 ){
                let new_shape = shape.map(el => [el[0] - 1, el[1]]);
                if (!landed(new_shape)) return new_shape;
            }
        }
        return false;
    }
    let simulation = (cycle_require, goal, rock_shape = 0, movement = 0) => {
        let highest = 0;

        let rock_count = test_rock = cycle_require;

        let pattern = [];
        let pattern_repeated = new Map();
        while (rock_count > 0){
            let shape = shape_arr[rock_shape].map(el => [el[0] + highest + 4, el[1]]);
            let new_shape = shape;
            while (new_shape !== false){
                if (move(contents[movement], new_shape , rock_shape)) new_shape = move(contents[movement], new_shape, rock_shape);
                
                movement = movement < contents.length - 1 ? movement + 1 : 0;

                if (move('down', new_shape)) {
                    new_shape = move('down', new_shape);
                } else {
                    shape = new_shape;
                    new_shape = move('down', new_shape);
                }
            }
            shape.forEach(el => rested.push(el));
            let current_shape_height = shape[shape.length - 1][0];
            highest =  current_shape_height > highest ? current_shape_height : highest;
            if (!pattern.some(el => el[0] === rock_shape && el[1] === movement)) {
                pattern.push([rock_shape, movement]);
            } else {
                if (pattern_repeated.size == 0) {
                    pattern_repeated.set(JSON.stringify([rock_shape, movement]), [[test_rock - rock_count, highest]])
                } 
                else {
                    if (pattern_repeated.has(JSON.stringify([rock_shape, movement]))){
                        pattern_repeated.get(JSON.stringify([rock_shape, movement])).push([test_rock - rock_count, highest]);
                    }   
                }
            }
            rested = rested.filter(el => el[0] >= highest - 50);
            rock_shape = (rock_shape < 4) ? rock_shape + 1 : 0;
            rock_count--;
        }

        if (goal == "height") return highest;
        if (goal == "pattern_repeated") return pattern_repeated;
        if (goal == "pattern") return pattern;
    }

    
    let pattern_repeated = simulation(10000, 'pattern_repeated');
    const [first_key] = pattern_repeated.keys();
    let rock_range_pattern = pattern_repeated.get(first_key)[1][0] - pattern_repeated.get(first_key)[0][0];
    let height_range_pattern = pattern_repeated.get(first_key)[1][1] - pattern_repeated.get(first_key)[0][1];
    let start = pattern_repeated.get(first_key)[0];

    let pattern_time = Math.floor((1000000000000 - start[0]) /  rock_range_pattern);
    let rock_left = (1000000000000 - start[0]) % rock_range_pattern;
    rested = [];
    let height_left = simulation(start[0] + rock_left, 'height');

    console.log(pattern_repeated);
    console.log(height_range_pattern);
    console.log(BigInt(height_left) + BigInt(pattern_time) * BigInt(height_range_pattern));