const {readFileSync, promises: fsPromises} = require('fs');

    const file = './rocks.txt';

    function syncReadFile(filename) {
            const contents = readFileSync(filename, 'utf-8');
        
            const arr = contents.split(/\r?\n/).map(el => el.split(' -> ').map(el => el.split(',').map(Number)));        
            return arr;
          
    }

    const arr_read = syncReadFile(file);

    let wall = [];

    for (let rock_wall of arr_read){
        while (rock_wall.length > 1){
            if (rock_wall[0][0] != rock_wall[1][0]){
                let [min, max] = [rock_wall[0][0], rock_wall[1][0]].sort((a, b) => a - b);
                let y = rock_wall[1][1];
                for (let x = min; x <= max ; x++){
                    wall.push([x, y]);
                }
            }
            if (rock_wall[0][1] != rock_wall[1][1]){
                let [min, max] = [rock_wall[0][1], rock_wall[1][1]].sort((a, b) => a - b);
                let x = rock_wall[1][0];
                for (let y = min; y <= max ; y++){
                    wall.push([x, y]);
                }
            }
            rock_wall.shift();
        }
    }

    let wall_uniq = [...new Set(wall.map(el => JSON.stringify(el)))].map(el => JSON.parse(el));

    let lowest = wall_uniq.reduce( (acc, el) => (el[1] > acc ? el[1] : acc), 0);

    const isLegitMove = ([x, y]) => {
        if (!repeated(rested , [x, y]) && !walled(wall_uniq, [x, y])) return true;
        return false;
    }

    const isRested = ([x, y]) => {
        if (!isLegitMove([x, y + 1]) && !isLegitMove([x + 1, y + 1]) && !isLegitMove([x - 1, y + 1])) return true;
        return false;
    }

    const walled = (wall_arr, current) => {
        if (wall_arr.some(el => (el[0] === current[0] && el[1] === current[1]))) return true;
        return false;
    }

    const repeated = (rested, current) => {
        if (rested.some(el => (el[0] === current[0] && el[1] === current[1]))) return true;
        return false;
    }

    let current = [500, 0];

    let sand = 0;

    let movement = [[0, 1], [-1, 1], [1, 1]];

    let rested = [];

    while (current[1] <= lowest){
        if (isRested(current)){
            rested.push(current);
            sand++;
            current = [500, 0];
            continue;
        }
        for (let move of movement){
            let x = current[0] + move[0];
            let y = current[1] + move[1];
            if (isLegitMove([x, y])) {
                current = [x, y];
                break;
            }
        }

    }

    console.log(sand);